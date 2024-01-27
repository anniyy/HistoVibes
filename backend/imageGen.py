from openai import OpenAI

client = OpenAI(api_key = "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")


def generate_image(text):
    prompt = text
    response = client.images.generate(prompt=prompt, n=1, size="256x256")
    return response.data[0].url

