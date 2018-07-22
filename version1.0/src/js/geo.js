function setPlane(){
    // console.log('set groud');
    var material = new THREE.MeshBasicMaterial({
        color: 0x5B493B // brown
    });
    var planeGeo = new THREE.PlaneGeometry(20, 10);
    var plane = new THREE.Mesh(planeGeo, material);
    plane.position.set(0,0,0);
    plane.rotation.x = - Math.PI / 2;
    // plane.scale.set(100, 100, 100);
    plane.castShadow = false;
    plane.receiveShadow = true;
    scene.add(plane);
}

function setTriangle(){
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff // white
    });
    var triGeo = new THREE.Geometry();
    var tri_vertices = [[0, -0.8, 0],[-2, -0.8, 0],[-1, 0.8, 0]];
    triGeo.vertices = setVertices(tri_vertices);
    triGeo.faces.push(new THREE.Face3(0, 2, 1));
    var triangle = new THREE.Mesh(triGeo, material);
    scene.add(triangle);
}
/**
 * @param {*} arr [x,y,z,radius]
 */
function setCube(arr){
        var cubeGeo = new THREE.CubeGeometry(10, 20, 30);
        // var cubeMat = new THREE.MeshBasicMaterial({ color: 0xff0000,wireframe: true});
        // var cubeMat = new THREE.MeshLambertMaterial({ color: 0xffff00 });                
    var texture = new THREE.TextureLoader().load('../textures/1.png');
    // var texture = THREE.ImageUtils.loadTexture('../textures/1.png');//读取纹理贴图的数据        
    var cubeMat = new THREE.MeshPhongMaterial();//新建Phong材质
            cubeMat.map = texture;//将读取的数据赋值给材质的map属性    
        cube = new THREE.Mesh(cubeGeo,cubeMat); 
        cube.position.set(0,-5,1);
        scene.add(cube);  
}

function setTube(){
    function CustomSinCurve( scale ) {
        THREE.Curve.call( this );  
        this.scale = ( scale === undefined ) ? 1 : scale;  
    } 
    CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
    CustomSinCurve.prototype.constructor = CustomSinCurve;
    CustomSinCurve.prototype.getPoint = function ( t ) {
        var tx = t * 3 - 1.5;
        var ty = Math.sin( 2 * Math.PI * t );
        var tz = 0;
        return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale ); 
    };
    var path = new CustomSinCurve( 1 );
    var geometry = new THREE.TubeGeometry( path, 20, 1, 8, false );
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000,wireframe: true});
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
}
/* *
 * set triangle verticle
 * [[x,y,z],[x,y,z]...] -> vector3 format []
 * */  
function setVertices(verticles){
    // console.log('verticles=',verticles)
    var arr_verticles_vector = [];
    var x,y,z;
    for(var i=0,len=verticles.length ; i<len ;i++){
        x = verticles[i][0];
        y = verticles[i][1];
        z = verticles[i][2];
        arr_verticles_vector.push(new THREE.Vector3(x,y,z));
    }
    return arr_verticles_vector;
}
function setVerticeSingle(verticles){
    var x,y,z;
    x = verticles[0];
    y = verticles[1];
    z = verticles[2];
    return new THREE.Vector3(x,y,z);
}
/**
 * 根据点的位置贴图
 * 这里是树叶
 */
function setTexturePoint(verticlesArr){
    // console.log('setTexturePoint');
    // console.log(verticlesArr)
    var geometry = new THREE.Geometry();
    // var material = new THREE.PointsMaterial({size: 0.5});
    var texture = new THREE.TextureLoader().load('../textures/3.png');
    // texture.rotation = Math.PI;
    var material = new THREE.PointsMaterial({
        size: 1.5,
        map: texture,
        // blending: THREE.AdditiveBlending,
        // depthTest: false,
        transparent: true,
        opacity: 1
      });
    geometry.vertices = verticlesArr;
    var points = new THREE.Points(geometry, material);
    // points.rotation.set(new THREE.Vector3( 0, Math.PI / 6, 0));
    scene.add(points);
}
/**
 * two points form a line
 * verticlesArr = [Vector3...]
 */
function setLine(verticlesArr){
    var material = new THREE.LineBasicMaterial({
        color: 0x000000,
        // linewidth: 10 //不起作用
    });
    // var texture = new THREE.TextureLoader().load('../textures/0_Sycamore_Brk_b.tif');
    // var material  = new THREE.MeshBasicMaterial( { map: texture } );
    // material.map = texture;
    // var linematerial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 10} );
    var color1 = new THREE.Color( 0x000000 ), color2 = new THREE.Color( 0x000000 );
    var geometry = new THREE.Geometry();
    geometry.vertices = verticlesArr;
    geometry.colors.push( color1, color2 );
    // var line = new THREE.Line( geometry, linematerial, THREE.LineSegments );
    var line = new THREE.Line( geometry,material);
    scene.add(line);
}
function distanceCompute(verticlesArr){
    var v1 = verticlesArr[0],
        v2 = verticlesArr[1];
    return  v1.distanceTo( v2 );
}
function angleCompute(verticlesArr){
    var v1 = verticlesArr[0],
        v2 = verticlesArr[1];
    // return (v1.angleTo(v2))*(Math.PI/180);
    return v1.angleTo(v2);
}
function midCompute(verticlesOrigin){
    var v1 = verticlesOrigin[0],
        v2 = verticlesOrigin[1];
    return new THREE.Vector3((v2[0]-v1[0])/2, (v2[1]-v1[1])/2, (v2[2]-v1[2])/2);
}
function midPosCompute(verticlesOrigin){
    var v1 = verticlesOrigin[0],
        v2 = verticlesOrigin[1];
    return [(v2[0]-v1[0])/2 + v1[0], (v2[1]-v1[1])/2 + v1[1], (v2[2]-v1[2])/2 + v1[2]];
}
/** 
 * 用点来生成贴图的圆锥
 * setTextureCylinder(2,10,[5,5,0],new THREE.Vector3(0,1,0),0.5*Math.PI);
 * 
*/
function setTextureCylinder(top,bottom,height,pos,angle){
    var x = pos[0], y = pos[1], z = pos[2];
    // console.log(top+'  bottom='+bottom+'  height='+height+'   pos='+pos);
    var geo = new THREE.CylinderGeometry(top, bottom, height, 5, 5, false);
    // var material = new THREE.MeshNormalMaterial();
    var texture = new THREE.TextureLoader().load('../textures/1.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 4, 4 );
    // var material = new THREE.PointsMaterial({
    //     size: 1,
    //     map: texture,
    //     // blending: THREE.AdditiveBlending,
    //     // depthTest: false,
    //     transparent: true,
    //     opacity: 1
    //   });
    var material = new THREE.MeshPhongMaterial();//新建Phong材质
    material.map = texture;//将读取的数据赋值给材质的map属性
    var cylinder = new THREE.Mesh(geo, material);
    // cylinder.overdraw = true;
    cylinder.position.set(x,y,z);
    // cylinder.rotation.z = -Math.PI;
    // cylinder.updateMatrix ();
    cylinder.rotateOnAxis(new THREE.Vector3(1,0,1),angle/2);
    scene.add(cylinder);
}
/**
 * 根据点和面渲染图形
 * 两个参数都是数组
 * var vertices = [new THREE.Vector3(2,0,0)...];
   var faces = [];
   for(var i=0,len=vertices.length-2 ; i<len ; i++){
      faces.push(new THREE.Face3(i,i+1,i+2));
   }
    setVFGeo(vertices,faces);
 */
function setVFGeo(vertices,faces){
    // console.log('set vf');
    var vfGeometry = new THREE.Geometry();
    vfGeometry.vertices = vertices;
    vfGeometry.faces = faces;
    vfGeometry.computeFaceNormals();
    vfGeometry.computeVertexNormals();
    // var vfMaterial = new THREE.MeshBasicMaterial({color: 0x00ffff});
    var texture = new THREE.TextureLoader().load('../textures/1.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 4, 4 );
    var vfMaterial = new THREE.PointsMaterial({
        size: 1,
        map: texture,
        transparent: true,
        opacity: 1
      });
      vfMaterial.side = THREE.DoubleSide; 
    vf = new THREE.Mesh(vfGeometry,vfMaterial);
    // vf.scale.set(100, 100, 100);
    // vf.position.set(2,2,2);
    vf.castShadow = true;
    scene.add(vf);
}
// 暂时没用到
function setParametric(vertices){
    console.log('setParametric');
    var mesh = createMesh(new THREE.ParametricGeometry(vertices, 12, 12));
    scene.add(mesh);
}

//生成模型
function createMesh(geom) {
    //设置当前的模型矩阵沿xy轴偏移，让图片处于显示中心
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
    var meshMaterial = new THREE.MeshNormalMaterial({
        flatShading: THREE.FlatShading,
        transparent: true,
        opacity: 0.9
    });
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial,wireFrameMat]);
    return mesh;
}
/**
 * 1 rotate
 */
function setAction(type, obj){
    if(type == 1){
        obj.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);         
    }
}
// 暂时没用到
function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}
// 暂时没用到
function render() {
    var timer = Date.now() * 0.0001;
    camera.position.x = Math.cos( timer ) * 800;
    camera.position.z = Math.sin( timer ) * 800;
    camera.lookAt( scene.position );
    for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
        var object = scene.children[ i ];
        object.rotation.x = timer * 5;
        object.rotation.y = timer * 2.5;
    }
    renderer.render( scene, camera );
}
function showGrids(){
    scene.add( new THREE.AxesHelper( 50 ) );
    // Coordinates.drawGrid({size:10,scale:1.0,orientation:"Z"});
    // Coordinates.drawAxis({axisLength:10,orientation:"X"});
    // Coordinates.drawAxis({axisLength:10,orientation:"Y"});
}
/**
 * change one side of a p
 */
var delta = 0;
function drawVerticleChange(){
    delta += 0.1;
    var geometry = new PlaneGeometry(10,10);
    geometry.vertices[0].x = -25 + Math.sin(delta) * 50;
    geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera); 
    id = requestAnimationFrame(drawVerticleChange);
}





