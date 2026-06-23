from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, current_app
from pymongo import MongoClient
import bcrypt
import jwt
import os

auth_bp = Blueprint("auth", __name__)

client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["Jacked_DB"]
users_collection = db["User_Info"]

JWT_SECRET = os.getenv("JWT_SECRET", "dev_secret_key_change_in_production")
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_MINUTES = 60

@auth_bp.route("/auth/signup", methods=["POST"])
def register():
    data = request.get_json() or {}
    try:
        current_app.logger.info(f"Register attempt for email={data.get('email')}")
    except Exception:
        pass
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not username or not email or not password:
        return jsonify({"message": "All fields are required."}), 400

    try:
        if users_collection.find_one({"email": email}):
            return jsonify({"message": "Email already registered."}), 409

        pw_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
        insert_result = users_collection.insert_one({
            "username": username,
            "email": email,
            "password": pw_hash,
            "createdAt": datetime.utcnow(),
        })
    except Exception as e:
        current_app.logger.error(f"DB error during register: {e}")
        return jsonify({"message": "Database unavailable. Try again later."}), 503

    payload = {
        "sub": str(insert_result.inserted_id),
        "email": email,
        "username": username,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXP_DELTA_MINUTES),
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return jsonify({
        "token": token,
        "email": email,
        "username": username,
    }), 201

@auth_bp.route("/auth/login", methods=["POST"]) 
def login():
    data = request.get_json() or {}
    try:
        current_app.logger.info(f"Login attempt for email={data.get('email')}")
    except Exception:
        pass
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    try:
        user = users_collection.find_one({"email": email})
    except Exception as e:
        current_app.logger.error(f"DB error during login: {e}")
        return jsonify({"message": "Database unavailable. Try again later."}), 503

    if not user:
        return jsonify({"message": "Invalid email or password."}), 401

    # Convert stored hash string back to bytes for comparison
    stored_hash = user["password"].encode("utf-8") if isinstance(user["password"], str) else user["password"]
    if not bcrypt.checkpw(password.encode("utf-8"), stored_hash):
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
