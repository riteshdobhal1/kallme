from flask import Flask
from flaskext.mysql import MySQL
app = Flask(__name__)
app.config.from_object('config')

mysql = MySQL()
mysql.init_app(app)

# Description of user table
tbl_user_dtls = {
  'name': 'user',
  'columns': ['firstname', 'lastname', 'username', 'password', 'email', 'phone', 'type']
}

# Description of contactus table
tbl_contactus_dtls = {
  'name': 'contactus',
  'columns': ['name', 'phone', 'email', 'company', 'message']
}

# Description of category table
tbl_category_dtls = {
  'name': 'category',
  'columns': ['id', 'name', 'active']
}

# Description of sub_category table
tbl_sub_category_dtls = {
  'name': 'sub_category',
  'columns': ['id', 'cat_id', 'name', 'active']
}

# Description of city table
tbl_city_dtls = {
  'name': 'city',
  'columns': ['id', 'name']
}

# Description of customer_data table
tbl_customer_data_dtls = {
  'name': 'customer_data',
  'columns': ['id', 'city_id', 'category_id', 'subcategory_id', 'content', 'img','address','phone']
}

# Description of suggestions table
tbl_suggestion_dtls = {
    'name': 'suggestions',
    'columns': ['id', 'title', 'category_id', 'subcategory_id', 'keywords']
}

tbl_agent = "agent"
tbl_vendor = "vendor"
