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
    setControl: (camera, ifControll = true) => {
        console.log(88)
        console.log(OrbitControls)
        console.log(OrbitControls.default.init)
        let controls = new OrbitControls.default.init(camera); 
        controls.enabled = ifControll; 
    }
};

export default Helper;