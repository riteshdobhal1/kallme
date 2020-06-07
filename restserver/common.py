import flask
from flask import Blueprint
from flask_cors import CORS
from flask import request
from flask import Response
from flask import make_response, request, current_app, session

common = Blueprint('common', __name__)

CORS(common, resources={r"/*": {"origins": "*","supports_credentials":True}})

def check_session():
    if 'session' in flask.request.cookies:
        userid=flask.request.cookies.get('userid')
        session_id=flask.request.cookies.get('session')
        if session['userid'] == userid:
            return 1
        else:
            return 0