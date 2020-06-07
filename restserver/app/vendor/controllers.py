from flask import Blueprint
from flask import request
from . models import *

vendor = Blueprint('vendor', __name__)


@vendor.route('/add')
def add():
    return "Vendor"
