const THREE = require('../lib/three.min');
import Translate from '../js/translate';
import img1 from '../textures/1.png';
import img3 from '../textures/3.png';


const Geo = {
    sky: new THREE.PlaneGeometry( 1600, 1600 ),
    sky2: new THREE.SphereGeometry( 3000, 64, 64 ),
    setPlane: (scene) => {
        let material = new THREE.MeshBasicMaterial({
            color: 0x5B493B // brown
        });
        let planeGeo = new THREE.PlaneGeometry(20, 10);
        let plane = new THREE.Mesh(planeGeo, material);
        plane.position.set(0,0,0);
        plane.rotation.x = - Math.PI / 2;
        // plane.scale.set(100, 100, 100);
        plane.castShadow = false;
        plane.receiveShadow = true;
        scene.add(plane);
    },
    setTriangle: (scene) => {
        let material = new THREE.MeshBasicMaterial({
            color: 0xffffff // white
        });
        let triGeo = new THREE.Geometry();
        let tri_vertices = [[0, -0.8, 0],[-2, -0.8, 0],[-1, 0.8, 0]];
        triGeo.vertices = Translate.setVertices(tri_vertices);
        triGeo.faces.push(new THREE.Face3(0, 2, 1));
        let triangle = new THREE.Mesh(triGeo, material);
        scene.add(triangle);
    },
    /**
     * @param {*} arr [x,y,z,radius]
     */
    setCube: (scene) => {
        let cubeGeo = new THREE.CubeGeometry(10, 20, 30);
        let texture = new THREE.TextureLoader().load('../textures/1.png');
        let cubeMat = new THREE.MeshPhongMaterial();//新建Phong材质
        cubeMat.map = texture;//将读取的数据赋值给材质的map属性    
        cube = new THREE.Mesh(cubeGeo,cubeMat); 
        cube.position.set(0,-5,1);
        scene.add(cube); 
    },
   /**
     * 根据点的位置贴图
     * 这里是树叶
     */
    setTexturePoint: (scene,verticlesArr,material) => {
        let geometry = new THREE.Geometry();
        // let texture = new THREE.TextureLoader().load('../textures/3.png');
        
        geometry.vertices = verticlesArr;
        let points = new THREE.Points(geometry, material);
        // points.rotation.set(new THREE.Vector3( 0, Math.PI / 6, 0));
        scene.add(points);
    },
    loadTexureMat: () => {
        let texture = new THREE.TextureLoader().load('../textures/3.png');
        let material = new THREE.PointsMaterial({
            size: 1.5,
            map: texture,
            // blending: THREE.AdditiveBlending,
            // depthTest: false,
            transparent: true,
            opacity: 1
        });
        return material;
    },
    /**
     * two points form a line
     * verticlesArr = [Vector3...]
     */
    setLine: (scene,verticlesArr) => {
        let material = new THREE.LineBasicMaterial({
            color: 0x000000,
        });
        let color1 = new THREE.Color( 0x000000 ), color2 = new THREE.Color( 0x000000 );
        let geometry = new THREE.Geometry();
        geometry.vertices = verticlesArr;
        geometry.colors.push( color1, color2 );
        let line = new THREE.Line( geometry,material);
        scene.add(line);
    }, 
    /** 
     * 用点来生成贴图的圆锥
     * setTextureCylinder(2,10,[5,5,0],new THREE.Vector3(0,1,0),0.5*Math.PI);
    */
   setTextureCylinder:(scene,top,bottom,height,pos,angle) => {
        var x = pos[0], y = pos[1], z = pos[2];
        var geo = new THREE.CylinderGeometry(top, bottom, height, 5, 5, false);
        var texture = new THREE.TextureLoader().load('../textures/1.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        var material = new THREE.MeshPhongMaterial();//新建Phong材质
        material.map = texture;//将读取的数据赋值给材质的map属性
        var cylinder = new THREE.Mesh(geo, material);
        cylinder.position.set(x,y,z);
        // cylinder.updateMatrix ();
        cylinder.rotateOnAxis(new THREE.Vector3(1,0,1),angle/2);
        scene.add(cylinder);
   },
   /**
     * 根据点和面渲染图形
     * 两个参数都是数组
    */
   setVFGeo: (scene,vertices,faces) => {
        var vfGeometry = new THREE.Geometry();
        vfGeometry.vertices = vertices;
        vfGeometry.faces = faces;
        vfGeometry.computeFaceNormals();
        vfGeometry.computeVertexNormals();
        var texture = new THREE.TextureLoader().load('../textures/1.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        var vfMaterial = new THREE.PointsMaterial({
            size: 1,
            map: texture,
            transparent: true,
            opacity: 1
        });
        vfMaterial.side = THREE.DoubleSide; 
        let vf = new THREE.Mesh(vfGeometry,vfMaterial);
        vf.castShadow = true;
        scene.add(vf);
   },
   importImage: () => {
        let oImg = new Image(); 
        oImg.onload = function(){
            document.body.appendChild(oImg);
        };  
        oImg.src = imgSrc; 
   }
};

export default Geo;









