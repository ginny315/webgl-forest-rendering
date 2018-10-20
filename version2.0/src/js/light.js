const THREE = require('../lib/three.min');
const Light = (scene) => {
    let ambient_light, 
        main_light;
    ambient_light = new THREE.AmbientLight( 0x404040);
    scene.add(ambient_light);
    main_light = new THREE.SpotLight(0xffffff);
    main_light.position.set(0, 200, 200);
    main_light.castShadow = true;
    scene.add(main_light);
    // let light = new THREE.DirectionalLight( 0xff3bff );
    // light.position.set( 0, 0, 300 );
    // scene.add( light );
};

export default Light;