 var regex = {
     name: /^[^0-9_'@#$*\^\(\)\!&]+$/,
     regdNo: /^\d{12,12}$/,
     email: /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*|)$/,
     mobile: /^(\d{10,10}|)$/,
     department: /\w/,
     year: /^\d$/,
     section: /^\w$/,
     address: /\w*/
 }
 var regData = {}

 var filestatus = false;
 window.onload = function() {


     var inputElements = document.querySelectorAll('input:not([type="file"]),select');
     console.log(inputElements);
     inputElements.forEach(input => {
         input.addEventListener('input', e => {
             var value = input.value;
             var id = input.id;
             var errormessage = input.parentNode.querySelector('.error');
             if (regex[id].test(value)) {
                 console.log("sdvkdsl");
                 valid = true;
                 errormessage ? errormessage.style.display = "none" : '';
             } else {
                 valid = false;
                 errormessage ? errormessage.style.display = "block" : '';
             }
         })
     })

     var importbtn = document.querySelector(".data-input");
     var filebtn = document.querySelector('#file');
     importbtn.addEventListener('click', e => {
         filebtn.click();
     })
     filebtn.addEventListener('change', e => {
         //confirm upload popup;
         filestatus = true;
         var _confirm=confirm("confirm to upload file");
        if(_confirm){
            var file = filebtn.files[0];
            console.log(file);
            console.log(file);
            uploadFile(file);
        }
        else{
            alert("file uploading cancelled");
        }
     })

     //to handle photos 
     var photoimport = document.querySelector('.photo-input');
    var picsinput=document.querySelector('#pics');
     photoimport.addEventListener("click", e => {
        pics.click();
     });
     pics.addEventListener('change',e=>{
         var photos=pics.files;
         var _confirm = confirm("confirm uploading files");
         if(_confirm){
             uploadPhotos(photos);
         }
         else{
             alert("uploading photos cancelled");
         }
     })
     

     var submitBtn = document.querySelector('.submit');
     submitBtn.addEventListener('click', e => {
         if (isValid()) {
             console.log("skjfnls");
            //  console.log(regData);
             registerStudent(regData)
         } else {
             console.log("wrong");
         }
     })

 }

 function isValid() {
     var valid = false;
     var inputElements = document.querySelectorAll('input:not([type="file"]),select');
     inputElements.forEach(input => {
         var value = input.value;
         var id = input.id;
         var errormessage = input.parentNode.querySelector('.error');
         console.log(id, value);

         if (regex[id].test(value)) {
             console.log("sdvkdsl");
             valid = true;
             regData[id] = value;
             errormessage ? errormessage.style.display = "none" : '';
         } else {
             valid = false;
             errormessage ? errormessage.style.display = "block" : '';
         }
     })
     return valid;
 }