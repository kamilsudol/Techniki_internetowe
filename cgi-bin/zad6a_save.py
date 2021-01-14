#!/usr/bin/python3
import sys 
sys.stderr = sys.stdout 
import cgi
import os
import datetime

form = cgi.FieldStorage()
  
text1 = form.getvalue("data1","(no data)")
text2 = form.getvalue("data2","(no data)")
text3= str(datetime.datetime.now().strftime("%Y/%m/%d %H:%M:%S"))
text4 = os.environ['REMOTE_ADDR']

file = open("../lab06/zad6a/dane", "a")

if text1 != "(no data)":
    file.write(text1+";"+text2+";"+ text3+";"+text4+ ";\n")

file.close()
print ("Content-type: text/html")
print ()