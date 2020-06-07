import sys
sys.path.append('/var/www/apps/restserver')
from flask import Flask
from flask_mail import Message, Mail
from db import *
from config import *
import pymysql

app = Flask(__name__)
	
mail=Mail(app)

def adduserdata(data):
	
	company = data.get('company')
	city = data.get('city_id')
	mobile = data.get('mobile')
	email = data.get('email')
	phone = data.get('phone')
	address = data.get('address')
	category = data.get('category_id')
	subcategory = data.get('subcategory_id')
	user_admin = data.get('admin_id')
	pack_id = data.get('pack')
	type = data.get('type')
	sms = data.get('sms')
	payment_mode = data.get('payment_mode')
	transactionnumber = data.get('transactionumber')
	utrnumber = data.get('utrnumber')
	bankname = data.get('bankname')
	bankaddress = data.get('bankaddress')
	chequenumber = data.get('chequenumber')
	conn = mysql.connect()
	cursor = conn.cursor()
	
	
	
	qry = "SELECT * FROM " + tbl_user_dtls.get('name') + " WHERE " +  tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + "='" + str(mobile) + "'" 
	cursor.execute(qry)
	count = cursor.rowcount
	
	if count == 1:
		return "msg_5"
	else:
		if type == "vendor":
			cursor.execute("INSERT INTO " +  tbl_postfreeuser_info_dtls.get('name') +" (" + tbl_postfreeuser_info_dtls.get('columns')[0] + "," + tbl_postfreeuser_info_dtls.get('columns')[2]+ "," + tbl_postfreeuser_info_dtls.get('columns')[3] + "," + tbl_postfreeuser_info_dtls.get('columns')[4] + "," + tbl_postfreeuser_info_dtls.get('columns')[5] + "," + tbl_postfreeuser_info_dtls.get('columns')[6] + "," + tbl_postfreeuser_info_dtls.get('columns')[7] + "," + tbl_postfreeuser_info_dtls.get('columns')[8] +") VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(company,email,mobile,phone,city,address,category,subcategory))
		
		if type == "agent":
			cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3]+ "," + tbl_user_dtls.get('columns')[4] + "," + tbl_user_dtls.get('columns')[9] + ") VALUES (%s,%s,%s,%s,%s)",(company,email,type,user_admin,mobile))
		else:
			if payment_mode == "PAYTM":
				cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3]+ "," + tbl_user_dtls.get('columns')[4] + "," + tbl_user_dtls.get('columns')[9] + "," + tbl_user_dtls.get('columns')[10] + "," + tbl_user_dtls.get('columns')[11] + "," + tbl_user_dtls.get('columns')[12] + "," + tbl_user_dtls.get('columns')[16] + ") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)",(company,email,type,user_admin,mobile,pack_id,sms,payment_mode,transactionnumber))
			elif payment_mode == "NEFT":
				cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3]+ "," + tbl_user_dtls.get('columns')[4] + "," + tbl_user_dtls.get('columns')[9] + "," + tbl_user_dtls.get('columns')[10] + "," + tbl_user_dtls.get('columns')[11] + "," + tbl_user_dtls.get('columns')[12] + "," + tbl_user_dtls.get('columns')[17] + ") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)",(company,email,type,user_admin,mobile,pack_id,sms,payment_mode,utrnumber))
			elif payment_mode == "CHEQUE":
				cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3]+ "," + tbl_user_dtls.get('columns')[4] + "," + tbl_user_dtls.get('columns')[9] + "," + tbl_user_dtls.get('columns')[10] + "," + tbl_user_dtls.get('columns')[11] + "," + tbl_user_dtls.get('columns')[12] + "," + tbl_user_dtls.get('columns')[13] + "," + tbl_user_dtls.get('columns')[14] + "," + tbl_user_dtls.get('columns')[15] + ") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",(company,email,type,user_admin,mobile,pack_id,sms,payment_mode,chequenumber,bankname,bankaddress))
			else:
				cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3]+ "," + tbl_user_dtls.get('columns')[4] + "," + tbl_user_dtls.get('columns')[9] + "," + tbl_user_dtls.get('columns')[10] + "," + tbl_user_dtls.get('columns')[11] + "," + tbl_user_dtls.get('columns')[12] + ") VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(company,email,type,user_admin,mobile,pack_id,sms,payment_mode))		
					
	conn.commit()
	conn.close()
	
	return "msg_6"
	
def addpostfree(data):
	company = data.get('company')
	#city = data.get('city_id')
	city = "549"
	mobile = data.get('mobile')
	#email = data.get('email')
	email = ""
	#phone = data.get('phone')
	phone = ""
	address = data.get('address')
	category = data.get('category_id')
	subcategory = data.get('subcategory_id')
	type = "vendor"
	status = "1"
	conn = mysql.connect()
	cursor = conn.cursor()
	
	qry = "SELECT * FROM " + tbl_user_dtls.get('name') + " WHERE " +  tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + "='" + str(mobile) + "'" 
	cursor.execute(qry)
	count = cursor.rowcount
	
	if count == 1:
		return str(company) + ":" + str(mobile) + ":" + str(address) + ":" + str(category) + ":" + str(subcategory) + ":" + "msg_5"
	else:
		cursor.execute("INSERT INTO " +  tbl_postfreeuser_info_dtls.get('name') +" (" + tbl_postfreeuser_info_dtls.get('columns')[0] + "," + tbl_postfreeuser_info_dtls.get('columns')[2]+ "," + tbl_postfreeuser_info_dtls.get('columns')[3] + "," + tbl_postfreeuser_info_dtls.get('columns')[4] + "," + tbl_postfreeuser_info_dtls.get('columns')[5] + "," + tbl_postfreeuser_info_dtls.get('columns')[6] + "," + tbl_postfreeuser_info_dtls.get('columns')[7] + "," + tbl_postfreeuser_info_dtls.get('columns')[8] +") VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(company,email,mobile,phone,city,address,category,subcategory))
		cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3] + "," + tbl_user_dtls.get('columns')[9] +") VALUES (%s,%s,%s,%s)",(company,email,type,mobile))
		cursor.execute("INSERT INTO " + tbl_customer_data_dtls.get('name') + " (" + tbl_customer_data_dtls.get('columns')[1] + "," + tbl_customer_data_dtls.get('columns')[2] + "," + tbl_customer_data_dtls.get('columns')[3] + "," + tbl_customer_data_dtls.get('columns')[4] + "," + tbl_customer_data_dtls.get('columns')[6] + "," + tbl_customer_data_dtls.get('columns')[7] + ") SELECT " + tbl_postfreeuser_info_dtls.get('columns')[5] + "," + tbl_postfreeuser_info_dtls.get('columns')[7] + "," + tbl_postfreeuser_info_dtls.get('columns')[8] + "," + tbl_postfreeuser_info_dtls.get('columns')[0] + "," + tbl_postfreeuser_info_dtls.get('columns')[6] + "," + tbl_postfreeuser_info_dtls.get('columns')[3] + " FROM " + tbl_postfreeuser_info_dtls.get('name') + " WHERE " + tbl_postfreeuser_info_dtls.get('columns')[3] + "='" + str(mobile) + "'")
		cursor.execute("UPDATE " + tbl_customer_data_dtls.get('name') +" SET " + tbl_customer_data_dtls.get('columns')[9] + "='" + str(status) + "' WHERE " + tbl_customer_data_dtls.get('columns')[7] + "='" + str(mobile) +"'")
		cursor.execute("UPDATE " +  tbl_user_dtls.get('name') +" SET " + tbl_user_dtls.get('columns')[6] + "='" + str(status) + "' WHERE " + tbl_user_dtls.get('columns')[9] + "='" + str(mobile) +"'")
	
	conn.commit()
	conn.close()
	#sendmail(email,mobile)
	return "msg_7"	
	
def signupuser(data):
	username = data.get('username')
	password = data.get('password')
	email = data.get('email')
	type = data.get('type')
	mob = data.get('mobile')
	name = data.get('name')
	conn = mysql.connect()
	cursor = conn.cursor()
	
	qry = "SELECT " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[0] + " , " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[1] + ", " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + " FROM " + tbl_user_dtls.get('name') + " WHERE " +  tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[0] + "='" + username + "' AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[1] + "='" + password + "'" 
	cursor.execute(qry)
	count = cursor.rowcount
	
	if count == 1:
		results = cursor.fetchone()
		conn.commit() 
		conn.close()
		user = results[0]
		passwd = results[1]
		mobile = results[9]
		if mob == mobile:
			return "msg_2"
		else:
			return "msg_3"      	 
	else:
		cursor.execute("INSERT INTO " +  tbl_user_dtls.get('name') +" (" + tbl_user_dtls.get('columns')[0] + "," + tbl_user_dtls.get('columns')[1] + "," + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('columns')[3] + "," + tbl_user_dtls.get('columns')[7] + "," + tbl_user_dtls.get('columns')[9] +") VALUES (%s,%s,%s,%s,%s,%s)",(username,password,email,type,name,mob))
		conn.commit() 
		conn.close()
		return "msg_1"
	
def	loginuser(data):
	username = data.get('username')
	password = data.get('password')
	
	conn = mysql.connect()
	cursor = conn.cursor()
	
	
		
	qry = "SELECT " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[0] + " , " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[1] + ", " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[2] + "," + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[3] + "," + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[5] + " FROM " + tbl_user_dtls.get('name') + " WHERE " +  tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[0] + "='" + username + "' AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[1] + "='" + password + "'" 
	cursor.execute(qry)
	count = cursor.rowcount
	
	if count ==  1:
		results = cursor.fetchone()
		conn.commit() 
		conn.close()
		##type = results[3]
		user = results
		return user
			
	else:
		return "msg_6"
	

def listuser():
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT * FROM " + tbl_user_dtls.get('name') + "," + tbl_postfreeuser_info_dtls.get('name') + " WHERE " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + "=" + tbl_postfreeuser_info_dtls.get('name') + "." + tbl_postfreeuser_info_dtls.get('columns')[3] + " AND type!='admin'")
	results = cursor.fetchall()
	conn.close()
	return results

def listuservendor(data):
	admin_id = data.get("admin_id")
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT * FROM " + tbl_user_dtls.get('name') + "," + tbl_postfreeuser_info_dtls.get('name') + " WHERE " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + "=" + tbl_postfreeuser_info_dtls.get('name') + "." + tbl_postfreeuser_info_dtls.get('columns')[3] + " AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[3] + "='vendor' AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[4] + "='" + str(admin_id) + "'")
	results = cursor.fetchall()
	conn.close()
	return results

def sendmail(email,mobile):
	msg = Message("New Post free Add Request!!",sender=MAIL_SENDER,recipients=[MAIL_RECIPIENTS])
	msg.body = MAIL_BODY1 + "Please contact customer at " + email + " or call at " + mobile + "\r\n\r\n" + MAIL_BODY2
	mail.send(msg)

def changestate(data):
	user_id = data.get('user_id')
	status = data.get('status')
	type = data.get('type')
	mobile = data.get('mobile')
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	
	if type == "vendor":
		cursor.execute("SELECT * FROM " + tbl_customer_data_dtls.get('name') + " WHERE " + tbl_customer_data_dtls.get('columns')[7] + "='" + str(mobile) + "'")
		count = cursor.rowcount
		if count == 1:
			cursor.execute("UPDATE " +  tbl_customer_data_dtls.get('name') +" SET " + tbl_customer_data_dtls.get('columns')[9] + "='" + str(status) + "' WHERE " + tbl_customer_data_dtls.get('columns')[7] + "='" + str(mobile) +"'")
		else:	
			cursor.execute("INSERT INTO " + tbl_customer_data_dtls.get('name') + " (" + tbl_customer_data_dtls.get('columns')[1] + "," + tbl_customer_data_dtls.get('columns')[2] + "," + tbl_customer_data_dtls.get('columns')[3] + "," + tbl_customer_data_dtls.get('columns')[4] + "," + tbl_customer_data_dtls.get('columns')[6] + "," + tbl_customer_data_dtls.get('columns')[7] + ") SELECT " + tbl_postfreeuser_info_dtls.get('columns')[5] + "," + tbl_postfreeuser_info_dtls.get('columns')[7] + "," + tbl_postfreeuser_info_dtls.get('columns')[8] + "," + tbl_postfreeuser_info_dtls.get('columns')[0] + "," + tbl_postfreeuser_info_dtls.get('columns')[6] + "," + tbl_postfreeuser_info_dtls.get('columns')[3] + " FROM " + tbl_postfreeuser_info_dtls.get('name') + " WHERE " + tbl_postfreeuser_info_dtls.get('columns')[3] + "='" + str(mobile) + "'")      
			cursor.execute("UPDATE " + tbl_customer_data_dtls.get('name') +" SET " + tbl_customer_data_dtls.get('columns')[9] + "='" + str(status) + "' WHERE " + tbl_customer_data_dtls.get('columns')[7] + "='" + str(mobile) +"'")
	
	cursor.execute("UPDATE " +  tbl_user_dtls.get('name') +" SET " + tbl_user_dtls.get('columns')[6] + "='" + str(status) + "' WHERE " + tbl_user_dtls.get('columns')[9] + "='" + str(mobile) +"'")
	conn.commit() 
	conn.close()
	return "msg_7"

def deleteselecteduser(data):
	user_id = data.get('user_id')
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	
	cursor.execute("DELETE FROM " +  tbl_user_dtls.get('name') +" WHERE " + tbl_user_dtls.get('columns')[5] + "='" + str(user_id) +"'")
	conn.commit()
	conn.close()
	return "msg_8"

def deletemultipleuser(data):
	user_ids = data.get('user_ids')
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	
	cursor.execute("DELETE FROM " +  tbl_user_dtls.get('name') +" WHERE " + tbl_user_dtls.get('columns')[5] + " IN (" + user_ids +")")
	conn.commit()
	conn.close()
	return "msg_8"

def getuser(data):
	uid = data.get('user_id')
	type = data.get('type')
	mode = data.get('mode')
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
		
	if(type == "agent" or type == "admin"):
		cursor.execute("SELECT * FROM " + tbl_user_dtls.get('name') + " WHERE " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[5] + " = " + str(uid) + " AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[3] + " = '" + str(type) +"'")
	else:
		if mode == "active":
			cursor.execute("SELECT * FROM " + tbl_user_dtls.get('name') + "," + tbl_customer_data_dtls.get('name') + "," + tbl_pack_dtls.get('name') + " WHERE " + tbl_user_dtls.get('columns')[5] + " = " + str(uid) + " AND " + tbl_user_dtls.get('columns')[3] + " = '" + str(type) +"' AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[7] + " AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[10] + "=" + tbl_pack_dtls.get('name') + "." + tbl_pack_dtls.get('columns')[0]) 
		else:
			cursor.execute("SELECT * FROM " + tbl_user_dtls.get('name') + "," + tbl_postfreeuser_info_dtls.get('name') + "," + tbl_pack_dtls.get('name') + " WHERE " + tbl_user_dtls.get('columns')[5] + " = " + str(uid) + " AND " + tbl_user_dtls.get('columns')[3] + " = '" + str(type) +"' AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[9] + "=" + tbl_postfreeuser_info_dtls.get('name') + "." + tbl_postfreeuser_info_dtls.get('columns')[3] + " AND " + tbl_user_dtls.get('name') + "." + tbl_user_dtls.get('columns')[10] + "=" + tbl_pack_dtls.get('name') + "." + tbl_pack_dtls.get('columns')[0])

	results = cursor.fetchone()
	conn.close()
	return results

def updateuser(data):
	company = data.get('company')
	username = data.get('username')
	city = data.get('city_id')
	mobile = data.get('mobile')
	email = data.get('email')
	phone = data.get('phone')
	address = data.get('address')
	category = data.get('category_id')
	subcategory = data.get('subcategory_id')
	id = data.get('id')
	user_id = data.get('user_id')
	type = data.get('type')
	pack_id = data.get('pack')
	sms= data.get('sms')
	conn = mysql.connect()
	
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	if type == "vendor":
		cursor.execute("UPDATE " +  tbl_customer_data_dtls.get('name') + " SET " + tbl_customer_data_dtls.get('columns')[1] + "='" + str(city) + "', " + tbl_customer_data_dtls.get('columns')[2] + "='" + str(category) + "', " + tbl_customer_data_dtls.get('columns')[3] + "='" + str(subcategory) + "', " + tbl_customer_data_dtls.get('columns')[4] + "='" + company + "', " + tbl_customer_data_dtls.get('columns')[6] + "='" + address + "', " + tbl_customer_data_dtls.get('columns')[7] + "='" + mobile +"'," + tbl_customer_data_dtls.get('columns')[8] + "='" + phone + "' WHERE " + tbl_customer_data_dtls.get('columns')[0] + "='" + str(id) +"'")
	
	cursor.execute("UPDATE " +  tbl_user_dtls.get('name') + " SET " +  tbl_user_dtls.get('columns')[0] + "='" + username + "', " + tbl_user_dtls.get('columns')[2] + "='" + email + "', " + tbl_user_dtls.get('columns')[9] + "='" + mobile + "'," + tbl_user_dtls.get('columns')[10] + "='" + pack_id + "'," + tbl_user_dtls.get('columns')[11] + "='" + sms + "' WHERE " + tbl_user_dtls.get('columns')[5] + "='" + str(user_id) + "'")
	conn.commit()
	
	conn.close()
	
	return data

def getcity():
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT * FROM " + tbl_city_dtls.get('name'))
	results = cursor.fetchall()
	conn.close()
	return results

def getpack():
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT * FROM " + tbl_pack_dtls.get('name'))
	results = cursor.fetchall()
	conn.close()
	return results

def likes(data):
	vid = data.get('id')
	conn = mysql.connect()

	cursor = conn.cursor(pymysql.cursors.DictCursor)

	cursor.execute("SELECT likes, priority FROM " + tbl_customer_data_dtls.get('name') + " WHERE " + tbl_customer_data_dtls.get('columns')[0] + "='" + str(vid) + "'")

	result = cursor.fetchone()
	existinglikes = result['likes']
	existingpriority = result['priority']
	like = existinglikes + 1
	priority = existingpriority + 1
        
	#qry = "UPDATE " +  tbl_customer_data_dtls.get('name') +" SET " + tbl_customer_data_dtls.get('columns')[12] + "=" + tbl_customer_data_dtls.get('columns')[12] + 1 + " WHERE " + tbl_customer_data_dtls.get('columns')[0] + "=" + vid

	#print({qry})
	cursor.execute("UPDATE " +  tbl_customer_data_dtls.get('name') +" SET " + tbl_customer_data_dtls.get('columns')[12] + "='" + str(like)  + "', " + tbl_customer_data_dtls.get('columns')[14] + "='" + str(priority) + "' WHERE " + tbl_customer_data_dtls.get('columns')[0] + "='" + str(vid) + "'")
	conn.commit()
	conn.close()
	return data

def dislikes(data):
	vid = data.get('id')
	conn = mysql.connect()
	cursor = conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT dislikes,priority FROM " + tbl_customer_data_dtls.get('name') + " WHERE " + tbl_customer_data_dtls.get('columns')[0] + "='" + str(vid) + "'")
	
	result = cursor.fetchone()
	existingdislikes = result['dislikes']
	existingpriority = result['priority']
	dislike = existingdislikes + 1
	priority = existingpriority - 1

	cursor.execute("UPDATE " +  tbl_customer_data_dtls.get('name') +" SET " + tbl_customer_data_dtls.get('columns')[13] + "='" + str(dislike)  + "', " + tbl_customer_data_dtls.get('columns')[14] + "='" + str(priority) + "' WHERE " + tbl_customer_data_dtls.get('columns')[0] + "='" + str(vid) + "'")
	conn.commit()
	conn.close()
	return data
