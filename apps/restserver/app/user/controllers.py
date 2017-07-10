from flask import Blueprint
from flask_cors import CORS
from flask import request
from flask import Response
from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper
from flask import jsonify
from . models import *
user = Blueprint('user', __name__)

CORS(user)

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
	return jsonify(listuser())
        #return "User list"