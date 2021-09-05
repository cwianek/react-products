from app.dao import get_db, toRest, getSequenceNextValue
from bson.json_util import dumps
from flask import jsonify, request, Blueprint
from app.predict_outfit import predict
from app.worns import isWorn

db = get_db()

outfits_page = Blueprint('outfits_page', __name__)

n_neighbors = 3

@outfits_page.route("/outfit", methods=["POST"])
def addOutfit():
    req = request.get_json()
    outfit = req['outfit']
    outfit['id'] = getSequenceNextValue("outfit")
    outfit['email'] = request.environ['email']
    db.outfits.insert_one(outfit).inserted_id
    return dumps(outfit)

@outfits_page.route("/outfit", methods=["DELETE"])
def removeOutfit():
    req = request.get_json()
    id = req['id']
    db.outfits.delete_one({'id': id})
    db.worns.delete_many({'outfitId': id})
    return toRest(id)

@outfits_page.route("/outfits-by-weather", methods=["POST"])
def fetchOutfits():
    email = request.environ['email']
    worns = list(db.worns.find({'email': email}))
    req = request.get_json()
    weather = req['weather']
    result = []

    if len(worns) > n_neighbors:
        result = predict(weather)
    else:
        result = list(db.outfits.find({'email': email}))

    for res in result:
        res["worn"] = isWorn(res["id"])

    return dumps(result)