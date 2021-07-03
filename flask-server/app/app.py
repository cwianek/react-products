from flask import Flask, request, redirect, url_for, jsonify, render_template
from flask_cors import CORS
from app.outfits import outfits_page
from app.products import products_page
from app.worns import worns_page
from app.session import session_page
from app.session import Middleware
from app.session import UnrecognizedParametersOrCombination
from werkzeug.exceptions import HTTPException

app = Flask(__name__)

app.register_blueprint(outfits_page)
app.register_blueprint(products_page)
app.register_blueprint(worns_page)
app.register_blueprint(session_page)
CORS(app)

app.wsgi_app = Middleware(app.wsgi_app)

@app.errorhandler(HTTPException)
def handle_460(e):
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

app.register_error_handler(UnrecognizedParametersOrCombination, handle_460)