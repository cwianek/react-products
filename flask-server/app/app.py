from flask import Flask, request, redirect, url_for, jsonify, render_template
from flask_cors import CORS
from app.outfits import outfits_page
from app.products import products_page
from app.worns import worns_page

app = Flask(__name__)
app.register_blueprint(outfits_page)
app.register_blueprint(products_page)
app.register_blueprint(worns_page)
CORS(app)