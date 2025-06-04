# main.py
from fastapi import FastAPI  # type: ignore
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from auth import router as auth_router
from agent import router as agent_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(agent_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],  # หรือ ["*"] ถ้าต้องการให้ทุก origin เข้าได้ (ไม่แนะนำสำหรับ production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
