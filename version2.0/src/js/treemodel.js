const THREE = require('../lib/three.min');
const OBJLoader = require('../loaders/OBJLoader');
const DDSLoader = require('../loaders/DDSLoader');
const MTLLoader = require('../loaders/MTLLoader');
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
                const currentPos = pos[index];
                if(index==1){
                    object.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    object.scale.set(1.2, 1.2, 1.2);
                    object.name = 'trunk';
                    scene.add( object );
                }else{
                    var newObj = object.clone();
                    newObj.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    newObj.scale.set(1.2, 1.2, 1.2);
                    newObj.rotation.set( 0,0,Math.PI / 2 * currentPos[3]);
                    newObj.name = 'trunk';
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
                const currentPos = pos[index];
                if(index==1){
                    object.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    object.scale.set(1.2, 1.2, 1.2);
                    object.name = 'leave';
                    scene.add( object );
                }else{
                    var newObj = object.clone();
                    newObj.position.set(currentPos[0],currentPos[1],currentPos[2]);
                    newObj.scale.set(1.2, 1.2, 1.2);
                    newObj.rotation.set( 0,0,Math.PI / 2 * currentPos[3]);
                    newObj.name = 'leave';
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
    },
    initFlower: (scene, filepath,mtlname,objname, scale,pos) => {
        var onProgress = function ( xhr ) {
            if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
            }
        };
        var onError = function ( xhr ) { };

        THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

        new THREE.MTLLoader()
            .setPath( filepath )
            .load( mtlname, function ( materials ) {
                materials.preload();
                new THREE.OBJLoader()
                    .setMaterials( materials )
                    .setPath(filepath )
                    .load( objname, function ( object ) {
                        // object.position.set(pos[0],pos[1],pos[2]);
                        // object.scale.set(1,1,1);
                        // object.rotateX( Math.PI / 2 );
                        // scene.add( object );
                        Object.keys(pos).forEach((index) => {
                            const currentPos = pos[index];
                            if(index==1){
                                object.position.set(currentPos[0],currentPos[1],currentPos[2]);
                                object.scale.set(scale, scale, scale);
                                object.rotateX( Math.PI / 2 );
                                object.name = 'flower';
                                scene.add( object );
                            }else{
                                var newObj = object.clone();
                                newObj.position.set(currentPos[0],currentPos[1],currentPos[2]);
                                newObj.scale.set(scale, scale, scale);
                                newObj.name = 'flower';
                                scene.add( newObj );
                            }                           
                        });
                    }, onProgress, onError );
            } );
    },
};

export default Treemodel;
