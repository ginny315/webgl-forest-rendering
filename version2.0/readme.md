using node v6.11.0 (npm v6.2.0) 终端执行nvm use 6
webpack 4.16
终端执行npm run start便可以启动

webpack dev server

index.html css js已经配置完成

```javascript
{
        type: 'javascript/auto',
        test: /\.json$/,
        include:path.join(__dirname,'./src'),
        exclude:/node_modules/,
        use: [
            {
              loader: 'file-loader',

            }
        ]
      }
```
测试使用样例
**** 这个没用 renderer.js var renderer = new THREE.WebGLRenderer( { clearColor: 0xffffff } );
在app.js renderer.js

src/tree-data-prepocess/
combine.py 
将两个excel合并成一个，即坐标点和radius合并到一起

test3.py 
将excel合成json文件（combineData2.json），坐标是经过变化的，以xy为地，z轴向上生长

c2.csv
0,0,0,20
0,0,80,20
obj_cylinder.py
生成一个圆柱txt文件，修改文件后缀成obj是可以成功的

exchange.py
将Excel文件变成所需要的x,y,z轴，保存在c3.csv
obj.py
将c2.csv文件变成txt文件，然后通过fold修改后缀变成obj文件


测试cylinder存放于dist/models/obj/cylinder.obj

app.js/camera 
annotation 2
200,200,100是地形画面的静态表示
缩小可以拉近镜头
annotation 3
是地形静态画面，主要是为了展示obj那棵树
修改镜头需要修改两个地方，注意camera.lookat也要改变

OrbitControl.js这个库被我改了
help.js setControl()是调用camera，应该是可以用的。但是这个项目不能用，因为animate里面会随着帧变化变化相机的位置，所以就不能手动设置了。

billboard设置
geo.js 
treeArr中添加图片
app.js中
const matTree3 = Geo.loadTexureTree(3);开头添加全局参数
var tree11,tree21,tree31;//tree4,tree5,tree6;
var tree1Arr = [],tree2Arr = [],tree3Arr = [];
/*
 * index,size,mat,model,length,treeArr
 */
renderTreeBillboard(3,40,matTree3,tree31,15,tree3Arr);




