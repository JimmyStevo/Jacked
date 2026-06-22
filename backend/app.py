from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from auth import auth_bp
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME", "Jacked_DB")

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    # Verify connection
    client.admin.command('ping')
    print(f"[OK] Connected to MongoDB Atlas - Database: {DB_NAME}")
except Exception as e:
    print(f"[ERROR] Failed to connect to MongoDB: {e}")
    client = None
    db = None

user_collection = db["User_Info"] if db is not None else None
preference_collection = db["Preferences"] if db is not None else None
nutrition_collection = db["Nutrition"] if db is not None else None


app = Flask(__name__)
CORS(app)

# ============================================
# Settings Backend logic
# ============================================

@app.route('/api/settings', methods=['GET', 'POST'])
def updateSettings():
    if request.method == 'POST':
        data = request.get_json()
        preference_collection.insert_one(data)
        return jsonify(data)
    else:
        data = list(preference_collection.find({}, {"_id":0}))
        return jsonify(data)
     
# ============================================
# Exercise Backend logic
# ============================================



# Nutrition Backend logic

@app.route('/api/nutrition', methods=['GET'])
def get_nutrition():
    try:
        if not nutrition_collection:
            return jsonify({"error": "Database not connected"}), 500
        entries = list(nutrition_collection.find({}, {"_id": 0}))
        return jsonify(entries)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/nutrition', methods=['POST'])
def add_nutrition():
    try:
        if not nutrition_collection:
            return jsonify({"error": "Database not connected"}), 500
        data = request.get_json()
        nutrition_collection.insert_one(data)
        return jsonify(data), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/nutrition/<meal>', methods=['DELETE'])
def delete_nutrition(meal):
    try:
        if not nutrition_collection:
            return jsonify({"error": "Database not connected"}), 500
        nutrition_collection.delete_one({"meal": meal})
        return '', 204
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.register_blueprint(auth_bp, url_prefix="/api")

@app.route("/api/health")
def health_check():
    return {"status": "ok"}
 
if __name__ == "__main__":
    app.run(debug=True)
    