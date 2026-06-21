from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import bcrypt
import jwt

auth_bp = Blueprint("auth", __name__)

client = MongoClient("mongodb://localhost:27017/")
db = client["jacked_db"]
users_collection = db["users"]

JWT_SECRET = "YOUR_SECRET_KEY"
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_MINUTES = 60

@auth_bp.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not username or not email or not password:
        return jsonify({"message": "All fields are required."}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already registered."}), 409

    salt = bcrypt.gensalt()
    pw_hash = bcrypt.hashpw(password.encode("utf-8"), salt)
    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": pw_hash,
        "createdAt": datetime.utcnow(),
    })

    return jsonify({"message": "Registration successful."}), 201

@auth_bp.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password."}), 401

    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"message": "Invalid email or password."}), 401

    payload = {
        "sub": str(user["_id"]),
        "email": email,
        "username": user["username"],
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXP_DELTA_MINUTES),
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return jsonify({
        "token": token,
        "email": email,
        "username": user["username"],
    }), 200
