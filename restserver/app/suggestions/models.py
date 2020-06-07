import sys
sys.path.append('/var/www/apps/restserver')
from db import *
import pymysql

def listSuggestions():
    conn = mysql.connect()
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    qry = "SELECT " + tbl_suggestion_dtls.get('name') + "." + tbl_suggestion_dtls.get('columns')[0] + " as id, CONCAT('in ', " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[1] + ", '/', " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[2] + ") as description, " + tbl_suggestion_dtls.get('name') + "." + tbl_suggestion_dtls.get('columns')[1] + " as title, " + tbl_suggestion_dtls.get('name') + "." + tbl_suggestion_dtls.get('columns')[4] + " as keywords FROM " + tbl_category_dtls.get('name') + ", " + tbl_sub_category_dtls.get('name') + ", " + tbl_suggestion_dtls.get('name') + " WHERE " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + "=" + tbl_suggestion_dtls.get('name') + "." + tbl_suggestion_dtls.get('columns')[2] + " AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[0] + "=" + tbl_suggestion_dtls.get('name') + "." + tbl_suggestion_dtls.get('columns')[3]  + " AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[1] + "=" + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[0] + " AND " + tbl_category_dtls.get('name') + "." + tbl_category_dtls.get('columns')[2] + "=1 AND " + tbl_sub_category_dtls.get('name') + "." + tbl_sub_category_dtls.get('columns')[3] + "=1"

    cursor.execute(qry)
    results = cursor.fetchall()
    return results
