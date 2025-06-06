# Agent Routing สำหรับระบบนี้

---

## กระบวนการทำงานของ Agent Routing

### 1. State Management

- ระบบจะรับ state ปัจจุบันที่ประกอบด้วย
  - `conversation`: สิ่งที่ user เพิ่งตอบมา
  - `fields`: dict ที่เก็บค่าของ field ต่างๆ ที่ถามมาแล้ว

---

### 2. การเดาว่า User ตอบเรื่อง Field อะไร

- ใช้ฟังก์ชัน `guess_field_from_answer` ในการวิเคราะห์คำตอบล่าสุดของ user
- ฟังก์ชันนี้จะสร้าง prompt ส่งไปที่ LLM (GPT) เพื่อให้ช่วยดูว่า "ข้อความที่ user เพิ่งตอบ" ควรจับคู่กับ field ไหนใน `REQUIRED_FIELDS`
- ถ้าไม่ตรงกับ field ใดเลย ให้ LLM ตอบว่า `"none"`
- **ตัวอย่าง:**
  - หาก user ตอบ “500,000-1,000,000 บาท” → LLM จะเดาว่าเป็น field `budget`

---

### 3. Mapping/Normalization

- ถ้า field ที่เดาได้คือ `purpose` จะมีการ mapping คำตอบ เช่น
  - “พัฒนา product” → `"PRODUCT_DEV"`

---

### 4. Update State

- นำค่าที่ได้จาก user ไปใส่ใน dict ของ `fields`
- หากเดา field ไม่ได้เลย จะวนถาม field ที่ยังขาดแบบตรงๆ ตาม `FIELD_QUESTIONS`

---

### 5. Agent ถามคำถามใหม่

- ถ้า field ไหนยังขาด จะ generate prompt ให้ LLM แต่งคำถามใหม่ (ไม่ซ้ำเดิม)
- ส่งคำถามนี้ไปหา user เพื่อขอข้อมูลสำหรับ field ที่ยังขาด

---

### 6. จบกระบวนการ

- เมื่อเก็บข้อมูลครบทุก field แล้ว (ครบ `REQUIRED_FIELDS`)  
  ระบบจะเข้าสู่การ generate ผลลัพธ์ เช่น
  - สร้าง PDF
  - คำนวณ manday
  - ส่งสรุปข้อมูลกลับให้ผู้ใช้

---

## ตัวอย่างการทำงาน (Flow)

1. **User:** “บริษัท ChatGPT ครับ”  
   → ระบบบันทึกเป็น field `company`

2. **User:** “อยากพัฒนาโปรดักต์ใหม่”  
   → ระบบบันทึกเป็น field `purpose`

3. **User:** “งบประมาณ 700,000 บาท”  
   → ระบบบันทึกเป็น field `budget`

4. (ถ้ายังขาด field อื่นอยู่)  
   → Agent จะถามคำถามใหม่อัตโนมัติ จนครบทุก field

### FLOW CLICK (https://www.mermaidchart.com/app/projects/8805f5ce-ae77-4c0e-974d-b4bf4db5d35a/diagrams/0b76f2bc-179b-43bb-a2ba-24571ab893b2/version/v0.1/edit?pluginSource=none)

---

## ENV

```
SECRET_KEY='secret'
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
OPENAI_API_KEY="sk-key"
```