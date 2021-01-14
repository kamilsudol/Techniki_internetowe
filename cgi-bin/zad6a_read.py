#!/usr/bin/python3
import sys 
sys.stderr = sys.stdout 
import cgi
import os
import datetime


file = open("../lab06/zad6a/dane", "r")
  
# print HTTP/HTML headers
print ("Content-type: text/html")
print ()

# print HTML body using form data
print ("<h3>Rekordy dostepne w bazie danych</h3>")
print("<table border=\"1\">")
print("<thead><tr><th class=\"tytul\">Tytul</th><th class=\"autor\">Autor</th><th class=\"data\">Data</th><th class=\"ip\">IP</th></tr></thead>")
f = file.read().split(";")
for i in range(int(len(f)/4)):
    print("<tr><td>"+f[0+i*4]+"</td><td>"+f[1+i*4]+"</td><td>"+f[2+i*4]+"</td><td>"+f[3+i*4]+"</td></tr>")
print("</table>")

file.close()