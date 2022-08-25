from flask import Flask, request
from parser import calculate_quarterly
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=["POST"])
def send_data():
    req = request.data
    input_ = req.decode("utf-8").split(",")
    start = input_[0]
    pto = input_[1]
    sick = input_[2]
    return calculate_quarterly([start, pto, sick])
