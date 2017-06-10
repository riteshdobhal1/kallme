import sys
sys.path.append('/var/www/apps/restserver')
from db import *


def adduser(data):
	username = data.get('username')
	password = data.get('password')
	firstname = data.get('firstname')
	lastname = data.get('lastname')
	email = data.get('email')
	usertype = 'guest'
	phone =  data.get('phone')
	conn = mysql.connect()
	cursor =conn.cursor()
	cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[1] + "," + tbl_user_dtls.get('columns')[2]+ "," + tbl_user_dtls.get('columns')[3] + "," + tbl_user_dtls.get('columns')[4] + "," + tbl_user_dtls.get('columns')[5] + "," + tbl_user_dtls.get('columns')[6]+") VALUES (%s,%s,%s,%s,%s,%s,%s)",(firstname,lastname,username,password,email,phone,usertype))
	conn.commit()
	conn.close()
