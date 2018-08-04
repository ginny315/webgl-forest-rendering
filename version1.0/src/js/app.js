const THREE = require('../lib/three.min');
import Camera from './camera';
import Light from './light';
import Renderer from './renderer';
import Container from './container';
import Hepler from './helper';
import Geo from './geo';
import Translate from './translate';
import Common from './common';

const path = require('path');
// const skeletonData = path.join(__dirname, 'src')+'/json/combineData.json'

// const skeletonData = require(path.join(__dirname, 'src')+'/json/combineData.json');
const skeletonData = require('../json/combineData.json');
const scene = new THREE.Scene();
const matLeave = Geo.loadTexureMat();
import noise from '../js/noise';
import Terrain from '../js/terrain';

const init = () => {
    const camera = Camera(1);
    const renderer = Renderer(camera);
    let id;
    Hepler.showGrids(scene); 
    Light(scene);
    Container(renderer);

    let draw = () => {
      renderer.render(scene, camera); 
      id = requestAnimationFrame(draw);
    };
    
    id = requestAnimationFrame(draw);
};

const initTerrain = () => {
    let terrain = new Terrain( noise, 1024, 4, 64 );
    scene.add( terrain );
    console.log('initTerrain');
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
                    angle = Translate.angleCompute([v1,v2]);
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
}

const App = () => {
  let beginTime = + new Date();
  init();
//   initTerrain();
    renderTree();
      let endTime = + new Date();
      let duration = endTime - beginTime;
      console.log('durationTime=',duration);
};

export default App;