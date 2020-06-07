from flask import Blueprint
from flask import request
from . models import *

contact = Blueprint('contact', __name__)

@contact.route('/add',methods=['GET','POST'])
def add():
	if request.method == 'POST':
		params = request.form
	else:
		params = request.args
	addcontactus(params)
	return "Contact added"
