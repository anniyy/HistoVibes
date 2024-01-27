import asyncio
import json
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import json
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import json_util
import certifi
from flask_cors import cross_origin

uri = "mongodb+srv://uofthacks:Hackathons2024@test.jzwidop.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client["histovibes"]
col = db["user_records"]

app = Flask(__name__)

@app.route('/')
@cross_origin()
def index():
    return 'index.html'

@app.route('/user', methods=['POST'])
@cross_origin()
def create_user():
    data = json.loads(request.data)
    username = data.get('username')
    result = db.user_records.insert_one({
    'username': username,
    'timelines':{}
    })
    all = list(col.find({}))
    return json.dumps(all, default=json_util.default)

@app.route('/timeline', methods=['PATCH'])
@cross_origin()
def create_timeline():
    data = json.loads(request.data)
    username = data.get('username')
    timeline = data.get('timeline')
    path = "timelines." + timeline
    db.user_records.update_one(
        {
            "username":username
        }, 
        {
            "$set": {
                path :{}
            }
        }
    )
    all = list(col.find({}))
    return json.dumps(all, default=json_util.default)

@app.route('/topic', methods=['PATCH'])
@cross_origin()
def create_topic():
    data = json.loads(request.data)
    username = data.get('username')
    timeline = data.get('timeline')
    topic = data.get('topic')
    path = "timelines." + timeline + "." + topic
    db.user_records.update_one(
        {
            "username": username
        }, 
        {
            "$set": {
                path: {} 
            }
        }
    )
    all = list(col.find({}))
    return json.dumps(all, default=json_util.default)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)    

# insertthis = {
#     "topic": "Games"
# }

# myquery = { "username": "conrad", "folders.folder1.topic":"topic1"}

# mydoc = col.find(myquery)
# print(db.user_records.update_one({"username":"conrad"}, {"$set":{"folders.folder4":{}}}))
# db.user_records.update_one({"username":"conrad", "folders.folder1": "$elemMatch": {"description":"fndjb", "topic":"topic1"}}, {"$set":{"folders.folder1.$.description":"ivy"}})
# # print(mydoc)
# for x in mydoc:
#   print(x)

# print("done")

# db.user_records.insert_one({
#     'username': "conradmo",
#     "folders": {
#     }
# })

# async def create_user(json_body):
#   body = json.loads(json_body)
#   username = body["username"]
#   result = await db.user_record.insert_one({
#     "username": username,
#     "timelines":{}
#   })
#   return result

# async def add_timeline(json_body):
#   body = json.loads(json_body)
  
