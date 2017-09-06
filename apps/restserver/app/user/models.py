import sys
sys.path.append('/var/www/apps/restserver')
from flask import Flask
from flask_mail import Message, Mail
from db import *
from config import *
import pymysql

app = Flask(__name__)

mail=Mail(app)

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
	
def addpostfree(data):
	company = data.get('company')
	name = data.get('name')
	city = data.get('city')
	mobile = data.get('mobile')
	email = data.get('email')
	phone = data.get('phone')
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("INSERT INTO " +  tbl_postfreeuser_info_dtls.get('name') +" (" + tbl_postfreeuser_info_dtls.get('columns')[0] + "," + tbl_postfreeuser_info_dtls.get('columns')[1] + "," + tbl_postfreeuser_info_dtls.get('columns')[2]+ "," + tbl_postfreeuser_info_dtls.get('columns')[3] + "," + tbl_postfreeuser_info_dtls.get('columns')[4] + "," + tbl_postfreeuser_info_dtls.get('columns')[5] +") VALUES (%s,%s,%s,%s,%s,%s)",(company,name,email,mobile,phone,city))
	conn.commit()
	conn.close()
	sendmail(email,mobile)	
	
def signupuser(data):
	username = data.get('username')
	password = data.get('password')
	email = data.get('email')
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[1] + "," + tbl_user_dtls.get('columns')[2] +") VALUES (%s,%s,%s)",(username,password,email))
	conn.commit()
	conn.close()		
	
	
def listuser():
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT * FROM " + tbl_user_dtls.get('name'))
	results = cursor.fetchall()
	conn.close()
	return results

def sendmail(email,mobile):
	msg = Message("New Post free Add Request!!",sender=MAIL_SENDER,recipients=[MAIL_RECIPIENTS])
	msg.body = MAIL_BODY1 + "Please contact customer at " + email + " or call at " + mobile + "\r\n\r\n" + MAIL_BODY2
	mail.send(msg)
