const THREE = require('../lib/three');
const Helper = {
    showGrids: (scene) => {
        scene.add( new THREE.AxesHelper( 50 ) );
    },
    setCameraHelper: (scene) => {
        let cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
    }
};

export default Helper;