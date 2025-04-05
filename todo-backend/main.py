from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

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

if __name__ == "__main__":
    app.run()