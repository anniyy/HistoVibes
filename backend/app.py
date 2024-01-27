import asyncio
import json
from pymongo import MongoClient
import json
from flask import Flask, request, jsonify
from bson import json_util
import certifi
from ai_responses import *
from datetime import datetime

uri = "mongodb+srv://uofthacks:Hackathons2024@test.jzwidop.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client["histovibes"]
col = db["user_records"]

app = Flask(__name__)

@app.route('/')
def index():
    return 'index.html'

@app.route('/user', methods=['POST'])
def create_user():
    ####check if user exits
    data = json.loads(request.data)
    username = data.get('username')
    result = db.user_records.insert_one({
    'username': username,
    'timelines':{}
    })
    all = list(col.find({}))
    return json.dumps(all, default=json_util.default)

@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    result = list(col.find({"username":username}))
    return json.dumps(result, default=json_util.default)

@app.route('/timeline', methods=['PATCH'])
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

@app.route('/timeline/<username>/<timeline>', methods=['GET'])
def get_timeline(username, timeline):
    result = col.find_one({"username":username})
    # result = result.get("timelines").get(timeline)
    # result.sort("date")
    return jsonify(result.get("timelines").get(timeline))

@app.route('/topic', methods=['PATCH'])
def create_topic():
    data = json.loads(request.data)
    username = data.get('username')
    timeline = data.get('timeline')
    topic = data.get('topic')
    path = "timelines." + timeline + "." + topic
    description = ""
    date = ""
    # description = create_description(topic)
    # date = get_date(topic)
    date = datetime.strptime(date, '%m-%d-%Y').date()
    db.user_records.update_one(
        {
            "username": username
        }, 
        {
            "$set": {
                path: {
                    "description": description,
                    "date": date
                } 
            }
        }
    )
    all = list(col.find({}))
    return json.dumps(all, default=json_util.default)



# Interactive Stuff

@app.route('/quiz/<topic>', methods=['GET'])
def get_quiz(topic):
    return create_mc(topic)


@app.route('/discussion/<topic>', methods=['GET'])
def get_questions(topic):
    return create_discussion_questions(topic)
    

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
  
