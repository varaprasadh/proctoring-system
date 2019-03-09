function fetchStudentData(url){
    return new Promise((resolve,reject)=>{
        fetch(url).then(res=>res.json())
        .then(resData=>{
            resolve(resData);
        })
        .catch(err=>{
            reject(err);
        })
    })
}