from app.dao import get_db, toRest, getSequenceNextValue
from bson.json_util import dumps
from flask import jsonify, request, Blueprint, abort
from datetime import datetime
from app.model.user import User
import jwt
from werkzeug.wrappers import Request
import werkzeug.exceptions as ex
#from cgi import parse_qs, escape
from aiohttp import web
from werkzeug import exceptions
from werkzeug.wrappers import Response
from app.email_service import send_email

session_page = Blueprint('session_page', __name__)

JWT_SECRET = 'secret'
JWT_ALGORITHM = 'HS256'
JWT_EXP_DELTA_SECONDS = 20

def json_response(body='', **kwargs):
    kwargs['body'] = json.dumps(body or kwargs['body']).encode('utf-8')
    kwargs['content_type'] = 'text/json'
    return web.Response(**kwargs)


@session_page.route("/signup", methods=["POST"])
def signup():
    req = request.get_json()
    email = req['email']
    password = req['password']
  
    userId = User(email, password).save()

    payload = {
        'email': email,
    }

    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)
    
    return dumps({'token': jwt_token})


@session_page.route("/login", methods=["POST"])
def login():
    req = request.get_json()
    email = req['email']
    password = req['password']
    
    try:
        user = User.get(email=email)
        user.match_password(password)
    except (User.PasswordDoesNotMatch):
        return toRest('wrong credentials')
    
    payload = {
        'email': user.email,
    }   
    #send_email()
    jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

    return dumps({'token': jwt_token})

class UnrecognizedParametersOrCombination(exceptions.HTTPException):
    code = 460
    description = 'The query parameters or their combination are not recognized!'


class Middleware:

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):

        request = Request(environ)

        if request.path == '/login':
            return self.app(environ, start_response)

        if request.path == '/signup':
            return self.app(environ, start_response)

        request.user = None

        jwt_token = request.headers.get('Authorization', None)
        if jwt_token:
            try:
                token = jwt_token.split()[1]
                payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])     
                user = User.get(email=payload['email'])
                environ['email'] = user.email

            except:
                raise UnrecognizedParametersOrCombination()
        else:
            raise UnrecognizedParametersOrCombination()

        return self.app(environ, start_response)