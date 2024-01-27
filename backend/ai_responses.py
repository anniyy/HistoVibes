from openai import OpenAI
import os
import json
import datetime

client = OpenAI(
  api_key="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"
)

def create_description(topic):
    try:
        prompt = "Write a description about " + topic + " in order to educate someone about it"
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user", 
                "content": prompt
            }
        ]
        )
        return completion.choices[0].message.content
    except:
        print("An error has occurred")
        return ""

def get_date(topic):
    prompt = "When was " + topic + " released, published, or invented. Please give me a date in dd/mm/yyyy format with no words or sentences in your response"
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {
            "role": "user", 
            "content": prompt
        }
    ]
    )
    date = completion.choices[0].message.content
    date = datetime.datetime.strptime(date, '%d/%m/%Y').date()
    date = datetime.datetime.combine(date, datetime.time.min)
    return date

def create_discussion_questions(topic):
    prompt = "Can you create 3 discussion questions based on the topic " + topic + ' in json format as follows: [{"question": "question1"}, ...]'
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {
            "role": "user", 
            "content": prompt
        }
    ]
    )
    response = completion.choices[0].message.content
    response.strip("/n")
    print(response)

    start = response.find("[")
    end = response.rfind("]")

    response = '''%s''' %response[start:end+1]
    print(response)
    return json.loads(response)

def create_mc(topic):
    prompt = "Can you create 5 multiple choice quiz questions about " + topic + " along with their answers in a json format as follows: [{'question':'question1', 'options':[], 'answer':'answer1}, ...]"
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
        {"role": "user", "content": prompt}
    ]
    )

    response = completion.choices[0].message.content
    response.strip("/n")
    print(response)

    start = response.find("[")
    end = response.rfind("]")

    response = '''%s''' %response[start:end+1]
    print(response)
    return json.loads(response)