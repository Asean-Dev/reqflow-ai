import os
from fastapi import APIRouter, HTTPException, status, Response  # type: ignore
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm  # type: ignore
from passlib.context import CryptContext  # type: ignore
from jose import JWTError, jwt  # type: ignore
from datetime import datetime, timedelta
from dotenv import load_dotenv  # type: ignore
from pydantic import BaseModel  # type: ignore
from typing import Any, Optional
from mock_users import fake_users_db  # type: ignore

# --- CONFIG ---
load_dotenv()
router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))


# --- MODELS ---
class LoginRequest(BaseModel):
    email: str
    password: str


class ResponseModel(BaseModel):
    code: int
    status: str
    data: Optional[Any] = None
    message: Optional[str] = None  # เพิ่ม message เผื่อ error


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    print("plain_password", plain_password)
    print("hashed_password", hashed_password)
    hashed = pwd_context.hash(plain_password)
    print("hashed", hashed)
    return pwd_context.verify(plain_password, hashed)


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return user_dict


def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    print("user", user)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


@router.post("/login")
async def login(form: LoginRequest, response: Response):
    user = authenticate_user(fake_users_db, form.email, form.password)
    print("user", user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user["email"]})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        samesite="lax",
        secure=False,
    )
    # Success format
    return ResponseModel(code=200, status="success", data={"token": access_token})
