import csv
import math
import random

csvFile = open("c3.csv", "r")
reader = csv.reader(csvFile)
data = list(reader) 
row_count = len(data)
print('row_count='+str(row_count))
gen3 = math.sqrt(3)

with open('leave.txt','w') as wf:
    wf.write('mtllib cylinder.mtl'+'\n')
    wf.write('g default'+'\n')
    a = 0
    for index,line in enumerate(data):
        if line[0] != '':
            x = float(line[0])
            y = float(line[1])
            z = float(line[2])
            r = float(line[3])
            # ran = random.uniform(1.1,5.4)
            if z > 17 and z < 25 and index%2 !=0 and index%3 !=0 and index%11 != 0:
                a = a+1
                wf.write('v'+' '+str(150*r+x)+' '+str(150*r+y)+' '+str(z+5)+'\n')
                wf.write('v'+' '+str(150*r+x-2)+' '+str(150*r+y-2)+' '+str(z+5)+'\n')
                wf.write('v'+' '+str(150*r+x)+' '+str(150*r+y-2)+' '+str(z+5)+'\n')
                wf.write('v'+' '+str(150*r+x+2)+' '+str(150*r+y)+' '+str(z+5)+'\n')

    for index,line in enumerate(data):
        if line[0] != '':
            x = float(line[0])
            y = float(line[1])
            z = float(line[2])
            r = float(line[3])
            if z > 17 and z < 25 and index%2 !=0 and index%3 !=0 and index%11 != 0:
                a = a+1
                wf.write('vt 0.001992 0.001992'+'\n')
                wf.write('vt 0.001992 0.998008'+'\n')
                wf.write('vt 0.998008 0.998008'+'\n')
                wf.write('vt 0.001992 0.998008'+'\n')

    wf.write('\n')
    wf.write('g pCylinder1'+'\n')
    wf.write('usemtl file1SG'+'\n')
    b = 0
    for num in range(0,1900):
        b = b+1
        wf.write('s'+str(num+1)+'\n')
        wf.write('f'+' '+str(num*4+1)+'/'+str(num*4+1)+' '+str(num*4+2)+'/'+str(num*4+2)+' '+str(num*4+3)+'/'+str(num*4+3)+'\n')
        wf.write('f'+' '+str(num*4+1)+'/'+str(num*4+1)+' '+str(num*4+3)+'/'+str(num*4+3)+' '+str(num*4+4)+'/'+str(num*4+4)+'\n')
    print('points='+str(a)+'   planes='+str(b))
csvFile.close()


