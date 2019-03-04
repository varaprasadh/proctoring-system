function updatePassword(data){
    console.log(data);
    var url ="http://localhost:9999/updatePassword"
     fetch(url,{
      method:"PUT",
      mode:"cors",
      body:JSON.stringify(data),
      headers:{
          "content-Type":"application/json"
      }
    }).then(res=>res.json()).then(resData=>{
        showUpdateStatus(resData);
    }).catch(err=>err)
}