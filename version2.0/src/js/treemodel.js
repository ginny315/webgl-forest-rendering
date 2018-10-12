const THREE = require('../lib/three.min');
const OBJLoader = require('../loaders/OBJLoader');
var object = null;

const Treemodel = { //pos: {"1":[x, y, z],"2":[x,y,z]}
    init: (scene, treemodel, pos) => {
        // manager
        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh ) 
                    child.material.map = texture;
            } );
            Object.keys(pos).forEach((index) => {
                console.log(index);
                const currentPos = pos[index];
                console.log(currentPos)
                if(index==1){
                    object.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    object.scale.set(1.5, 1.5, 1.5);
                    scene.add( object );
                }else{
                    var newObj = object.clone();
                    newObj.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    newObj.scale.set(1.5, 1.5, 1.5);
                    scene.add( newObj );
                }
                
            });
            // object.position.set(0,0,0);
            // scene.add( object );
            console.log('tree model has been add to the scene.');
        }
        var manager = new THREE.LoadingManager( loadModel );
        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture
        var textureLoader = new THREE.TextureLoader( manager );
        // var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );
        var texture = textureLoader.load('textures/1.png');
        // model
        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError( xhr ) {}
        
        var loader = new THREE.OBJLoader( manager );//male02/male02
        loader.load( treemodel, function ( obj ) {
            object = obj;
        }, onProgress, onError );
    },
    initLeave: (scene, treemodel, pos) => {
        // manager
        function loadModel() {
            object.traverse( function ( child ) {
                if ( child.isMesh && child.material){
                    child.material.map = texture;
                    child.material.transparent =true;
                    child.material.alphaTest=0.6; 
                }         
            } );
            Object.keys(pos).forEach((index) => {
                console.log(index);
                const currentPos = pos[index];
                console.log(currentPos)
                if(index==1){
                    object.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    scene.add( object );
                }else{
                    var newObj = object.clone();
                    newObj.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    scene.add( newObj );
                }
                
            });
            // object.position.set(0,0,0);
            // scene.add( object );
            console.log('leave model has been add to the scene.');
        }
        var manager = new THREE.LoadingManager( loadModel );
        manager.onProgress = function ( item, loaded, total ) {
            console.log( item, loaded, total );
        };
        // texture
        var textureLoader = new THREE.TextureLoader( manager );
        // var texture = textureLoader.load( 'textures/UV_Grid_Sm.jpg' );
        var texture = textureLoader.load('textures/3.png');
        // model
        function onProgress( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        }
        function onError( xhr ) {}
        
        var loader = new THREE.OBJLoader( manager );//male02/male02
        loader.load( treemodel, function ( obj ) {
            object = obj;
        }, onProgress, onError );
    }
};

export default Treemodel;
