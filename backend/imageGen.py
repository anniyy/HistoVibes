from openai import OpenAI

client = OpenAI(api_key = "")


def generate_image(text):
    prompt = text
    response = client.images.generate(prompt=prompt, n=1, size="256x256")
    return response.data[0].url

