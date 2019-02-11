console.log("hello world");
const regex = {
    name: /^[a-zA-Z\s]+$/,
    anitid: /^anit[0-9]{3}$/,
    reg_id: /^[0-9]{12}$/,
    exp: /^[0-9]{1,2}$/,
    dep: /^[\w]+$/,
    year: /^[1-4]$/
}

document.querySelector("input[type='submit']").addEventListener('click', e => {
    var current_form = document.querySelector('.chooser-faculty').classList.contains('chooser-active') ? "faculty" : "student";
    console.log(current_form);
    if (current_form == "student") {

        var form = document.querySelector('.student-form');
        var name = form.name.value;
        var reg_id = form.reg_id.value;
        var dep = form.dep.value;
        var year = form.year.value;
        if (regex.name.test(name) && regex.reg_id.test(reg_id) && regex.dep.test(dep) && regex.year.test(year)) {
            var endpoint = `http://localhost:9999/add/student/${reg_id}/${name}/${dep}/${year}`;
            console.log(endpoint);
            addmember(endpoint);

            console.log("student will be added");
        } else {
            //display error message that details are invalid
            form.classList.add('error');
        }

    } else {

        var form = document.querySelector('.faculty-form');
        var name = form.name.value;
        var reg_id = form.anitid.value;
        var dep = form.dep.value;
        var exp = form.exp.value;
        console.log("is it working", name, reg_id, dep, exp);
        if (regex.name.test(name) && regex.anitid.test(reg_id) && regex.dep.test(dep) && regex.exp.test(exp)) {

            var endpoint = `http://localhost:9999/add/faculty/${reg_id}/${name}/${dep}/${exp}`;
            addmember(endpoint);
            console.log("faculty will be created!");

        } else {
            form.classList.add('error');
            //display error message that details are invalid
        }

    }
})

function addmember(url) {
    console.log(url);
    fetch(url, {
            method: 'get',
            // mode: 'no-cors',
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            notify(data); 
        })
       
}
 
function notify(data){
    
    var html=`
    <div class="notification-wrapper">
       <img src='./icons/ios-warning.svg'></img>
       <div>${data.who} ${data.status=='success'?'has been successfully added':'might be already there'}</div>
    </div>
    `

   document.querySelector('.container').innerHTML+=html;
   setTimeout(() => {
       document.querySelector('.container').removeChild(document.querySelector(".notification-wrapper"));
      location.reload();
    }, 3000); 
    console.log(html);
    
}