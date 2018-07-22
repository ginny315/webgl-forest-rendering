// $(document).ready(function(){
$('body').ready(function(){
    console.log('index start!');
    var beginTime = + new Date();
    init();   
    $.ajax({
        url:'json/combineData.json',//id的pos
        success: function(data){
            console.log('load combine data-------');
            var posList = data;
            var vertices, faces = [];//length(posList)-2
            var leafArr = [];
            for(var i=0, len=length(posList)-2; i<len; i++){
                if(posList[i].length > 25){
                    vertices = posList[0];//vertices.length-1
                    for(var j=0,lenV=vertices.length-1; j<lenV ; j++){
                        var radius = vertices[j][3],
                            v1 = setVerticeSingle(vertices[j]);
                            v2 = setVerticeSingle(vertices[j+1]);
                        var top = radius,
                            bottom = radius,
                            height = distanceCompute([v1,v2]),
                            pos = vertices[j],
                            angle = angleCompute([v1,v2]);
                        setTextureCylinder(top,bottom,height,pos,angle);
                    }
                }else{
                    vertices = setVertices(posList[i]);
                    faces = [];
                    for(var j=0,lenV=vertices.length-2 ; j<lenV ; j++){
                        faces.push(new THREE.Face3(j,j+1,j+2));
                    }
                    if(vertices && vertices.length>0 && faces && faces.length>0)
                        setVFGeo(vertices,faces);
                } 
                if(posList[i].length < 10){
                    setTexturePoint(setVertices(posList[i].slice(-3,-1)));
                }            
            }
            // setCube();
            var endTime = + new Date();
            var duration = endTime - beginTime;
            console.log('durationTime=',duration);
        }
    });
});


function string2Array(stringObj) {  
    stringObj = stringObj.replace(/([\w,]∗)/, "$1");  
    if (stringObj.indexOf("[") == 0) {// if has chinese  
        stringObj = stringObj.substring(1, stringObj.length - 1);  
    }  
    var arr = stringObj.split(",");  
    var newArray = [];//new Array();  
    for ( var i = 0; i < arr.length; i++) {  
        var arrOne = arr[i];  
        newArray.push(arrOne);  
    }  
    // console.log(newArray);  
    return newArray;  
}

function length(o) {
    var count = 0;
    for(var i in o){
        count ++;
    }
    return count;
}

