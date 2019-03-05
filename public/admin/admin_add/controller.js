 var regex = {
     name: /^[A-Za-z]+\s{1,2}[A-Za-z]+$/,
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
     var logoutbtn = document.querySelector('.logout');
     logoutbtn.addEventListener('click', e => {
         localStorage.removeItem('auth');
         //take to index url;
         window.location.assign("../../index/index.html");
     });

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

     var importbtn = document.querySelector('.import-wrapper');
     var filebtn = document.querySelector('#file');
     importbtn.addEventListener('click', e => {
         filebtn.click();
     })
     filebtn.addEventListener('change', e => {
         //confirm upload popup;
         filestatus = true;
         var file = filebtn.files[0];
         console.log(file);

         console.log(file);
         uploadFile(file);
     })
     var submitBtn = document.querySelector('.submit');
     submitBtn.addEventListener('click', e => {
         if (isValid()) {
             console.log("skjfnls");
             console.log(regData);
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