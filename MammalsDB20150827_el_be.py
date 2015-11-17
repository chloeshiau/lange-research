import pyodbc
import json
import collections
import MySQLdb
 
db = MySQLdb.connect(host="localhost", user="root", passwd="ilbaloney.", db="MammalsDB20150827_el_be")
# conn = pyodbc.connect(connstr)
cursor = db.cursor()
 
cursor.execute("SELECT ID, AnimalID, ArticleID FROM rel_animal_article")

rows = cursor.fetchall()
columns = [desc[0] for desc in cursor.description]
# Convert query to row arrays

rowarray_list = []
for row in rows:
    t = dict(zip(columns, row))
    rowarray_list.append(t)

j = json.dumps(rowarray_list)
rowarrays_file = 'student_rowarrays.json'
f = open(rowarrays_file,'w')
print >> f, j
