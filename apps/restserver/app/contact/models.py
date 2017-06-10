import sys
sys.path.append('/var/www/apps/restserver')
from db import *

def addcontactus(data):
	name = data.get('name')
	email = data.get('email')
	phone = data.get('phone')
	company = data.get('company')
	message = data.get('message')
	conn = mysql.connect()
	cursor =conn.cursor()

	cursor.execute("INSERT INTO " +  tbl_contactus_dtls.get('name') +" (" + tbl_contactus_dtls.get('columns')[0] + "," + tbl_contactus_dtls.get('columns')[1] + "," + tbl_contactus_dtls.get('columns')[2]+ "," + tbl_contactus_dtls.get('columns')[3] + "," + tbl_contactus_dtls.get('columns')[4] +") VALUES (%s,%s,%s,%s,%s)",(name,phone,email,company,message))

	conn.commit()
	conn.close()
