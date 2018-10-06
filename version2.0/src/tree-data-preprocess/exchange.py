import csv
import json
import ast

csvFile = open("c.csv", "r")
reader = csv.reader(csvFile)
cFile = open('c3.csv', 'w')
abcsv = csv.writer(cFile, dialect='excel')

for item in reader:
    # print item[0]
    if item[0] !='':
        y = item[0]
        z = item[1]
        item[0] = float(item[2])
        item[1] = float(y)
        item[2] = float(z)
        # item[3] = float(item[3])
        if item[3] != '':
            abcsv.writerow(item)
    else:
        abcsv.writerow(item)
csvFile.close()
cFile.close()