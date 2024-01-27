import cohere

API_KEY = "4h6hmUe93DAIiDHW8Nn0tiNFsC4cd0tWyGMJqtlj"

co = cohere.Client(API_KEY)

def summarize_message(text):
    try:
        response = co.generate(
            model='command',
            prompt='give me a short summary about ' + text,
            max_tokens=300,
            temperature=0.9,
            k=0,
            stop_sequences=[],
            return_likelihoods='NONE')
        return response.generations[0].text
    except cohere.CohereError as e:
        print(f"Cohere API Error: {e}")
    except Exception as e:
        print(f"Error: {e}")

#testing
input_text = "This is a sample text that you want to summarize using the cohere library."
summary_result = summarize_message(input_text)
print("\nSummary:\n", summary_result)