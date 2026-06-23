from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from auth import auth_bp, JWT_SECRET, JWT_ALGORITHM
import jwt


client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["Jacked_DB"]

user_collection = db["User_Info"]
preference_collection = db["Preferences"]


app = Flask(__name__)
CORS(app)

def get_current_user():
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise ValueError("Authorization header missing")
        parts = auth_header.split(' ')
        if len(parts) != 2 or parts[0] != 'Bearer':
            raise ValueError("Invalid authorization header format")
        token = parts[1]
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")
    except Exception as e:
        raise ValueError(f"Authentication error: {str(e)}")

# ============================================
# Settings Backend logic
# ============================================

@app.route('/api/settings', methods=['GET', 'POST'])
def updateSettings():
    user_id = get_current_user()
    if request.method == 'POST':
        data["user_id"] = user_id 
        preference_collection.update_one(data)
        return jsonify(data)
    else:
        data = list(preference_collection.find({"user_id": user_id}, {"_id":0}))
        return jsonify(data)
     
# ============================================
# StartUp Backend logic
# ============================================

@app.route('/api/startup', methods=['GET', 'POST'])
def updateStartUp():
    if request.method == 'POST':
        data = request.get_json()
        preference_collection.insert_one(data)
        return jsonify(data)
    else:
        data = list(preference_collection.find({}, {"_id":0}))
        return jsonify(data)
 
@app.route('/api/startup', methods=['GET', 'POST'])
def updateStartUp():
    try:
        if request.method == 'POST':
            data = request.get_json() or {}
            preference_collection.insert_one(data)
            return jsonify(data), 201
        else:
            data = list(preference_collection.find({}, {"_id": 0}))
            return jsonify(data), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
 
app.register_blueprint(auth_bp, url_prefix="/api")

@app.route("/api/health")
def health_check():
    return {"status": "ok"}
 
if __name__ == "__main__":
    app.run(debug=True)
    