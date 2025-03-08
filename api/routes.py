import time
from flask import Blueprint, jsonify, request

from .services.overpass_service import get_restaurants
from .services.uptime_service import get_start_time, get_uptime

# main blueprint to be registered with application
api = Blueprint("api", __name__)


@api.route("/")
def index():
    return "404 page not found"


@api.route("/healthz")
def health_check():
    return jsonify(
        {
            "status": "Server available",
            "uptime": get_uptime(),
            "upSince": time.ctime(get_start_time()),
        }
    )


@api.route("/places", methods=["GET"])
def places():
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    places = get_restaurants(lat, lon)
    return jsonify(places)
