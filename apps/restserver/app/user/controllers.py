import flask
from flask import Blueprint
from flask_cors import CORS
from flask import request
from flask import Response
from datetime import timedelta
from flask import make_response, request, current_app, session
from functools import update_wrapper
from flask import jsonify
from common import check_session

import json
from . models import *

user = Blueprint('user', __name__)

CORS(user, resources={r"/*": {"origins": "*","supports_credentials":True}})

@user.route('/add', methods=['GET','POST'])
def add():
	if request.method == 'POST':
		params = request.form	
	else:
		params = request.args

	
	adduser(params)
	app.logger.debug("test")
	return request.args['username']

@user.route('/delete', methods=['POST'])
def delete():
        deleteuser()
        return "User deleted"

@user.route('/update', methods=['POST'])
def update():
	updateuser()
	return "User updated"

@user.route('/list', methods=['GET'])
def list():
	
	is_session = check_session()
	if is_session:
		resp = make_response(jsonify(listuser()))
		return resp
	else:
		return "invalid_session"
	        
@user.route('/listvendor', methods=['POST'])
def listvendor():
	is_session = check_session()
	if is_session:
		json = request.json
		response = listuservendor(json)
		return jsonify(response) 
	else:
		return "invalid_session"    

@user.route('/postfree', methods=['POST'])
def postfree():
	
	json = request.json
	response = addpostfree(json)
	return jsonify(response)

@user.route('/signup', methods=['POST'])
def signup():
	json = request.json
	response  = signupuser(json)
	return jsonify(response)

@user.route('/adduser', methods=['POST'])
def adduser():
	is_session = check_session()
	if is_session:
		json = request.json
		response  = adduserdata(json)
		return jsonify(response)
	else:
		return "invalid_session"

@user.route('/login', methods=['POST'])
def login():
	json = request.json
	response = loginuser(json)
	
	session['userid'] = json['username'] 
	resp = make_response(jsonify(response))
	resp.set_cookie('userid',session['userid'])
	return resp

@user.route('/logout', methods=['GET'])
def logout():
	resp = make_response("",200)
	resp.set_cookie('userid','',expires=0)	
	session.clear()
	
	return resp	

@user.route('/changeuserstate', methods=['POST'])
def changeuserstate():
	is_session = check_session()
	if is_session:
		json = request.json
		response = changestate(json)
		return jsonify(response)
	else:
		return "invalid_session"

@user.route('/deleteuser', methods=['POST'])
def deleteuser():
	is_session = check_session()
	if is_session:
		json = request.json
		response = deleteselecteduser(json)
		return jsonify(response)
	else:
		return "invalid_session"
	
@user.route('/getuserdetails', methods=['POST'])
def getuserdetails():
	is_session = check_session()
	if is_session:
		json = request.json
		response = getuser(json)
		return jsonify(response)
	else:
		return "invalid_session"
		
@user.route('/updateuserdetails', methods=['POST'])
def updateuserdetails():
	is_session = check_session()
	if is_session:
		json = request.json
		response = updateuser(json)
		return jsonify(response)
	else:
		return "invalid_session"


@user.route('/getcitylist', methods=['GET'])
def getcitylist():
	return jsonify(getcity())

@user.route('/getpacklist', methods=['GET'])
def getpacklist():
	return jsonify(getpack())
