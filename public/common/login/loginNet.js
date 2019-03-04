console.log("from net");
//authentication process
function checkCredentials(credintials){
    return fetch('http://localhost:9999/signin', {
        method: "POST",
        body: JSON.stringify(credintials),
        headers: {
            'Content-Type': 'application/json',
            mode: 'cors'
        }
    }).then(res => res.json()).then(data =>{
        //redirect or popup error,
     return data;
    }
    ).catch(err => err);
}

//check whether the user id is present or not for forget password email verification
function checkUser(details){
    
    return fetch('http://localhost:9999/checkUser', {
        method: "POST",
        body:JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json',
            mode: 'cors'
        } 
    }).then(res=>res.json()).then(data=>{
      //  console.log(data);
      return data.found;
    }).catch(err=>err);
} 