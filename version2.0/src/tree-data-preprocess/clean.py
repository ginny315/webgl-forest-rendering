import csv
import json
import ast

csvFile = open("c.csv", "r")
reader = csv.reader(csvFile)
cFile = open('c3.csv', 'w')
abcsv = csv.writer(cFile, dialect='excel')

for item in reader:
    # print item[0]
    # if item[0] != '':
    if item[3] != '':
        abcsv.writerow(item)

csvFile.close()
cFile.close()