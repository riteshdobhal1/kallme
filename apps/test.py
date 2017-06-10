from flask import Flask
from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'kallme'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Klubibn@06'
app.config['MYSQL_DATABASE_DB'] = 'kallme'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)

conn = mysql.connect()
cursor =conn.cursor()

cursor.execute("SELECT * from user")
data = cursor.fetchone()
print(data)
