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

	return jsonify(searchcategory(params))

@category.route('/filter', methods=['POST'])
def filter():
    print request.data
    params = request.data
    return jsonify(filtercategory(params))

@category.route('/list', methods=['GET'])
def list():

	categorySet = []
	category = getcategory()
	sub_category = getsubcategory()
	for cat in category:
		catData = []
		for sub_cat in sub_category:
			#category = sub_cat["categoryname"]
			if cat["id"] == sub_cat["cat_id"]:
				catData.append({"name": sub_cat["name"], "id": sub_cat["id"]})
		categorySet.append({"sub_categories": catData, "name": cat["name"], "id": cat["id"]})
	return jsonify(categorySet)   

