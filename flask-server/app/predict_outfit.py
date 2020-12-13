import pymongo
from pymongo import ReturnDocument
import pandas as pd
from sklearn import preprocessing
from sklearn.neighbors import KNeighborsClassifier
import numpy as np

client = pymongo.MongoClient("localhost", 27017)
db = client.outfitPlanner

dataMapper = lambda outfit: {
    "temp": outfit["weather"]["temp"],
    "worn_times": getWornTimes(outfit),
    "clouds": outfit["weather"]["clouds"],
    "humidity": outfit["weather"]["humidity"],
    "pressure": outfit["weather"]["pressure"],
    "wind_speed": outfit["weather"]["wind_speed"]
}

def getWornTimes(outfit):
    if outfit.get("outfitId") == None:
        return 1
    else:
        return db.worns.count_documents({"outfitId": outfit["outfitId"]})

def scale_features(X):
    X[:, 0] *= 5
    X[:, 1] *= 2
    return X

def getData():
    outfits = list(db.worns.find({}))
    data = [dataMapper(outfit) for outfit in outfits ]
    y_data = pd.DataFrame(outfits)
    Y = y_data.loc[:, y_data.columns == "outfitId"]

    df = pd.DataFrame(data)
    X = df.loc[:, df.columns != 'outfitId']
    #scaler = preprocessing.StandardScaler().fit(X)
    scaler = preprocessing.MinMaxScaler().fit(X)
    X_scaled = scaler.transform(X)
    X_scaled = scale_features(X_scaled)
    
    return (X_scaled, Y, scaler)

def predict_new_case(neigh, scaler, weather):
    print("WEATHER: ", weather)
    newOutfit = dict({
        "weather": weather
    })
    newOutfitWeighted = dataMapper(newOutfit)
    newCase = [newOutfitWeighted]
    newCaseDf = pd.DataFrame(newCase)
    scaled = scaler.transform(newCaseDf[0:1])
    scaled = scale_features(scaled)

    pred_proba = neigh.predict_proba(scaled)
    return pred_proba[0]

def predict(weather):
    X_scaled, Y, scaler = getData()

    neigh = KNeighborsClassifier(n_neighbors=5)
    neigh.fit(X_scaled, Y.values.ravel())

    pred_proba = predict_new_case(neigh, scaler, weather)

    zipped = zip(neigh.classes_, pred_proba)
    sortedOutfits = sorted(zipped, key = lambda t: t[1])
    print("Sorted outfits: ", sortedOutfits)

    wornIds = [int(x[0]) for x in sortedOutfits]
    res = np.array([list(db.outfits.find({"id": x})) for x in wornIds]).flatten()
    outfitsNeverWorn = np.array(list(db.outfits.find({"id": {"$nin": wornIds}})))
    return np.concatenate((outfitsNeverWorn, res))
