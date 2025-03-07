import time
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

start_time = time.time()


def get_uptime():
    """
    Returns the number of seconds since the program started.
    """
    return time.time() - start_time


@app.route("/healthz")
def health_check():
    return jsonify(
        {
            "status": "Server available",
            "uptime": get_uptime(),
            "upSince": time.ctime(start_time),
        }
    )


@app.route("/")
def index():
    return "404 page not found"
