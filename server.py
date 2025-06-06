# server.py
from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    with open('scraped_data.json') as f:
        data = json.load(f)
    return jsonify({"data": data})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

@app.route('/health')
def health():
    return "OK", 200
