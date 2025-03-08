from flask import Flask, jsonify, request
from flask_cors import CORS


from .routes import api

app = Flask(__name__)
cors = CORS(app, origins="*")

# import api blueprint to register it with app
app.register_blueprint(api, url_prefix="/")


# show HTTP error pages as json
@app.errorhandler(404)
@app.errorhandler(405)
def handle_api_error(ex):
    if request.path.startswith("/"):
        return jsonify(error=str(ex)), ex.code
    else:
        return ex


if __name__ == "__main__":
    app.run()
