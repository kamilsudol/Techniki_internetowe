#!/usr/bin/python

from lxml import etree
import os

file_number = os.getenv('QUERY_STRING')
file_number = file_number.split("=")

file = open("../lab06/zad6b/opcje"+str(file_number[1])+".xml")

xml_dom = etree.parse(file)
root = xml_dom.getroot()

result = "Content-type: text/xml\n"
result += "\n"
result += "<options>"
result += "<option>Wybierz opcje</option>"
for op in root:
  result += "<option>"+op.text+"</option>"
result += "</options>"

print(result)

