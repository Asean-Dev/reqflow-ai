from fastapi import APIRouter, File, UploadFile, Depends, Request
from pydantic import BaseModel
from typing import Optional, Dict
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from utils import load_manday_matrix, calc_total_manday, generate_pdf
import os
from fastapi.responses import FileResponse
from auth_guard import get_current_user
import jwt
from fastapi import HTTPException, status

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY", "sk-yourkey")
router = APIRouter()

REQUIRED_FIELDS = [
    "company",
    "business_problem",
    "budget",
    "purpose",
    "scope_summary",
]

FIELD_QUESTIONS = {
    "company": "โปรดระบุชื่อบริษัทหรือองค์กรของคุณ",
    "business_problem": "โปรดระบุปัญหาทางธุรกิจที่ต้องการแก้ไข",
    "budget": "โปรดระบุช่วงงบประมาณที่ตั้งไว้ (เช่น 500,000-1,000,000 บาท)",
    "purpose": "โปรดระบุวัตถุประสงค์หลักของโปรเจคนี้ (เช่น พัฒนา Product, Marketing, Research ฯลฯ)",
    "scope_summary": "โปรดสรุปขอบเขตงานของโปรเจคนี้ (scope summary) แบบสั้นๆ 1-2 ประโยค",
}


class ConversationState(BaseModel):
    conversation: str = ""
    fields: Dict[str, Optional[str]] = {}


llm = ChatOpenAI(model="gpt-4o", temperature=0.3)


def guess_field_from_answer(
    answer: str, fields: Dict[str, Optional[str]]
) -> Optional[str]:
    prompt = PromptTemplate(
        template="""
คำตอบของผู้ใช้: {answer}
Fields ที่เหลือ: {fields}

จงเลือก field จากนี้ {fields_list} ที่ตรงกับคำตอบนี้ที่สุด
ถ้าคำตอบนี้ไม่ตรงกับ field ใดเลย ให้ตอบว่า none
ตอบแค่ชื่อ field เท่านั้น เช่น company, business_problem, kpi, budget, purpose, scope_summary หรือ none
""",
        input_variables=["answer", "fields", "fields_list"],
    )
    remaining_fields = [f for f in REQUIRED_FIELDS if not fields.get(f)]
    prompt_str = prompt.format(
        answer=answer,
        fields=remaining_fields,
        fields_list=", ".join(remaining_fields),
    )
    field_guess = llm.invoke(prompt_str).content.strip().lower()
    if field_guess in remaining_fields:
        return field_guess
    return None


def extract_value(answer: str) -> str:
    # Rule-based extraction (cut some Thai/Eng prefix)
    value = (
        answer.replace("บริษัท", "")
        .replace("ชื่อ", "")
        .replace("ครับ", "")
        .replace("ค่ะ", "")
    )
    return value.strip(" :,-")


def map_purpose_answer(answer: str) -> str:
    text = answer.lower().strip()
    if "product" in text or "พัฒนา" in text or "สินค้า" in text:
        return "PRODUCT_DEV"
    elif (
        "marketing" in text
        or "ตลาด" in text
        or "โปรโมท" in text
        or "ประชาสัมพันธ์" in text
    ):
        return "MARKETING"
    elif "research" in text or "วิจัย" in text or "สำรวจ" in text or "รีเสิร์ช" in text:
        return "MARKET_RESEARCH"
    return answer


def agent_llm_reply(next_field: str, state: ConversationState) -> str:
    # ให้ LLM สร้างคำถามใหม่ ไม่ซ้ำ สั้นๆ
    system_prompt = """
    คุณคือผู้ช่วย AI สำหรับการเก็บ Requirement โปรเจค IT
    - ถามคำถามใหม่สำหรับ field ที่ระบุ โดยให้ถามสั้น กระชับ และอย่าใช้ประโยคซ้ำ
    - ตอบเป็นภาษาไทย 1 ประโยค
    """
    user_context = (
        f"fields: {state.fields}\nfield_to_ask: {FIELD_QUESTIONS[next_field]}"
    )
    prompt = PromptTemplate(
        template="{system_prompt}\n\n{user_context}\n\n[ขอคำถามใหม่]",
        input_variables=["system_prompt", "user_context"],
    )
    prompt_str = prompt.format(system_prompt=system_prompt, user_context=user_context)
    message = llm.invoke(prompt_str).content.strip()
    return message


@router.post("/converse")
async def converse(
    state: ConversationState, current_user: str = Depends(get_current_user)
):
    user_answer = state.conversation.strip() if state.conversation else ""
    fields = state.fields.copy()

    # ถ้า user ตอบมารอบนี้ (conversation มีข้อความ) ให้เดา field
    if user_answer:
        field_name = guess_field_from_answer(user_answer, fields)
        if field_name:
            value = extract_value(user_answer)
            if field_name == "purpose":
                value = map_purpose_answer(value)
            fields[field_name] = value
        else:
            # ไม่ match กับ field ไหนเลย - agent ขอข้อมูลใหม่!
            for f in REQUIRED_FIELDS:
                if not fields.get(f):
                    reply = f"ขอข้อมูลเพิ่มเติมเกี่ยวกับ '{FIELD_QUESTIONS[f]}' ด้วยครับ"
                    return {
                        "code": 200,
                        "status": "success",
                        "data": {
                            "agent_message": reply,
                            "question": FIELD_QUESTIONS[f],
                            "field": f,
                            "fields": fields,
                        },
                    }

    # หา field ถัดไปที่ยังไม่ได้ตอบ
    for f in REQUIRED_FIELDS:
        if not fields.get(f):
            agent_reply = agent_llm_reply(
                f, ConversationState(conversation="", fields=fields)
            )
            return {
                "code": 200,
                "status": "success",
                "data": {
                    "agent_message": agent_reply,
                    "question": FIELD_QUESTIONS[f],
                    "field": f,
                    "fields": fields,  # ส่ง fields ล่าสุด (update แล้ว) กลับไปให้ user
                },
            }

    # ครบทุก field แล้ว
    # 1. สรุป scope summary
    scope_summary = {k: v for k, v in fields.items() if k in REQUIRED_FIELDS}

    # 2. โหลด manday matrix (หรือใช้ mock ถ้าไม่มีไฟล์)
    try:
        manday_matrix = load_manday_matrix()
    except Exception:
        manday_matrix = {"tasks": [{"name": "default", "manday": 0}]}
    total_manday = calc_total_manday(manday_matrix)

    # 3. สร้าง PDF
    company_name = scope_summary.get("company")
    if company_name:
        safe_company = company_name.strip().replace(" ", "_")
        pdf_filename = f"{safe_company}.pdf"
    else:
        pdf_filename = "SoW.pdf"

    sow_pdf_path = generate_pdf(scope_summary, filename=pdf_filename)

    return {
        "code": 200,
        "status": "success",
        "data": {
            "agent_message": "ขอบคุณสำหรับข้อมูลครับ ทีมงานจะนำข้อมูลไปดำเนินการต่อ",
            "fields": fields,
            "question": "ขอบคุณสำหรับข้อมูลครับ ทีมงานจะนำข้อมูลไปดำเนินการต่อ",
            "success": True,
            "scope_summary": scope_summary,
            "manday_matrix": manday_matrix,
            "total_manday": total_manday,
            "sow_pdf_path": sow_pdf_path,  # path ไปยังไฟล์ PDF ที่ generate แล้ว
        },
    }


@router.get("/download-sow")
def download_sow(pdf_name: str = "SoW.pdf"):
    print("pdf_name", pdf_name)
    pdf_path = os.path.join(os.getcwd(), pdf_name)
    if not os.path.exists(pdf_path):
        return {"error": "ไม่พบไฟล์ PDF"}
    return FileResponse(pdf_path, media_type="application/pdf", filename=pdf_name)
