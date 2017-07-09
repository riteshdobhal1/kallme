from flask import Blueprint
from flask_cors import CORS
from flask import request
from flask import Response
from datetime import timedelta
from flask import make_response, request, current_app
from flask import jsonify
from . models import *
category = Blueprint('category', __name__)

CORS(category)

@category.route('/search', methods=['GET','POST'])
def search():
	
	if request.method == 'POST':
		params = request.form	
	else:
		params = request.args

@category.route('/list', methods=['GET'])
def list():
	return jsonify(listcategory())
