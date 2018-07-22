const THREE = require('../lib/three');
const Translate = {
    distanceCompute: (verticlesArr) => {
        let v1 = verticlesArr[0],
            v2 = verticlesArr[1];
        return  v1.distanceTo( v2 );
    },
    angleCompute: (verticlesArr) => {
        let v1 = verticlesArr[0],
            v2 = verticlesArr[1];
        return v1.angleTo(v2);
    },
    midCompute: (verticlesOrigin) => {
        let v1 = verticlesOrigin[0],
            v2 = verticlesOrigin[1];
        return new THREE.Vector3((v2[0]-v1[0])/2, (v2[1]-v1[1])/2, (v2[2]-v1[2])/2);
    },
    midPosCompute: (verticlesOrigin) => {
        let v1 = verticlesOrigin[0],
            v2 = verticlesOrigin[1];
        return [(v2[0]-v1[0])/2 + v1[0], (v2[1]-v1[1])/2 + v1[1], (v2[2]-v1[2])/2 + v1[2]];
    },
    /* *
    * set triangle verticle
    * [[x,y,z],[x,y,z]...] -> vector3 format []
    * */ 
   setVertices: (verticles) => {
        let arr_verticles_vector = [];
        let x,y,z;
        for(let i=0,len=verticles.length ; i<len ;i++){
            x = verticles[i][0];
            y = verticles[i][1];
            z = verticles[i][2];
            arr_verticles_vector.push(new THREE.Vector3(x,y,z));
        }
        return arr_verticles_vector;
    },
    setVerticeSingle: (verticles) => {
        let x,y,z;
        x = verticles[0];
        y = verticles[1];
        z = verticles[2];
        return new THREE.Vector3(x,y,z);
    }
};

export default Translate;