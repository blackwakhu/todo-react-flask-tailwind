from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse, inputs
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)
api = Api(app)

# MongoDB Connection Details
MONGO_URI = "mongodb://localhost:27017/"  # Replace with your MongoDB URI
DATABASE_NAME = "todo"

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
task_collection = db["tasks"]

task_parser = reqparse.RequestParser()

task_parser.add_argument('title', type=str, required=True, help="Title for tasks")
task_parser.add_argument('description', type=str, required=True, help="Description for tasks")
task_parser.add_argument('priority', type=str, default="Low", help="Priority for tasks")
task_parser.add_argument('dateScheduled', type=inputs.datetime, required=True, help="Datetime for the tasks scheduled")

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
        task_list = [
            {
                "_id": str(task['_id']), 
                'title': task['title'],
                'description': task['description']
            } for task in task_cursor]
        return {
            "route": "/tasks", 
            "data": task_list,
            'method': 'get'
        }, 200 
    
    def post(self):
        args = task_parser.parse_args()
        title = args['title']
        description = args['description']
        priority = args['priority']
        dateScheduled: datetime = args['dateScheduled']

        new_task = {
            'title': title, 
            'description': description, 
            'priority': priority, 
            'progress': 'incomplete',
            'dateScheduled': dateScheduled,
            'created': datetime.now()
        }
        inserted_task = task_collection.insert_one(new_task)
        new_task['_id'] = str(inserted_task.inserted_id)
        return {
            'route': '/tasks',
            'method': 'post',
            'data': new_task
        }, 200
    
if __name__ == "__main__":
    app.run()