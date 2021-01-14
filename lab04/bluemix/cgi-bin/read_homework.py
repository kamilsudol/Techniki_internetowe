#!/usr/bin/env python3
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

file = open("~/home/vcap/app/dane", "a")

if text1 != "(no data)":
    file.write(text1+";"+text2+";"+ text3+";"+text4+ ";\n")

file.close()
file = open("~/home/vcap/app/dane", "r")
  
# print HTTP/HTML headers
print ("Content-type: text/html")
print ()
print ("<!DOCTYPE html>")
print ("<html><meta charset=\"UTF-8\"><link rel=\"stylesheet\" href=\"~/home/vcap/app/baza.css\"><head>")
print ("<title>Zad04</title>")
print ("</head><body>")
  
# print HTML body using form data
print ("<h3>Rekordy dostępne w bazie danych</h3>")
print("<table border=\"1\">")
print("<thead><tr><th class=\"tytul\">Tytuł</th><th class=\"autor\">Autor</th><th class=\"data\">Data</th><th class=\"ip\">IP</th></tr></thead>")
f = file.read().split(";")
for i in range(int(len(f)/4)):
    print("<tr><td>"+f[0+i*4]+"</td><td>"+f[1+i*4]+"</td><td>"+f[2+i*4]+"</td><td>"+f[3+i*4]+"</td></tr>")
print("</table>")
print ("</body></html>")

file.close()