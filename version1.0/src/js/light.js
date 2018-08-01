const THREE = require('../lib/three.min');
const Light = (scene) => {
    let ambient_light, 
        main_light;
    ambient_light = new THREE.AmbientLight( 0x404040);
    scene.add(ambient_light);
    main_light = new THREE.SpotLight(0xffffff);
    main_light.position.set(0, 100, 100);
    main_light.castShadow = true;
    scene.add(main_light);
}

export default Light;