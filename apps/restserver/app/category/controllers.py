from flask import Blueprint
from flask_cors import CORS
from flask import request
from flask import Response
from datetime import timedelta
from flask import make_response, request, current_app
from flask import jsonify
from . models import *
import requests
import json
import time
from config import DISTANCE_TO_SEARCH_IN_METERS
category = Blueprint('category', __name__)

CORS(category)

@category.route('/search', methods=['GET','POST'])
def search():
	
	if request.method == 'POST':
		params = request.form	
	else:
		params = request.args

	data = searchcategory(params)
	returnData = []
	print str(len(data))
	for d in data:
		r = requests.get('http://maps.googleapis.com/maps/api/distancematrix/json?origins=' + params.get('latitude') + ',' + params.get('longitude') + '&destinations=' + str(d["latitude"]) + ',' + str(d["longitude"]))
		obj = json.loads(r.text)
        if(obj["rows"][0]["elements"][0]["distance"]["value"] < 80000):
            print str(DISTANCE_TO_SEARCH_IN_METERS)
            returnData.append(d)
	return jsonify(returnData)

@category.route('/filter', methods=['POST'])
def filter():
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
			if cat["id"] == sub_cat["cat_id"]:
				catData.append({"name": sub_cat["name"], "id": sub_cat["id"], "faClass": sub_cat["faClass"]})
		categorySet.append({"sub_categories": catData, "name": cat["name"], "id": cat["id"], "faClass": cat["icon_fa_class"]})
	return jsonify(categorySet)   

