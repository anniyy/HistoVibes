from openai import OpenAI

client = OpenAI(api_key = "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")


def generate_image(text):
    prompt = text
    response = client.images.generate(prompt=prompt, n=1, size="256x256")
    return response.data[0].url

