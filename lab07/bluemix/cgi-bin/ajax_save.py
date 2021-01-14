#!/usr/bin/env python3
import sys 
sys.stderr = sys.stdout 
import cgi
import os
import datetime

form = cgi.FieldStorage()

text1 = form.getvalue("data1","(no data)")
text2 = form.getvalue("data2","(no data)")

file = open("../figury.txt", "a")

if text1 != "(no data)":
    file.write(text1+";"+text2+";\n")

file.close()

print ("Content-type: text/html")
print ()