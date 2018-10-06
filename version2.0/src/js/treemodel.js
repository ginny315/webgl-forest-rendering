const THREE = require('../lib/three.min');
const OBJLoader = require('../loaders/OBJLoader');
var object = null;

const Treemodel = {
    init: (scene) => {
        // manager
        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh ) child.material.map = texture;
            } );
            // 【这里暂时存放设置的中心点的位置，需要修改】
            // object.position.y = - 95;
            object.position.set(0,0,0);
            scene.add( object );
            console.log('tree model has been add to the scene.');
        }
        var manager = new THREE.LoadingManager( loadModel );
        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture
        var textureLoader = new THREE.TextureLoader( manager );
        var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );
        // model
        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError( xhr ) {}
        
        var loader = new THREE.OBJLoader( manager );//male02/male02
        loader.load( 'models/obj/cylinder2.obj', function ( obj ) {
            object = obj;
        }, onProgress, onError );
    }
};

export default Treemodel;
