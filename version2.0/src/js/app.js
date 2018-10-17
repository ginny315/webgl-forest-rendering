const THREE = require('../lib/three.min');
const Stats = require('../lib/stats.min');
const dat = require('../lib/dat.gui.min');
const OrbitControls = require('../lib/OrbitControls');
import Camera from './camera';
import Light from './light';
import Renderer from './renderer';
import Helper from './helper';
import Geo from './geo';
import Translate from './translate';
import Common from './common';
import Material from './material';
import Noise from '../js/noise';
import Terrain from '../js/terrain';
import Treemodel from '../js/treemodel';

// data file resource
const skeletonData = require('../json/combineData2.json');
const model1 = 'models/obj/cylinder2.obj';
const modelLeave1 = 'models/obj/leave.obj';
const modelPath = 'models/obj/flower/';
const matLeave = Geo.loadTexureMat();
const matTree1 = Geo.loadTexureTree(1);
const matTree2 = Geo.loadTexureTree(2);
const matTree3 = Geo.loadTexureTree(3);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
const camera = Camera(1);
const renderer = Renderer();
const noise = Noise();
const material = Material();
let container = document.getElementById('container'); //mouseover

var stat = null;
var gui = null;
var tree11,tree21,tree31;//tree4,tree5,tree6;
var tree1Arr = [],tree2Arr = [],tree3Arr = [];
var fluctuation = 3000;
var fluctuationCurrent = 3000;

const init = () => {
    // initStats();
    fluctuationCurrent = sessionStorage.getItem('flux');
    if(fluctuationCurrent && fluctuationCurrent != '' && fluctuationCurrent != undefined && fluctuationCurrent != null){
        fluctuationCurrent = Math.floor(sessionStorage.getItem('flux'));
    }else{
        fluctuationCurrent = 3000;
    }
    initGui();
    let id = null;
    Helper.showGrids(scene); 
    // Helper.setControl(camera,true); // make no sense to terrain
    Light(scene);
    // initTerrain(fluctuationCurrent);
    // renderTree();
    renderTreeModel();
    // renderBillboard();
};
const switchMode = (app) => {
    let switchMode = document.getElementById('mode-switch');
    let innerColor = document.getElementById('mode-inner');
    let clickHandler = (e) => {
            app.mouse = {
                x: e.clientX - container.offsetWidth / 2,
                // Square to give more sensitivity at bottom of screen
                y: Math.pow( container.offsetHeight - e.clientY, 2 ) / container.offsetHeight
            };
    };
        document.getElementById('mode').addEventListener('click',function(e){
            e.preventDefault();
            if(switchMode.getAttribute("data-mode") == 0){ //off -> on
                switchMode.style.left = '2%';
                innerColor.style.backgroundColor = '#A0BE44';
                switchMode.setAttribute("data-mode",1);
                container.addEventListener( 'mousemove', clickHandler);
                let look = app.center.clone();
                look.sub( camera.position );
                look.normalize();
                look.multiplyScalar( 50 );
                let across = new THREE.Vector3().crossVectors( look, camera.up );
                across.multiplyScalar( app.smoothMouse.x / 333 );
                camera.position.add( across );
                camera.up.add( across.multiplyScalar( -0.005 ) );
                camera.lookAt( app.center );
            }else{
                switchMode.style.left = '43%';
                innerColor.style.backgroundColor = '#9D9D9D';
                switchMode.setAttribute("data-mode",0);
                container.removeEventListener( 'mousemove', clickHandler);
            }
        });
};
const initStats = () => {
    stat = new Stats(); 
    stat.domElement.style.position = 'absolute'; 
    stat.domElement.style.right = '0px'; 
    stat.domElement.style.top = '0px'; 
    document.body.appendChild(stat.domElement);
};

const initGui = () => {
    gui = {
        fluctuation:fluctuationCurrent, 
    };
    var datGui = new dat.GUI();
    datGui.add(gui,"fluctuation",2000,4000).onFinishChange(setValue);
};
/**
 * set session storage of fluctuation
 */
const setValue = () => {
    fluctuationCurrent = gui.fluctuation;
    fluctuation = fluctuationCurrent;
    sessionStorage.setItem('flux',fluctuationCurrent);
    setTimeout(document.location.reload(true),3000);
};
const initTerrain = (fluctuation) => {
    let terrain = new Terrain( noise, 1024, 4, 64, fluctuation);
    scene.add( terrain );
    console.log('initTerrain');
    let sky2 = new THREE.Mesh( Geo.sky2, material.atmosphere );
    sky2.position.z = -1000;
    scene.add( sky2 );
};
const renderTreeModel = () => {
    Treemodel.init(scene,model1, {"1":[0, 0, 0],"2":[0,20,0],"3":[35,5,0],"4":[15,15,0],"5":[5,10,2]});
    Treemodel.initLeave(scene,modelLeave1, {"1":[0, 0, 0],"2":[0,20,0],"3":[35,5,0],"4":[15,15,0],"5":[5,10,2]});
    // Treemodel.init(scene,model1, {"1":[0, 0, 0]});
    // Treemodel.initLeave(scene,modelLeave1,{"1":[0,0,0]})
    Treemodel.initFlower(scene,modelPath,'flower1.mtl','flower1.obj',{"1":[50, 50, 0],"2":[60,50,0],"3":[70,45,0]});//'flower1.mtl','flower1.obj'
};
const renderBillboard = () => { //index,size,mat,model,length,treeArr
    renderTreeBillboard(1,35,matTree1,tree11,11,tree1Arr);
    renderTreeBillboard(2,25,matTree2,tree21,5,tree2Arr);
    renderTreeBillboard(3,40,matTree3,tree31,15,tree3Arr);
};
const renderTreeBillboard = (index,size,mat,model,length,treeArr) => {
    let tree = 'tree'+index;
    let currentTN = tree+'1';
    model = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
    model.rotateX( Math.PI / 2 );
    treeArr[currentTN] = model;
    scene.add(model);
    for(let i=2,len=length ; i<len ; i++){
        currentTN = tree+i;
        treeArr[currentTN] = model.clone();
        scene.add(treeArr[currentTN]);
    }
};
/*
* tree face to camera 
*/
const faceTreeBillboards = () => {
    // distribution of tree1 
    for(let i=1,len=5 ; i<len ; i++){
        let currentTN = 'tree1'+i;
        let currentT = tree1Arr[currentTN];
        currentT.position.set(23*i+20*i,15+5*i*i,20);
        currentT.quaternion.copy( camera.quaternion);
    }
    for(let i=5,len=8 ; i<len ; i++){
        let currentTN = 'tree1'+i;
        let currentT = tree1Arr[currentTN];
        currentT.position.set(23*(i-4)+25*(i-4),33+5*(i-4)*(i-4),20);
        currentT.quaternion.copy( camera.quaternion);
    }
    for(let i=8,len=11 ; i<len ; i++){
        let currentTN = 'tree1'+i;
        let currentT = tree1Arr[currentTN];
        currentT.position.set(23*(i-7)+22*(i-7),49+5*(i-7)*(i-7),20);
        currentT.quaternion.copy( camera.quaternion);
    }
    // distribution of tree2 
    for(let i=1,len=5 ; i<len ; i++){
        let currentTN = 'tree2'+i;
        let currentT = tree2Arr[currentTN];
        currentT.position.set(52*i+2*i*i,30+4*i,20);
        currentT.quaternion.copy( camera.quaternion);
    }
    // // distribution of tree3
    for(let i=1,len=7 ; i<len ; i++){
        let currentTN = 'tree3'+i;
        let currentT = tree3Arr[currentTN];
        currentT.position.set(-150+20*i,125+5*i*i,20);
        currentT.quaternion.copy( camera.quaternion);
    }
    for(let i=7,len=12 ; i<len ; i++){
        let currentTN = 'tree3'+i;
        let currentT = tree3Arr[currentTN];
        currentT.position.set(-200+20*i,155+5*i*i,20);
        currentT.quaternion.copy( camera.quaternion);
    }
    for(let i=12,len=15 ; i<len ; i++){
        let currentTN = 'tree3'+i;
        let currentT = tree3Arr[currentTN];
        currentT.position.set(-250+20*i,175+5*i*i,20);
        currentT.quaternion.copy( camera.quaternion);
    }
};

const renderTree = () => {
    console.log('load combine data-------');
    let posList = skeletonData;
    let vertices, faces = [];//length(posList)-2
    for(let i=0, len=Common.length(posList)-2; i<len; i++){
        if(posList[i].length > 25){ // render main branch
            vertices = posList[0];
            for(let j=0,lenV=vertices.length-1; j<lenV ; j++){
                let radius = vertices[j][3],
                    v1 = Translate.setVerticeSingle(vertices[j]),
                    v2 = Translate.setVerticeSingle(vertices[j+1]);
                let top = radius,
                    bottom = radius,
                    height = Translate.distanceCompute([v1,v2]),
                    pos = vertices[j],
                    angle = Translate.angleCompute([v1,v2]);
                Geo.setTextureCylinder(scene,top,bottom,height,pos,angle);
            }
        }else{ // render other branch
            vertices = Translate.setVertices(posList[i]);
            faces = [];
            for(let j=0,lenV=vertices.length-2 ; j<lenV ; j++){
                faces.push(new THREE.Face3(j,j+1,j+2));
            }
            if(vertices && vertices.length>0 && faces && faces.length>0){
                Geo.setVFGeo(scene,vertices,faces);
            }
        } 
        if(posList[i].length < 10){
            Geo.setTexturePoint(scene,Translate.setVertices(posList[i].slice(-3,-1)),matLeave);
        }            
    }
};

const App =  {
    clock: new THREE.Clock(),
    mouse: { x: 0, y: 0 },
    smoothMouse: { x: 0, y: 0 },
    center: new THREE.Vector3( 205, 135, 80 ),
    initApp: function(){
        let app = App;
        let beginTime = + new Date();
        init();
        let endTime = + new Date();
        let duration = endTime - beginTime;
        console.log('durationTime=',duration);
        switchMode(app);
        app.animate();       
    },
    animate: function () {
        // stat.begin();
        let app = App;
        window.requestAnimationFrame( app.animate );

        // Smooth mouse position
        var smooth = 0.02;
        app.smoothMouse.x += smooth * ( app.mouse.x - app.smoothMouse.x );
        app.smoothMouse.y += smooth * ( app.mouse.y - app.smoothMouse.y );

        // camera annotation 1
        // let time = 0.5 * app.clock.getElapsedTime();
        // camera.position.x = 250 * Math.cos( time / 3 ) + app.center.x;
        // camera.position.y = 250 * Math.sin( time / 4 ) + app.center.y + 500;
        // camera.position.z = Math.max(150 + 60 * Math.pow( Math.sin( time ), 4 ),app.smoothMouse.y / 2 + 150);
        // camera.position.z = Math.min( app.smoothMouse.y / 2 + 150, 780 );
        
        
        // camera annotation 2
        camera.position.x = 200 + app.center.x;
        camera.position.y = 200 + app.center.y;
        camera.position.z = 100 + app.center.z;
        
        // camera annotation 3
        // camera.position.x = 75+20;
        // camera.position.y = 45+20;
        // camera.position.z = 40+20;

        camera.up = new THREE.Vector3( 0, 0, 1 );
        // camera annotation 1&2
        camera.lookAt( app.center );
        // camera annotation 3
        // camera.lookAt(new THREE.Vector3(65,35,35))

        // faceTreeBillboards();

        // Look left right
        let look = app.center.clone();
        look.sub( camera.position );
        look.normalize();
        look.multiplyScalar( 50 );
        let across = new THREE.Vector3().crossVectors( look, camera.up );
        across.multiplyScalar( app.smoothMouse.x / 333 );

        // mouse over must keep these code
        // camera.position.add( across );
        // camera.up.add( across.multiplyScalar( -0.005 ) );
        // camera.lookAt( app.center );
    
        // app.terrain.offset.x = camera.position.x;
        // app.terrain.offset.y = camera.position.y;
        //
        renderer.render( scene, camera );
        // stat.end();
    }
};

export default App;