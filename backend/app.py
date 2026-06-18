from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient


client = MongoClient("mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/")
db = client["user_DB"]

print("Connected bitches", db.list_collection_names())

collection = db["INSERT_COLLECTION"]


app = Flask(__name__)
CORS(app)


if __name__ == "__main__":
    app.run(debug=True)
    
    # mongodb+srv://jimmystevo_db_user:IOMbVnxh9nhTspJv@cluster0.gy3uo1w.mongodb.net/?appName=Cluster0