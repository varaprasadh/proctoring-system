const file_upload_url ='http://localhost:9999/csvfiles';
const register_student_url ="http://localhost:9999/";
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
    }).then(res=>{
        console.log(res);
    })
          
    
}
function registerStudent(data){
    fetch(register_student_url,{
        method:"POST",
        mode:"cors",
        body:JSON.stringify(data),
        headers:{
            "content-Type":"application/json"
        }
    })
}

//application/csv