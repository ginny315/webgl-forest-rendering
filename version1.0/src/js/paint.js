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
    setScene();
    showGrids();    
    setLight(scene);
    setCamera(1);
    // setCameraHelper();
    // setPlane();
    addToDOM(setRenderer()); 
    id = requestAnimationFrame(draw);
}

function draw() { 
    stat.begin();
    renderer.render(scene, camera); 
    id = requestAnimationFrame(draw);
    stat.end();
}



