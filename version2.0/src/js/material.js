const THREE = require('../lib/three.min');
const atmosphereVert = require('../shaders/atmosphere.glsl');
const atmosphereFrag = require('../shaders/atmospherefrag.glsl');
import Texture from '../js/texture';
const texture = Texture();

const Material =  () => {
  return {
    atmosphere: new THREE.ShaderMaterial( {
      uniforms: {
        uHorizonColor: { type: "c", value: new THREE.Color( 0xfff1d8 ) },//0xA0522D
        uSkyColor: { type: "c", value: new THREE.Color( 0x87CEEB) } //0x87CEEB
      },
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      side: THREE.BackSide
    } ),
    sky: new THREE.MeshBasicMaterial( {
      color:new THREE.Color( 0xf9f9ff),
      map: texture.sky,
      side: THREE.BackSide
    } )
  };
};

export default Material;