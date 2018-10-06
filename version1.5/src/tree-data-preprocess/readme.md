combine.py
PointsData.csv,RadiusData.csv -> c.csv

test2.py
c.csv是针对（x,y,z,r）的坐标信息，xz轴为平面，往y轴方向生长。
item每次读取一行，item[0] = ‘’，则为新的一组points。
每组points形成一个多边形，1500多个多边形组成tree的几何形状。CombineDate.json

test3.py
现在需要修改成xy平面往z轴生长的树，但是直接循环python有缓存。CombineDate2.json