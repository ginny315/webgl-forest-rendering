const THREE = require('../lib/three');
const Square = () => {
    console.log('Square2');
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x000000);
    var scene = new THREE.Scene();
    
    // camera
    var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
    camera.position.set(25, 25, 25);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);
    
    // light
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 15, 5);
    scene.add(light);
    
    var material = new THREE.MeshLambertMaterial({
        color: 0xffff00,
        //emissive: 0xff0000
    });
    
    var cube = new THREE.Mesh(new THREE.CubeGeometry(5, 5, 5), material);
    scene.add(cube);
    //var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 20, 8), material);
    //scene.add(sphere);
    
    renderer.render(scene, camera);
};

export default Square;