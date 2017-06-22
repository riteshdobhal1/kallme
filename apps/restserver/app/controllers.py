import os
from flask import Flask, render_template, send_from_directory, send_file, Blueprint

root = Blueprint('root', __name__)

@root.route('/')
def webprint():
    return send_file('static/index.html')
