from flask import Blueprint
from flask_cors import CORS
from flask import request
from flask import Response
from datetime import timedelta
from flask import make_response, request, current_app
from flask import jsonify
from . models import *
suggestions = Blueprint('suggestions', __name__)

CORS(suggestions)

@suggestions.route('/list', methods=['GET'])
def list():
	return jsonify(listSuggestions())