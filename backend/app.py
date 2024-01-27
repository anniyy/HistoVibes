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
def create_user(username=None):
    try:
        data = json.loads(request.data)
        username = data.get('username')

        if not db.user_records.find_one({"username":username}):
            result = db.user_records.insert_one({
            'username': username,
            'timelines':{}
            })
        
        result = col.find_one({"username":username})
        print(result)
        return jsonify(result.get("timelines"))
    
    except:
        print("An error has occurred")
        return ""
        

@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    try:
        result = list(col.find_one({"username":username}))
        if result == None:
            create_user(username)
        return jsonify(result.get("timelines"))
    except:
        print("An error has occurred")
        return ""


@app.route('/timeline', methods=['PATCH'])
def create_timeline():
    try:
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
    except:
        print("An error has occurred")
    finally:
        all = list(col.find({}))
        return json.dumps(all, default=json_util.default)

@app.route('/timeline/<username>/<timeline>', methods=['GET'])
def get_timeline(username, timeline):
    try:
        result = col.find_one({"username":username})
        if result == None:
            print("No such user")
            return ""
        x = db.user_records.find_one({"username":username}).get("timelines").get(timeline)
        result= sorted(x.items(), key = lambda x: x[1]['date'])
        print(result)
        return jsonify(result)
    except:
        print("An error has occurred")
        return ""

@app.route('/topic', methods=['PATCH'])
def create_topic():
    try:
        data = json.loads(request.data)
        username = data.get('username')
        timeline = data.get('timeline')
        topic = data.get('topic')
        path = "timelines." + timeline + "." + topic

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
        x = db.user_records.find_one({"username":username}).get("timelines").get(timeline)
        result= sorted(x.items(), key = lambda x: x[1]['date'])
        print(result)
        return jsonify(result)
    except:
        print("An error has occurred")
        return json.loads('{}')



# Interactive Stuff

@app.route('/quiz/<topic>', methods=['GET'])
def get_quiz(topic):
    return create_mc(topic)


@app.route('/discussion/<topic>', methods=['GET'])
def get_questions(topic):
    return create_discussion_questions(topic)