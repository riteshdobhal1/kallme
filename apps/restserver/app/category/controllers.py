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

@category.route('/list', methods=['GET'])
def list():
	category=['Home Services','Electronics','Travel','Personal Care','Automobiles','Real Estate']
	categorySet=[]
	mylist = listcategory()
	for cat in category:
		catData = []
		for catrow in mylist:
			category = catrow["categoryname"]
			if cat ==  category:
				catData.append(catrow["subcategoryname"])
		categorySet.append({"data":catData,"name":cat})
	return jsonify(categorySet)    
	
