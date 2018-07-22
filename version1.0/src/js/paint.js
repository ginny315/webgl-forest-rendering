var stat = null; // set FPS detect
var controls = null;
var threeDControl = true;
/**
 * init global variables
 */
var camera = null,
    scene = null,
    renderer = null;
var mesh = null;
var cameraPos = {
    x: 50,
    y: 50,
    z: 50
};

var SCREEN_WIDTH = window.innerWidth,
    SCREEN_HEIGHT = window.innerHeight;

function initStats(){
    stat = new Stats(); 
    stat.domElement.style.position = 'absolute'; 
    stat.domElement.style.right = '0px'; 
    stat.domElement.style.top = '0px'; 
    document.body.appendChild(stat.domElement);
}
function init() {
    initStats();
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff // white
    });
    setScene();
    showGrids();    
    setLight(scene);
    setCamera(1);
    // setCameraHelper();
    // setPlane();
    addToDOM(setRenderer()); 
    id = requestAnimationFrame(draw);
}
function setScene(){
    scene = new THREE.Scene();
    // scene.autoUpdate =false;
}
function setRenderer(){
    renderer = new THREE.WebGLRenderer({
        antialias: true
    }); 
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
    renderer.setClearColor(0xcccccc,1); // black
    renderer.setPixelRatio( window.devicePixelRatio );
    return renderer;
}
function setLight(scene){
    var ambient_light, main_light;
    ambient_light = new THREE.AmbientLight( 0x404040);
    scene.add(ambient_light);
    main_light = new THREE.SpotLight(0xffffff);
    main_light.position.set(0, 100, 100);
    main_light.castShadow = true;
    scene.add(main_light);
}
function setCamera(type){
    if(type == 1){
        camera = new THREE.PerspectiveCamera(45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
        camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }else if(type == 2){
        camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
    }else {
        camera = new THREE.Camera(45,                     
            SCREEN_WIDTH / SCREEN_HEIGHT, 
            1,
            5000);
    }
    controls = new THREE.OrbitControls( camera); 
    controls.enabled = threeDControl;  
}
function setCameraHelper(){
    var cameraHelper = new THREE.CameraHelper(camera);
    scene.add(cameraHelper);
}
function addToDOM(renderer){
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if(canvas.length > 0){
        container.removeChild(canvas[0]);
    }
    container.appendChild(renderer.domElement);                
}

function draw() { 
    stat.begin();
    renderer.render(scene, camera); 
    id = requestAnimationFrame(draw);
    stat.end();
}



