from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

@api.add_resource("/")
class Hello(Resource):
    def get(self):
        return jsonify({"message": "Hello world"})

if __name__ == "__main__":
    app.run()