const THREE = require('../lib/three.min');

const Texture = () => {
    let texturePath = "../textures/";
    let sky = new THREE.TextureLoader().load(texturePath + "sky.png" );
    console.log('sky')
    console.log(sky )
  
    let textures = {
      sky: sky,
      grass: new THREE.TextureLoader().load(texturePath + "grass.jpg"),
      rock: new THREE.TextureLoader().load( texturePath + "rock.jpg" ),
      snow: new THREE.TextureLoader().load( texturePath + "snow.jpg" )
    };
  
    for ( let t in textures ) {
      if ( textures.hasOwnProperty( t ) ) {
        textures[t].wrapS = textures[t].wrapT = THREE.RepeatWrapping;
      }
    }
    sky.wrapS = sky.wrapT = THREE.MirroredRepeatWrapping;
    sky.repeat.set( 2, 2 );
  
    return textures;
};

export default Texture;