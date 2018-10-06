const THREE = require('../lib/three.min');
const SCREEN_WIDTH = window.innerWidth,
      SCREEN_HEIGHT = window.innerHeight;

const Renderer = () => {
    let container = document.getElementById('container');
    container.innerHTML = "";
    var renderer = new THREE.WebGLRenderer( { clearColor: 0x000000 } );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    renderer.sortObjects = false;
    renderer.autoClear = false;
    // let canvas = container.getElementsByTagName('canvas');
    // if(canvas.length > 0){
    //     container.removeChild(canvas[0]);
    // }
    container.appendChild( renderer.domElement );

    var updateSize = function () {
        renderer.setSize( container.offsetWidth, container.offsetHeight );
        // For a smoother render double the pixel ratio
        renderer.setPixelRatio( 2 );
    };
    window.addEventListener( 'resize', updateSize, false );
    updateSize();
    return renderer;
};

export default Renderer;