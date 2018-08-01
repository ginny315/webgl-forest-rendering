const THREE = require('../lib/three.min');
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
        if(camera.inPerspectiveMode){
            camera.cameraP.aspect = window.innerWidth / window.innerHeight;
            camera.cameraP.updateProjectionMatrix();
        }else{
            camera.cameraO.left = window.innerWidth / - 2;
            camera.cameraO.right = window.innerWidth / 2;
            camera.cameraO.top = window.innerHeight / 2;
            camera.cameraO.bottom = window.innerHeight / - 2;
            camera.cameraO.updateProjectionMatrix();
        }
    };
    window.addEventListener( 'resize', onWindowResize, false );    
    return renderer;
};

export default Renderer;