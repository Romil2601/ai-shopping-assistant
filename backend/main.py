from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import List, Dict
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# ==============================
# LOAD ENV
# ==============================
load_dotenv()

# ==============================
# CREATE APP
# ==============================
app = FastAPI(title="Electronics AI Shopping Assistant")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# ==============================
# CORS (PRODUCTION SAFE)
# ==============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL"), "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# DATABASE (CLOUD)
# ==============================
client = MongoClient(os.getenv("MONGO_URI"))
db = client["electronics_db"]

products = db["products"]
users = db["users"]

# ==============================
# MODELS
# ==============================
class User(BaseModel):
    name: str
    email: str
    password: str

class Product(BaseModel):
    name: str
    category: str
    brand: str
    price: float
    rating: float
    specs: Dict[str, str]

class Chat(BaseModel):
    message: str

class Login(BaseModel):
    email: str
    password: str

# ==============================
# AUTH HELPERS
# ==============================
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# ==============================
# ROUTES
# ==============================
@app.get("/")
def root():
    return {"status": "Backend running"}

@app.post("/api/ai/chat")
def ai_chat(chat: Chat):
    text = chat.message.lower()
    data = list(products.find({}, {"_id": 0}))

    for category in ["mobile", "laptop", "tv", "fridge", "fan", "computer"]:
        if category in text:
            return {
                "reply": sorted(
                    [p for p in data if p["category"].lower() == category],
                    key=lambda x: x["rating"],
                    reverse=True
                )[:3]
            }

    return {"reply": "Ask about mobiles, laptops, TVs, fridges, fans, or computers"}

@app.post("/api/auth/login")
def login(data: Login):
    user = users.find_one({"email": data.email})

    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "user_id": str(user["_id"]),
        "email": user["email"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"]
        }
    }

@app.get("/api/products")
def get_products():
    return list(products.find({}, {"_id": 0}))