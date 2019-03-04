function updatePassword(data){
    console.log(data);
    
    var url ="http://localhost:9999/updatePassword"
    return fetch(url,{
      method:"POST",
      mode:"cors",
      body:JSON.stringify(data),
      headers:{
          "content-Type":"application/json"
      }
    }).then(res=>res.json()).then(resData=>resData).catch(err=>err)
}