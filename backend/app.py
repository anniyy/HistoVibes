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
    data = json.loads(request.data)
    username = data.get('username')

    if not db.user_records.find_one({"username":username}):
        result = db.user_records.insert_one({
        'username': username,
        'timelines':{}
        })
    all = list(col.find({}))
    return json.dumps(all, default=json_util.default)

@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    result = list(col.find({"username":username}))
    return jsonify(result.get("timelines"))

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
    x = db.user_records.find_one({"username":username}).get("timelines").get(timeline)
    # print(x)
    result= sorted(x.items(), key = lambda x: x[1]['date'])
    print(result)
    return jsonify(result)

@app.route('/topic', methods=['PATCH'])
def create_topic():
    data = json.loads(request.data)
    username = data.get('username')
    timeline = data.get('timeline')
    topic = data.get('topic')
    path = "timelines." + timeline + "." + topic
    temp_path = path + ".description"

    # if db.user_records.find({"username":username, temp_path:{}}):
    #     print("yay")
    # else:
    #     print("no")

    q = db.user_records.find_one({"username":username})
    q = q.get("timelines").get(timeline).get(topic)
    print(q)
    print (q == None)

    if q == None:
        description = create_description(topic)
        date = get_date(topic)
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