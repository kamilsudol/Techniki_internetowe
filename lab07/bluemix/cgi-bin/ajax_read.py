#!/usr/bin/env python3
import sys 
sys.stderr = sys.stdout 
import cgi
import os


print ("Content-type: text/html")
print ()
file = open("../figury.txt", "r")
f = file.read().split(";")
print("<fieldset class=\"rysowanie_figur\">")
if os.stat("../figury.txt").st_size == 0:
    print("Brak dostepnych figur!")
else:
    print("<table border=\"1\">")
    for i in range(int(len(f)/2)):
        print("<tr><td>"+f[0+i*2]+"</td><td><input type=\"button\" value=\"Rysuj\" onclick=\""+f[1+i*2]+"\"></td></tr>")
    print("</table>")
print("</fieldset>")
file.close()