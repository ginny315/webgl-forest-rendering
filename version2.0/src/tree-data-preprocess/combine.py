import csv
import ast
import json

aFile = open("PointsData.csv", "r")
aInfo = csv.reader(aFile)
bFile = open("RadiusData.csv", "r")
bInfo  = csv.reader(bFile)

cFile = open('c.csv', 'w')
abcsv = csv.writer(cFile, dialect='excel')

a=[]
a=list()

b=[]
b=list()

for info in aInfo:
    print(info)
    a.append(info)

for info in bInfo:
    b.append(info )

for index in range(len(a)):  
    a[index].extend(b[index])
    # line = a[index][0]+','+a[index][1]+','+a[index][1]+','+a[index][3]
    # abcsv.writerow(a[index])
    abcsv.writerow((a[index][0],a[index][1],a[index][2],a[index][3]))

aFile.close()
bFile.close()
cFile.close()



