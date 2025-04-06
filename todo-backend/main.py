from flask import Flask, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

# MongoDB Connection Details
MONGO_URI = "mongodb://localhost:27017/"  # Replace with your MongoDB URI
DATABASE_NAME = "todo"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
task_collection = db["tasks"]

@api.resource("/")
class Hello(Resource):
    def get(self):
        return {"message": "Hello world"}
    
@api.resource("/<item>")
class HelloItem(Resource):
    def get(self, item):
        return {
            "message": "Hello item",
            "item": item
        }
    
@api.resource("/tasks")
class Tasks(Resource):
    def get(self):
        task_cursor = task_collection.find()
        task_list = [{"_id": str(task['_id'])} for task in task_cursor]
        return {"route": "/tasks", "data": task_list}, 200 
    
if __name__ == "__main__":
    app.run()