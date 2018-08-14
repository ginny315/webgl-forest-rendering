import csv
import json
import ast

csvFile = open("PointsData.csv", "r")
reader = csv.reader(csvFile)

result = {}
len = 0
i = 0
result[str(len)] = []
for item in reader:
    # print item
    if item[0] != '':
        result[str(len)].append(item)
    else:
        i = 0
        len = len + 1
        result[str(len)] = []
        
csvFile.close()
# print(result)
del result[str(len)]
with open("PointsData.json","w") as f:
    json.dump(result,f)