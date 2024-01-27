from openai import OpenAI
import os
import json

client = OpenAI(
  api_key="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"
)

def create_description(topic):
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
    return completion.choices[0].message.content

def create_discussion_questions(topic):
    prompt = "Can you create 3 discussion questions based on the topic " + topic + " in json format as follows: [{'question': 'question1'}, ...]"
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
    start = response.find("[")
    end = response.rfind("]")
    response = response[:start] + "{" + response[start+1:end] + "}" + response[end + 1:]
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
    print(response)

    start = response.find("[")
    end = response.rfind("]")

    response = "{" + response[start+1:end] + "}"
    print(response)
    return json.loads(response)