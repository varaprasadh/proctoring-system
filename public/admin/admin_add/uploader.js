const file_upload_url ='http://localhost:9999/csvfiles';
const register_student_url ="http://localhost:9999/register/student";
function uploadFile(file){
    var formData=new FormData();
    var filename=file.name;
    formData.append("fileName",filename);
    formData.append('file',file);
    fetch(file_upload_url, {
        method: "POST",
        mode: "cors",
        body: formData,
        // headers: {
        //     "content-Type": "multipart/form-data"
        // }
    }).then(res=>res.json()).then(data=>{
        if(data.status=='succes')
        {
        alert("successfully added");
        }else{
            alert("wrong happened");
        }
    });
}
    
    
function registerStudent(data){
    fetch(register_student_url,{
        method:"POST",
        mode:"cors",
        body:JSON.stringify(data),
        headers:{
            "content-Type":"application/json"
        }
    }).then(res=>res.json()).then(resData=>{
        console.log(resData);
        if (resData.status=='success') {
            alert("student added successfully...");
            window.location.reload();
        }else{
            alert("something wrong happened")
        }
    }).catch(err=>err);
}

function uploadPhotos(files){
    var formdata=new FormData();
    for(let i=0;i<files.length;i++){
        formdata.append('file',files[i]);
    }
    fetch("/uploadStudentPics", {
      method: "POST",
      body: formdata,
    //   headers:{
    //       'content-Type':'multipart/form-data'
    //   }
    })
      .then(res => res.json())
      .then(log => {
        console.log(log);
        if(log.status=='success'){
            alert("successfully uploaded");
        }
        else{
            alert("something wrong happened");
        }
      })
      .catch(err => console.log(err));
}
//application/csv