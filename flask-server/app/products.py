from app.dao import get_db, toRest, getSequenceNextValue
from bson.json_util import dumps
from flask import jsonify, request, Blueprint

products_page = Blueprint('products_page', __name__)

db = get_db()

@products_page.route("/product", methods=["POST"])
def addProduct():
    req = request.get_json()
    product = req['product']
    product['id'] = getSequenceNextValue("product")
    product['email'] = request.environ['email']
    product['base64'] = str(product['base64'])
    id = db.products.insert_one(product).inserted_id
    return dumps(product)

@products_page.route("/image", methods=["POST"])
def getImage():
    req = request.get_json()
    print(req)
    id = req['id']
    product = db.products.find_one({'id': id})
    return dumps(product['base64'])

@products_page.route("/product", methods=["DELETE"])
def removeProduct():
    req = request.get_json()
    id = req['id']
    db.products.delete_one({'id': id})
    return toRest(id)

@products_page.route("/products", methods=["GET"])
def getProducts():
    fields = {field: 1 for field in ["id", "category", "localUri"]}
    email = request.environ['email']
    products = list(db.products.find({'email': email}, fields))
    print(products)
    return dumps(products)