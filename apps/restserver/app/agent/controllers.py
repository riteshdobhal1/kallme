from flask import Blueprint
from flask import request
from . models import *

agent = Blueprint('agent', __name__)


@agent.route('/add')
def add():
    return "Agent"
