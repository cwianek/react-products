from app.dao import get_db, toRest, getSequenceNextValue
from bson.json_util import dumps
from flask import jsonify, request, Blueprint
from datetime import datetime

worns_page = Blueprint('worns_page', __name__)

db = get_db()

@worns_page.route("/worns", methods=["POST"])
def addWorns():
    now = datetime.now() 
    date = date_time = now.strftime("%m/%d/%Y")
    req = request.get_json()
    worn = req['worn']
    worn['email'] = request.environ['email']
    worn['id'] = getSequenceNextValue("worn")
    worn['date'] = date
    db.worns.insert_one(worn).inserted_id
    return toRest(worn)

@worns_page.route("/worns", methods=["DELETE"])
def removeWorn():
    now = datetime.now() 
    date = date_time = now.strftime("%m/%d/%Y")
    req = request.get_json()
    worn_id = req['outfitId']
    db.worns.delete_one({'outfitId': worn_id, 'date': date})
    return toRest(worn_id)

def isWorn(outfitId):
    now = datetime.now() 
    date = date_time = now.strftime("%m/%d/%Y")
    #req = request.get_json()
    #worn_id = req['outfitId']
    item = db.worns.find_one({'outfitId': outfitId, 'date': date})
    return True if item != None else False

    
@worns_page.route("/worns-by-date", methods=["GET"])
def fetchWornsByDate():
    email = request.environ['email']
    worns = list(db.worns.find({'email': email}))
    
    result = dict()
    for worn in worns:
        date = worn['date']
        datetimeobject = datetime.strptime(date,'%m/%d/%Y')
        new_format = datetimeobject.strftime('%Y-%m-%d')
        if new_format not in result:
            result[new_format] = []
        result[new_format].append({'weather': worn['weather'], 'outfitId': worn['outfitId']})
        
    return dumps(result)