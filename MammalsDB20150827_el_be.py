import json
import collections
import MySQLdb
 
db = MySQLdb.connect(host="localhost", user="root", passwd="ilbaloney.", db="MammalsDB20150827_el_be")
cursor = db.cursor()
# cursor.execute("SELECT * FROM rel_animal_article")
cursor.execute("SHOW TABLES")
tables = cursor.fetchall()

table_nm = []
for (table_name,) in cursor:
    # cursor.execute("SELECT * FROM " + table_name)
    if table_name != 'Paste Errors':
        table_nm.append(table_name)

print table_nm

cursor.close()

for name in table_nm:
	rowarray_list = []
	cursor = db.cursor()
	print ("SELECT * FROM " + name)
	cursor.execute("SELECT * FROM " + name)
	rows = cursor.fetchall()
	columns = [desc[0] for desc in cursor.description]
	
	for row in rows:
		t = dict(zip(columns, row))
		rowarray_list.append(t)

	j = json.dumps(rowarray_list)
	rowarrays_file = 'json/'+name + '.json'
	f = open(rowarrays_file,'w')
	print >> f, j
	cursor.close()
