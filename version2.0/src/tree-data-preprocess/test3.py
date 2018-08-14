import csv
import json
import ast

csvFile = open("c.csv", "r")
reader = csv.reader(csvFile)

result = {}
len = 0
newItem = range(4)
result[str(len)] = []
for item in reader:
    # print item[0]
    if item[0] != '':
        if item[3] != '':
            # print item
            newItem[0] = item[2]
            newItem[1] = item[0]
            newItem[2] = item[1]
            newItem[3] = item[3]
            # print newItem
            result[str(len)].append(newItem)
            newItem = range(4)
            # print result[str(len)]
    else:
        len = len + 1
        result[str(len)] = []   
        
csvFile.close()
del result[str(len)]
with open("CombineData2.json","w") as f:
    json.dump(result,f)