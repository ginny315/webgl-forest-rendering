const Common = {
    string2Array: (stringObj) => {
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
        return newArray; 
    },
    length: (o) => {
        var count = 0;
        for(var i in o){
            count ++;
        }
        return count;
    },
    getJsonData: (query) => {
        let arrayOfKeyValues = query.split(',');
        let modifiedArray =  new Array();
        console.log(arrayOfKeyValues);
        for(let i=0;i< arrayOfKeyValues.length;i++){
            let arrayValues = arrayOfKeyValues[i].split(':');
            let arrayString ='"'+arrayValues[0]+'"'+':'+'"'+arrayValues[1]+'"';
            modifiedArray.push(arrayString);
        }
        let jsonDataString = '{'+modifiedArray.toString()+'}';
        let jsonData = JSON.parse(jsonDataString);
        console.log(jsonData);
        console.log(typeof jsonData);
        return jsonData;
    }
    
};

export default Common;