from flask import Blueprint
from flask import request
from . models import *
user = Blueprint('user', __name__)


@user.route('/add', methods=['GET','POST'])
def add():
	if request.method == 'POST':
		params = request.form	
	else:
		params = request.args

	adduser(params)
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
        listuser()
        return "User list"
