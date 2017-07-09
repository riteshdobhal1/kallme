from flask import Flask
from app.agent.controllers import agent
from app.vendor.controllers import vendor
from app.user.controllers import user
from app.contact.controllers import contact
from app.category.controllers import category

app = Flask(__name__)
app.config.from_object('config')

app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(vendor, url_prefix='/vendor')
app.register_blueprint(agent, url_prefix='/agent')
app.register_blueprint(contact, url_prefix='/contact')
app.register_blueprint(category, url_prefix='/category')
