import sys
sys.path.append('/var/www/apps/restserver')
from db import *
import pymysql

def searchcategory(data):
	searchdata = data.get('search')

def listcategory():
	conn = mysql.connect()
	cursor =conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[1] + " as categoryname," + tbl_sub_category_dtls.get('name')+"." +tbl_sub_category_dtls.get('columns')[2] + " as subcategoryname FROM " + tbl_category_dtls.get('name') + "," + tbl_sub_category_dtls.get('name') + " WHERE " + tbl_category_dtls.get('name')+ "." +tbl_category_dtls.get('columns')[0] + "=" +  tbl_sub_category_dtls.get('name')+ "." + tbl_sub_category_dtls.get('columns')[1] + " AND " + tbl_category_dtls.get('name')+ "." + tbl_category_dtls.get('columns')[2]+ "=1 AND " + tbl_sub_category_dtls.get('name')+ "." +tbl_sub_category_dtls.get('columns')[3]+"=1")
	results = cursor.fetchall()
	conn.close()
	return results	
