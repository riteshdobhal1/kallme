import sys
sys.path.append('/var/www/apps/restserver')
from db import *
import pymysql
from flask import abort
import ast

def searchcategory(data):
    searchdata = data.get('search').lower()

    if(len(searchdata) == 0):
        return []

    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    qry = "SELECT " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[0] + " as id, " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[1] + " as category, " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[2] + " as sub_category, " + tbl_city_dtls.get('name') + "." + tbl_city_dtls.get('columns')[1] + " as city, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[4] + " as content, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[5] + " as image_url, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[6] + " as address, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[7] + " as phone FROM " + tbl_category_dtls.get('name') + ", " + tbl_sub_category_dtls.get('name') + ", " + tbl_city_dtls.get('name') + ", " + tbl_customer_data_dtls.get('name') + " WHERE " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[2] + " AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[0] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[3] + " AND " + tbl_city_dtls.get('name') + "." + tbl_city_dtls.get('columns')[0] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[1] + " AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[1] + "=" + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + " AND " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[2] + "=1 AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[3] + "=1 AND LOWER(" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[4] + ") LIKE '%" + searchdata + "%'"

    cursor.execute(qry)
    results = cursor.fetchall()
    return results

def filtercategory(data):
    data = ast.literal_eval(data)
    if(tbl_customer_data_dtls.get('columns')[2] in data and tbl_customer_data_dtls.get('columns')[3] in data):
        category_statement = ""
        for index, id in enumerate(data.get(tbl_customer_data_dtls.get('columns')[2])):
            if(index != 0):
                category_statement += " OR "
            category_statement += "".join([tbl_customer_data_dtls.get('columns')[2], "=", str(id)])
        subcategory_statement = ""
        for index, id in enumerate(data.get(tbl_customer_data_dtls.get('columns')[3])):
                    if(index != 0):
                        subcategory_statement += " OR "
                    subcategory_statement += "".join([tbl_customer_data_dtls.get('columns')[3], "=", str(id)])

        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        mixed_statement = ""
        if(len(category_statement) != 0 and len(subcategory_statement) != 0):
            mixed_statement = category_statement + " OR " + subcategory_statement
        elif(len(category_statement) != 0):
            mixed_statement = category_statement
        else:
            mixed_statement = subcategory_statement

        qry = "SELECT " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[0] + " as id, " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[1] + " as category, " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[2] + " as sub_category, " + tbl_city_dtls.get('name') + "." + tbl_city_dtls.get('columns')[1] + " as city, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[4] + " as content, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[5] + " as image_url, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[6] + " as address, " + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[7] + " as phone FROM " + tbl_category_dtls.get('name') + ", " + tbl_sub_category_dtls.get('name') + ", " + tbl_city_dtls.get('name') + ", " + tbl_customer_data_dtls.get('name') + " WHERE " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[2] + " AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[0] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[3] + " AND " + tbl_city_dtls.get('name') + "." + tbl_city_dtls.get('columns')[0] + "=" + tbl_customer_data_dtls.get('name') + "." + tbl_customer_data_dtls.get('columns')[1] + " AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[1] + "=" + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + " AND " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[2] + "=1 AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[3] + "=1 AND (" + mixed_statement + ")"

        cursor.execute(qry)
        results = cursor.fetchall()
        return results
    else:
        abort(500);

def getsubcategory():
	conn = mysql.connect()
	cursor =conn.cursor(pymysql.cursors.DictCursor)
	cursor.execute("SELECT " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + " as cat_id, " + tbl_sub_category_dtls.get('name')+"." +tbl_sub_category_dtls.get('columns')[2] + " as name, " + tbl_sub_category_dtls.get('name')+"." +tbl_sub_category_dtls.get('columns')[0] + " as id FROM " + tbl_category_dtls.get('name') + "," + tbl_sub_category_dtls.get('name') + " WHERE " + tbl_category_dtls.get('name')+ "." +tbl_category_dtls.get('columns')[0] + "=" +  tbl_sub_category_dtls.get('name')+ "." + tbl_sub_category_dtls.get('columns')[1] + " AND " + tbl_category_dtls.get('name')+ "." + tbl_category_dtls.get('columns')[2]+ "=1 AND " + tbl_sub_category_dtls.get('name')+ "." +tbl_sub_category_dtls.get('columns')[3]+"=1")
	results = cursor.fetchall()
	conn.close()
	return results

def getcategory():
	conn = mysql.connect()
	cursor =conn.cursor(pymysql.cursors.DictCursor)
	qry = "SELECT " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[1] + ", " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + " FROM " + tbl_category_dtls.get('name') + " WHERE " + tbl_category_dtls.get('columns')[2] + "=1"
	
	cursor.execute(qry)
	results = cursor.fetchall()
	return results






	
