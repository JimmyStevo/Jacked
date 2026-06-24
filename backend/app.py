from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from auth import auth_bp, JWT_SECRET, JWT_ALGORITHM
from bson import ObjectId
from datetime import datetime, timedelta
import jwt

client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["Jacked_DB"]

user_collection = db["User_Info"]
preference_collection = db["Preferences"]
food_logging_collection = db["Food_Logging"]
Nutrition_collection = db["User_NutritionLogging"]
weight_logging_collection = db["User_WeightLogging"]


app = Flask(__name__)
CORS(app)

# ============================================
# Auth helper
# ============================================

@app.errorhandler(ValueError)
def handle_auth_error(e):
    return jsonify({"message": str(e)}), 401

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

# @app.route('/api/settings', methods=['GET', 'POST'])
# def updateSettings():
#     user_id = get_current_user()
#     if request.method == 'POST':
#         data = request.get_json()
#         data["user_id"] = user_id 
#         preference_collection.update_one(
#             {"user_id" : user_id},
#             {"$set" : data},
#             upsert=True)
#         return jsonify(data)
#     else:
#         data = list(preference_collection.find({"user_id": user_id}, {"_id":0}))
#         return jsonify(data)

@app.route('/api/settings', methods=['GET','POST'])
def updateSettings(): 
    try:
        user_id = get_current_user()
        if request.method == 'POST':
            data = request.get_json(silent=True) or {}
            data["user_id"] = user_id
            preference_collection.update_one(
                {"user_id": user_id},
                {"$set": data},
                upsert=True
            )
            return jsonify(data), 200
        
        data = list(preference_collection.find({"user_id": user_id}, {"_id": 0}))
        return jsonify(data), 200
    
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
    except Exception as e:
        app.logger.error(f"Settings error: {e}")
        return jsonify({"message": "An internal error occurred"}), 500
     
# ============================================
# StartUp Backend logic
# ============================================

# @app.route('/api/startup', methods=['GET', 'POST'])
# def updateStartUp():
#     user_id = get_current_user()
#     if request.method == 'POST':
#         data = request.get_json()
#         data["user_id"] = user_id 
#         preference_collection.insert_one(data)
#         return jsonify(data)
#     else:
#         data = list(preference_collection.find({"user_id": user_id}, {"_id":0}))
#         return jsonify(data)

@app.route('/api/startup', methods=['GET', 'POST'])
def update_startup():
    try:
        user_id = get_current_user()  # Restore authentication/scoping

        if request.method == 'POST':
            data = request.get_json(silent=True) or {}
            data["user_id"] = user_id  # Attach ownership

            # Use upsert if only ONE startup config per user is intended:
            preference_collection.update_one(
                {"user_id": user_id},
                {"$set": data},
                upsert=True
            )
            return jsonify(data), 201

        # GET — scoped to the current user only
        data = list(preference_collection.find({"user_id": user_id}, {"_id": 0}))
        return jsonify(data), 200

    except ValueError as e:
        return jsonify({"message": str(e)}), 401  # Auth failure
    except Exception as e:
        app.logger.error(f"Startup error: {e}")
        return jsonify({"message": "An internal error occurred"}), 500

# ============================================
# Food logging (Get, post and delete)
# ============================================

@app.route('/api/food-logging', methods=['GET', 'POST'])
def food_logging():
    try:
        user_id = get_current_user()

        if request.method == 'POST':
            data = request.get_json(silent=True) or {}

            required = ['date', 'name', 'grams', 'calories', 'protein', 'carbs', 'fats']
            missing = [f for f in required if f not in data]
            if missing:
                return jsonify({"message": f"Missing fields: {', '.join(missing)}"}), 400

            # Validate date format
            try:
                datetime.strptime(data['date'], "%Y-%m-%d")
            except ValueError:
                return jsonify({"message": "Invalid date format, expected YYYY-MM-DD"}), 400

            entry = {
                "user_id": user_id,
                "date": data['date'],
                "name": data['name'],
                "grams": data['grams'],
                "calories": data['calories'],
                "protein": data['protein'],
                "carbs": data['carbs'],
                "fats": data['fats'],
            }
            result = food_logging_collection.insert_one(entry)
            entry['_id'] = str(result.inserted_id)
            return jsonify(entry), 201

        # GET — optional single date OR weekly range
        date = request.args.get('date')
        query = {"user_id": user_id}
        if date:
            query["date"] = date

        entries = list(food_logging_collection.find(query, {"user_id": 0}))
        for e in entries:
            e['_id'] = str(e['_id'])
        return jsonify(entries), 200

    except ValueError as e:
        return jsonify({"message": str(e)}), 401
    except Exception as e:
        app.logger.error(f"Food logging error: {e}")
        return jsonify({"message": "An internal error occurred"}), 500


@app.route('/api/food-logging/<entry_id>', methods=['DELETE'])
def delete_food_entry(entry_id):
    try:
        user_id = get_current_user()

        # Validate ObjectId format first → return 400 instead of 500
        try:
            oid = ObjectId(entry_id)
        except Exception:
            return jsonify({"message": "Invalid entry ID"}), 400

        result = food_logging_collection.delete_one({"_id": oid, "user_id": user_id})
        if result.deleted_count == 0:
            return jsonify({"message": "Entry not found"}), 404
        return jsonify({"message": "Deleted"}), 200

    except ValueError as e:
        return jsonify({"message": str(e)}), 401
    except Exception as e:
        app.logger.error(f"Delete error: {e}")
        return jsonify({"message": "An internal error occurred"}), 500

# ============================================
# Graph Weight logic
# ============================================

@app.route('/api/weightLogging', methods=['GET', 'POST'])
def weight_logging():
    user_id = get_current_user()
    if request.method == 'POST':
        data = request.get_json()
        data["user_id"] = user_id
        data["date"] = datetime.now().strftime("%Y-%m-%d")
        weight_logging_collection.insert_one(data)
        return jsonify(data)
    else:
        today = datetime.now()
        dif = today.weekday()
        startWeek = today - timedelta(days=dif)
        endWeek = startWeek + timedelta(days=6)
        
        data = list(weight_logging_collection.find({
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
    try:
        user_id = get_current_user()
    except ValueError as e:
        app.logger.error(f"Auth error in nutrition: {e}")
        return jsonify({"message": str(e)}), 401
    
    if request.method == 'POST':
        data = request.get_json()
        app.logger.info(f"Adding nutrition entry for user {user_id}: {data}")
        data["user_id"] = user_id
        Nutrition_collection.insert_one(data)
        return jsonify(data)
    elif request.method == 'DELETE':
        meal_name = request.args.get('meal')
        entry_date = request.args.get('date')
        query = {"user_id": user_id, "meal": meal_name}
        if entry_date:
            query["date"] = entry_date
        Nutrition_collection.delete_one(query)
        return jsonify({"message": "Deleted"})
    else:
        # Get date filter from query params (optional)
        date_from = request.args.get('from')
        date_to = request.args.get('to')
        query = {"user_id": user_id}
        if date_from and date_to:
            query["date"] = {"$gte": date_from, "$lte": date_to}
        data = list(Nutrition_collection.find(query, {"_id": 0}))
        return jsonify(data)

app.register_blueprint(auth_bp, url_prefix="/api")

@app.route("/api/health")
def health_check():
    return {"status": "ok"}


 
if __name__ == "__main__":
    app.run(debug=True)
    