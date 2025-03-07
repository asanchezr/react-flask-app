import time
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

startTime = time.time()


def getUptime():
    """
    Returns the number of seconds since the program started.
    """
    # do return startTime if you just want the process start time
    return time.time() - startTime


@app.route("/healthz")
def healthcheck():
    return jsonify({"status": "Server available", "uptime": getUptime()})
