import csv
import math

csvFile = open("c3.csv", "r")
reader = csv.reader(csvFile)
data = list(reader) 
row_count = len(data)
print('row_count='+str(row_count))
gen3 = math.sqrt(3)

with open('cylinder2.txt','w') as wf:
    wf.write('mtllib cylinder.mtl'+'\n')
    wf.write('g default'+'\n')
    for line in data:
        if line[0] != '':
            x = float(line[0])
            y = float(line[1])
            z = line[2]
            r = float(line[3])
            wf.write('v'+' '+str(x)+' '+str(y)+' '+z+'\n')
            wf.write('v'+' '+str(x-r/2)+' '+str(y+r/2*gen3)+' '+z+'\n')
            wf.write('v'+' '+str(x-r)+' '+str(y)+' '+z+'\n')
            wf.write('v'+' '+str(x-r/2)+' '+str(y-r/2*gen3)+' '+z+'\n')
            wf.write('v'+' '+str(x+r/2)+' '+str(y-r/2*gen3)+' '+z+'\n')
            wf.write('v'+' '+str(x+r)+' '+str(y)+' '+z+'\n')
            wf.write('v'+' '+str(x+r/2)+' '+str(y+r/2*gen3)+' '+z+'\n')
        else:
            for i in range(0,7):
                wf.write('v 0 0 0'+'\n')
    wf.write('\n')
    wf.write('g pCylinder1'+'\n')
    wf.write('usemtl file1SG'+'\n')
    a = 0
    b = 0
    for num in range(0,row_count-1):
        if(data[num][0]) != '' and data[num+1][0] != '':
            b = b + 1
            wf.write('s'+str(num*8+1)+'\n')
            wf.write('f'+' '+str(num*7+1)+' '+str(num*7+2)+' '+str(num*7+3)+'\n')
            wf.write('f'+' '+str(num*7+3)+' '+str(num*7+4)+' '+str(num*7+1)+'\n')
            wf.write('f'+' '+str(num*7+1)+' '+str(num*7+4)+' '+str(num*7+5)+'\n')
            wf.write('f'+' '+str(num*7+5)+' '+str(num*7+6)+' '+str(num*7+1)+'\n')
            wf.write('f'+' '+str(num*7+1)+' '+str(num*7+6)+' '+str(num*7+7)+'\n')
            wf.write('f'+' '+str(num*7+7)+' '+str(num*7+2)+' '+str(num*7+1)+'\n')
            wf.write('s'+str(num*8+2)+'\n')
            wf.write('f'+' '+str(num*7+3)+' '+str(num*7+10)+' '+str(num*7+4)+'\n')
            wf.write('f'+' '+str(num*7+4)+' '+str(num*7+10)+' '+str(num*7+11)+'\n')
            wf.write('s'+str(num*8+3)+'\n')
            wf.write('f'+' '+str(num*7+2)+' '+str(num*7+9)+' '+str(num*7+3)+'\n')
            wf.write('f'+' '+str(num*7+3)+' '+str(num*7+9)+' '+str(num*7+10)+'\n')
            wf.write('s'+str(num*8+4)+'\n')
            wf.write('f'+' '+str(num*7+7)+' '+str(num*7+14)+' '+str(num*7+2)+'\n')
            wf.write('f'+' '+str(num*7+2)+' '+str(num*7+14)+' '+str(num*7+9)+'\n')
            wf.write('s'+str(num*8+5)+'\n')
            wf.write('f'+' '+str(num*7+6)+' '+str(num*7+13)+' '+str(num*7+7)+'\n')
            wf.write('f'+' '+str(num*7+7)+' '+str(num*7+13)+' '+str(num*7+14)+'\n')
            wf.write('s'+str(num*8+6)+'\n')
            wf.write('f'+' '+str(num*7+5)+' '+str(num*7+12)+' '+str(num*7+6)+'\n')
            wf.write('f'+' '+str(num*7+6)+' '+str(num*7+12)+' '+str(num*7+13)+'\n')
            wf.write('s'+str(num*8+7)+'\n')
            wf.write('f'+' '+str(num*7+4)+' '+str(num*7+11)+' '+str(num*7+5)+'\n')
            wf.write('f'+' '+str(num*7+5)+' '+str(num*7+11)+' '+str(num*7+12)+'\n')
            wf.write('s'+str(num*8+8)+'\n')
            wf.write('f'+' '+str(num*7+8)+' '+str(num*7+9)+' '+str(num*7+10)+'\n')
            wf.write('f'+' '+str(num*7+10)+' '+str(num*7+11)+' '+str(num*7+8)+'\n')
            wf.write('f'+' '+str(num*7+8)+' '+str(num*7+11)+' '+str(num*7+12)+'\n')
            wf.write('f'+' '+str(num*7+12)+' '+str(num*7+13)+' '+str(num*7+8)+'\n')
            wf.write('f'+' '+str(num*7+8)+' '+str(num*7+13)+' '+str(num*7+14)+'\n')
            wf.write('f'+' '+str(num*7+14)+' '+str(num*7+9)+' '+str(num*7+8)+'\n')
        else:
            a = a + 1
            pass
    print('if='+str(b))
    print('else='+str(a))
csvFile.close()


