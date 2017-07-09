from flask import Flask
from flaskext.mysql import MySQL
app = Flask(__name__)
app.config.from_object('config')

mysql = MySQL()
mysql.init_app(app)

tbl_user_dtls = {'name':'user','columns':['firstname','lastname','username','password','email','phone','type']}
tbl_contactus_dtls = {'name':'contactus','columns':['name','phone','email','company','message']}
tbl_category_dtls = {'name':'category','columns':['id','name','active']}
tbl_sub_category_dtls = {'name':'sub_category','columns':['id','cat_id','name','active']}
tbl_agent = "agent"
tbl_vendor = "vendor"
