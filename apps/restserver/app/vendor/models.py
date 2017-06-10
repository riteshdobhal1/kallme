import sys
sys.path.append('/var/www/apps/restserver')
from db import *


def adddb(data):
	username = data.get(tbl_user['user_username'])
	firstname = 'ritesh'
	password = 'demo'
	email= 'ritesh@glassbeam.com'
	lastname = 'Dobhal'
	conn = mysql.connect()
	cursor =conn.cursor()
	cursor.execute("INSERT INTO user (" + firstname + "lstname,email,username,password) VALUES (%s,%s,%s,%s,%s)",(firstname,password,email,username,lastname))
	conn.commit()
	conn.close()
