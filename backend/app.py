from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from auth import auth_bp, JWT_SECRET, JWT_ALGORITHM
import jwt
from datetime import datetime, timedelta


client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["Jacked_DB"]

user_collection = db["User_Info"]
preference_collection = db["Preferences"]
WeightLogging_collection = db["User_WeightLogging"]
Nutrition_collection = db["User_NutritionLogging"]


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
        data = request.get_json()
        data["user_id"] = user_id 
        preference_collection.update_one(
            {"user_id" : user_id},
            {"$set" : data},
            upsert=True)
        return jsonify(data)
    else:
        data = list(preference_collection.find({"user_id": user_id}, {"_id":0}))
        return jsonify(data)
     
# ============================================
# StartUp Backend logic
# ============================================

@app.route('/api/startup', methods=['GET', 'POST'])
def updateStartUp():
    user_id = get_current_user()
    if request.method == 'POST':
        data = request.get_json()
        data["user_id"] = user_id 
        preference_collection.insert_one(data)
        return jsonify(data)
    else:
        data = list(preference_collection.find({"user_id": user_id}, {"_id":0}))
        return jsonify(data)

# ============================================
# Graph Weight logic
# ============================================

@app.route('/api/weightLogging', methods=['GET', 'POST'])
def WeightLogging():
    user_id = get_current_user()
    if request.method == 'POST':
        data = request.get_json()
        data["user_id"] = user_id
        data["date"] = datetime.now().strftime("%Y-%m-%d")
        WeightLogging_collection.insert_one(data)
        return jsonify(data)
    else:
        today = datetime.now()
        dif = today.weekday()
        startWeek = today - timedelta(days=dif)
        endWeek = startWeek + timedelta(days=6)
        
        data = list(WeightLogging_collection.find({
            "user_id":user_id,
            "date" : {
                "$gte" : startWeek.strftime("%Y-%m-%d"),
                "$lte" : endWeek.strftime("%Y-%m-%d")
            }
        }, {"_id":0})) 
        return jsonify(data)

# Nutrition Logging Backend logic

@app.route('/api/nutrition', methods=['GET', 'POST', 'DELETE'])
def NutritionLogging():
    user_id = get_current_user()
    if request.method == 'POST':
        data = request.get_json()
        data["user_id"] = user_id
        Nutrition_collection.insert_one(data)
        return jsonify(data)
    elif request.method == 'DELETE':
        meal_name = request.args.get('meal')
        Nutrition_collection.delete_one({"user_id": user_id, "meal": meal_name})
        return jsonify({"message": "Deleted"})
    else:
        data = list(Nutrition_collection.find({"user_id": user_id}, {"_id": 0}))
        return jsonify(data)

app.register_blueprint(auth_bp, url_prefix="/api")

@app.route("/api/health")
def health_check():
    return {"status": "ok"}


 
if __name__ == "__main__":
    app.run(debug=True)
    