from database import SessionLocal
from models import Product

def recommend_products(intent: dict):
    db = SessionLocal()

    query = db.query(Product)

    if intent.get("category"):
        query = query.filter(Product.category == intent["category"])

    if intent.get("use_case"):
        query = query.filter(Product.use_case == intent["use_case"])

    if intent.get("budget", 0) > 0:
        query = query.filter(Product.price <= intent["budget"])

    results = query.all()
    db.close()

    return results