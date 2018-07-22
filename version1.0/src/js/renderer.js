const THREE = require('../lib/three');
const SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;
const Renderer = (camera) =>{
    let renderer = new THREE.WebGLRenderer({
        antialias: true
    }); 
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
    renderer.setClearColor(0xcccccc,1); // black
    renderer.setPixelRatio( window.devicePixelRatio );
    let onWindowResize = (camera) => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener( 'resize', onWindowResize, false );    
    return renderer;
};

export default Renderer;