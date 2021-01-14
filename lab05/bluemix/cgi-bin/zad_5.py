#!/usr/bin/env python3

from lxml import etree
import os

sort = os.getenv('QUERY_STRING')

xml_file = open('/home/vcap/app/static/zad5.xml')
xsl_file = open('/home/vcap/app/static/zad5.xsl')

xml_dom = etree.parse(xml_file)
xsl_dom = etree.parse(xsl_file)

transform = etree.XSLT(xsl_dom)
sort = sort.split("=")
if len(sort) == 2: 
    result = transform(xml_dom, sortby='"'+str(sort[1])+'"')
else:
    result = transform(xml_dom, sortby='"'+str(sort[0])+'"')

print ("Content-type: text/html")
print()
print("<link rel=\"stylesheet\" type=\"text/css\" href=\"/home/vcap/app/static/styl.css\"/>")
print(result)