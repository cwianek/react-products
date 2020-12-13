from app.dao import get_db, toRest, getSequenceNextValue
from bson.json_util import dumps
from flask import jsonify, request, Blueprint
from app.predict_outfit import predict
from app.worns import isWorn

db = get_db()

outfits_page = Blueprint('outfits_page', __name__)

@outfits_page.route("/outfit", methods=["POST"])
def addOutfit():
    req = request.get_json()
    outfit = req['outfit']
    outfit['id'] = getSequenceNextValue("outfit")
    db.outfits.insert_one(outfit).inserted_id
    return dumps(outfit)

@outfits_page.route("/outfit", methods=["DELETE"])
def removeOutfit():
    req = request.get_json()
    id = req['id']
    db.outfits.delete_one({'id': id})
    return toRest(id)

@outfits_page.route("/outfits-by-weather", methods=["POST"])
def fetchOutfits():
    #outfits = list(db.outfits.find({}))
    req = request.get_json()
    weather = req['weather']
    predicted = predict(weather)
    for pred in predicted:
        pred["worn"] = isWorn(pred["id"])
    return dumps(predicted)