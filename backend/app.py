import asyncio
import json
from pymongo import MongoClient
import json
from flask import Flask, request, jsonify
from bson import json_util
import certifi
from ai_responses import *
from datetime import datetime
from flask_cors import CORS, cross_origin

uri = "mongodb+srv://uofthacks:Hackathons2024@test.jzwidop.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client["histovibes"]
col = db["user_records"]

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def index():
    return 'index.html'

@app.route('/user', methods=['POST'])
@cross_origin()
def create_user(username=None):
    try:
        data = json.loads(request.data)
        username = data.get('username')

        if not db.user_records.find_one({"username":username}):
            result = db.user_records.insert_one({
            'username': username,
            'timelines':{}
            })
        
        result = list(col.find_one({"username":username}))
        return jsonify(result.get("timelines"))
    
    except:
        print("An error has occurred")
        return "An error has occured"
        

@app.route('/user/<username>', methods=['GET'])
@cross_origin()
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
@cross_origin()
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
    except:
        print("An error has occurred")
    finally:
        all = list(col.find({}))
        return json.dumps(all, default=json_util.default)



# Interactive Stuff

@app.route('/quiz/<topic>', methods=['GET'])
@cross_origin()
def get_quiz(topic):
    return create_mc(topic)


@app.route('/discussion/<topic>', methods=['GET'])
@cross_origin()
def get_questions(topic):
    return create_discussion_questions(topic)
    
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
  
