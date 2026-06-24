from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["Jacked_DB"]
collection = db["User_Info"]

print("Attempting insert...")

result = collection.insert_one({
    "name": "Test User",
    "createdAt": datetime.utcnow()
})

print("Inserted ID:", result.inserted_id)