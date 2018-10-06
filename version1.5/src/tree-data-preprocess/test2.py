import csv
import json
import ast

csvFile = open("c.csv", "r")
reader = csv.reader(csvFile)

result = {}
len = 0
i = 0
result[str(len)] = []
for item in reader:
    # print item
    if item[0] != '':
        if item[3] != '':
            # print item
            result[str(len)].append(item)
    else:
        i = 0
        len = len + 1
        result[str(len)] = []
        
csvFile.close()
# print(len)
del result[str(len)]
with open("CombineData.json","w") as f:
    json.dump(result,f)