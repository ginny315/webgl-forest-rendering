const THREE = require('../lib/three.min');
const SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;
const Camera =  (type, threeDControl = true) => {
    let cameraPos = {
        x: 50,
        y: 50,
        z: 50 //80
    };
    let camera;
    if(type == 1){
        camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
        // camera = new THREE.PerspectiveCamera( 45, 1, 1, 5000 );
        camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
        camera.up = new THREE.Vector3( 0, 0, 0 );
    }else if(type == 2){
        camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
    }else {
        camera = new THREE.Camera(45,                     
            SCREEN_WIDTH / SCREEN_HEIGHT, 
            1,
            5000);
    }
    return camera; 

    let updateSize = function () {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
    };
    window.addEventListener( 'resize', updateSize, false );
    updateSize();
};
export default Camera;