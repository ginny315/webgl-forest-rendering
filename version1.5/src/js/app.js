const THREE = require('../lib/three.min');
const Stats = require('../lib/stats.min');
import Camera from './camera';
import Light from './light';
import Renderer from './renderer';
import Hepler from './helper';
import Geo from './geo';
import Translate from './translate';
import Common from './common';
import Material from './material';
import Noise from '../js/noise';
import Terrain from '../js/terrain';

const skeletonData = require('../json/combineData2.json');
const scene = new THREE.Scene();
const matLeave = Geo.loadTexureMat();

const camera = Camera(1);
const renderer = Renderer();
const noise = Noise();
const material = Material();
let stat = null;

const init = () => {
    initStats();
    let id = null;
    Hepler.showGrids(scene); 
    Hepler.setControl(camera,false); // make no sense to terrain
    Light(scene);

    let draw = () => {
      renderer.render(scene, camera); 
      id = requestAnimationFrame(draw);
    };
    
    id = requestAnimationFrame(draw); 
};

const initStats = () => {
    stat = new Stats(); 
    stat.domElement.style.position = 'absolute'; 
    stat.domElement.style.right = '0px'; 
    stat.domElement.style.top = '0px'; 
    document.body.appendChild(stat.domElement);
}

const initTerrain = () => {
    let terrain = new Terrain( noise, 1024, 4, 64 );
    scene.add( terrain );
    console.log('initTerrain');
    let sky2 = new THREE.Mesh( Geo.sky2, material.atmosphere );
    sky2.position.z = -1000;
    scene.add( sky2 );
};

const renderTree = () => {
    console.log('load combine data-------');
    let posList = skeletonData;
    let vertices, faces = [];//length(posList)-2
    for(let i=0, len=Common.length(posList)-2; i<len; i++){
        if(posList[i].length > 25){
            vertices = posList[0];//vertices.length-1
            for(let j=0,lenV=vertices.length-1; j<lenV ; j++){
                let radius = vertices[j][3],
                    v1 = Translate.setVerticeSingle(vertices[j]),
                    v2 = Translate.setVerticeSingle(vertices[j+1]);
                let top = radius,
                    bottom = radius,
                    height = Translate.distanceCompute([v1,v2]),
                    pos = vertices[j],
                    // angle = Translate.angleCompute([v1,v2]);
                    angle = 0;
                Geo.setTextureCylinder(scene,top,bottom,height,pos,angle);
            }
        }else{
            vertices = Translate.setVertices(posList[i]);
            faces = [];
            for(let j=0,lenV=vertices.length-2 ; j<lenV ; j++){
                faces.push(new THREE.Face3(j,j+1,j+2));
            }
            if(vertices && vertices.length>0 && faces && faces.length>0)
                Geo.setVFGeo(scene,vertices,faces);
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
    center: new THREE.Vector3( 80, 45, 0 ),
    initApp: function(){
        let beginTime = + new Date();
        init();
        // initTerrain();
        renderTree();
        let endTime = + new Date();
        let duration = endTime - beginTime;
        console.log('durationTime=',duration);
        App.animate();       
    },
    animate: function () {
        stat.begin();
        let app = App;
        window.requestAnimationFrame( app.animate );
    
        // camera annotation 1
        // let time = 0.5 * app.clock.getElapsedTime();
        // camera.position.x = 250 * Math.cos( time / 3 ) + app.center.x;
        // camera.position.y = 250 * Math.sin( time / 4 ) + app.center.y + 500;
        // camera.position.z = 50 + 260 * Math.pow( Math.sin( time ), 4 );
        // camera.position.z = 150 + 60 * Math.pow( Math.sin( time ), 4 );        
        
        // camera annotation 2
        camera.position.x =  20 + app.center.x;
        camera.position.y =  20 + app.center.y;
        camera.position.z =   10 + app.center.z;
        camera.up = new THREE.Vector3( 0, 0, 1 );
        camera.lookAt( app.center );
    
        // Look left right
        let look = app.center.clone();
        look.sub( camera.position );
        look.normalize();
        look.multiplyScalar( 50 );
        let across = new THREE.Vector3().crossVectors( look, camera.up );
        across.multiplyScalar( app.smoothMouse.x / 333 );
        // camera.position.add( across );
        // camera.up.add( across.multiplyScalar( -0.005 ) );
        // camera.lookAt( app.center );
    
        // app.terrain.offset.x = camera.position.x;
        // app.terrain.offset.y = camera.position.y;
        renderer.render( scene, camera );
        stat.end();
    }
};

export default App;