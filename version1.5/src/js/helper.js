const THREE = require('../lib/three.min');
const OrbitControls = require('../lib/OrbitControls');
const Helper = {
    showGrids: (scene) => {
        scene.add( new THREE.AxesHelper( 50 ) );
    },
    setCameraHelper: (scene) => {
        let cameraHelper = new THREE.CameraHelper(camera);
        scene.add(cameraHelper);
    },
    setControl: (camera, ifControll) => {
        let controls = new THREE.OrbitControls(camera); 
        controls.enabled = ifControll; 
    }
};

export default Helper;