import pymongo
from bson.json_util import dumps
from flask import jsonify
from pymongo import ReturnDocument
import os

client = pymongo.MongoClient(os.getenv('MONGODB_URI', default='mongodb://localhost:27017/'))
db = client.outfitPlanner

def get_db():
    return db

def toRest(model):
    return jsonify(dumps(model))

def getSequenceNextValue(seqName):
    seqDoc = db.sequence.find_one_and_update({ '_id': seqName },
    { '$inc': { 'seqValue': 1 } }, upsert=True, return_document=ReturnDocument.AFTER)

    return seqDoc['seqValue']