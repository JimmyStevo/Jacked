from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017/")
db = client["INSERT_DATABASE"]
collection = db["INSERT_COLLECTION"]


app = Flask(__name__)
CORS(app)





@app.route("/")
def home():
    return{"message": "Hello World"}




if __name__ == "__main__":
    app.run(debug=True)
    
    