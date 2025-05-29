from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import os
import requests

app = Flask(__name__)
limiter = Limiter(app, key_func=get_remote_address)

# Download model file if not present
def download_model(url, path):
    if not os.path.exists(path):
        response = requests.get(url)
        with open(path, "wb") as f:
            f.write(response.content)

# Load model
try:
    base_model_name = "microsoft/biogpt"
    tokenizer = AutoTokenizer.from_pretrained(base_model_name)
    adapter_path = "./model"
    model_url = os.getenv("MODEL_URL", "")  # Set in Heroku config vars
    if model_url:
        download_model(model_url, "./model/adapter_model.safetensors")
    base_model = AutoModelForCausalLM.from_pretrained(base_model_name, torch_dtype=torch.float32).to("cpu")
    model = PeftModel.from_pretrained(base_model, adapter_path).to("cpu")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

# Function to generate responses
def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors="pt").to("cpu")
    output = model.generate(
        **inputs, 
        max_length=200, 
        temperature=0.8,
        top_p=0.9,
        do_sample=True
    )
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return extract_and_format_answer(generated_text)

# Extract & format AI-generated response
def extract_and_format_answer(response):
    sections = {
        "Malnutrition Risk Level": "",
        "Key Deficiency Noticed": "",
        "Immediate Advice": "",
    }
    for key in sections.keys():
        start_idx = response.find(key)
        if start_idx != -1:
            end_idx = min(
                [response.find(k, start_idx + 1) for k in sections.keys() if response.find(k, start_idx + 1) != -1] + [len(response)]
            )
            sections[key] = response[start_idx + len(key) + 1:end_idx].strip()
    formatted_response = (
        f"Malnutrition Risk Level:\n{sections['Malnutrition Risk Level']}\n\n"
        f"Key Deficiency Noticed:\n{sections['Key Deficiency Noticed']}\n\n"
        f"Immediate Advice:\n{sections['Immediate Advice']}"
    )
    return {"response": formatted_response}

@app.route("/generate_results", methods=["POST"])
@limiter.limit("10 per minute")
def generate():
    try:
        data = request.json
        prompt = data.get("prompt", "")
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400
        response = generate_response(prompt)
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5001)))