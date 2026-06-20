from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient


client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["Jacked_DB"]

print("Connected bitches", db.list_collection_names())

user_collection = db["User_Info"]
preference_collection = db["Preferences"]


app = Flask(__name__)
CORS(app)

# ============================================
# Settings Backend logic
# ============================================

@app.route('/api/settings', methods=['GET', 'POST'])
def getSettings():
     data = list(preference_collection.find({}, {"_id":0}))
     return jsonify(data)
 
 def storeData():
     
 
 
if __name__ == "__main__":
    app.run(debug=True)
    