console.log("from ui!");
var user;
window.onload = function() {
    //initially populate the user selection page
    populate_user_select_form();

}

function populate_user_select_form() {
    clearContainer();
    var user_select_template = document.querySelector('.user-select');
    var user_select_element = document.importNode(user_select_template.content, true);
    document.querySelector('.container').appendChild(user_select_element);
    var userElement = document.querySelectorAll('.user');
    userElement.forEach(ele => {
        ele.addEventListener('click', e => {
            console.log(ele.dataset.user);
            user = ele.dataset.user;
            populate_login_form();
        })
    })
}

function populate_login_form() {
    clearContainer();
    var formTemplate = document.querySelector('.form-template');
    var form = document.importNode(formTemplate.content, true);
    console.log(form);
    console.log(user);
    
    
    document.querySelector('.container').appendChild(form);
    if (user == 'faculty') {
        document.querySelector('.faculty-reg-btn').style.display = 'flex';
    } else {
        document.querySelector('.faculty-reg-btn').style.display = 'none';
    }

    var backbtn = document.querySelector('.back');
    backbtn.addEventListener('click', e => {
        0
        populate_user_select_form();
    })


    var login_btn = document.querySelector('.login');
    var forget_btn = document.querySelector('.forget');
    login_btn.addEventListener('click',async e => {
        var uid = document.querySelector('.userid').value;
        var pass_word = document.querySelector('.password').value;
        console.log(login_btn);
        var userCredintials = {
            type: user,
            userid: uid,
            password: pass_word
        }
       // console.log(userCredintials);
        var res=await checkCredentials(userCredintials);
        console.log("credintial status:",res);
        if(res.status=='found'){
           //redirect
           //add cookie {preffered}
           //localstorage
           console.log("succeed");
           console.log(res);
           localStorage.setItem('auth',JSON.stringify(res));
           location.assign("../../faculty/faculty_home/facultyHome.html");   
        }
        else{
            console.log("cat cat");
            animateError();
        }
        
    })
    forget_btn.addEventListener('click',async e => {
        //send req to server to send a mail to the user
        var uid = document.querySelector('.userid').value;
        if(uid){
            var details={
                type:user,
                userid:uid
            }
            var status=await checkUser(details);
            console.log("cat"+status);
            if(status==1){
                popDialog();
            }
            else{
                //animate input elements: error
                console.log("this"+status);
                animateError();
            }
            
        }
        else{
            animateError();
        }

    })
    var registerBtn=document.querySelector('.faculty-reg-btn');
    registerBtn.addEventListener('click',e=>{
        window.location.assign('../../faculty/RegisterFaculty/registerfaculty.html');
    })

}

function clearContainer() {
    document.querySelector('.container').innerHTML = '';
}
function popDialog(){
    var dialog = document.querySelector('.forget-password-dialog');
    var dialogElement = document.importNode(dialog.content, true);
    console.log(dialogElement);
    
    document.querySelector('body').appendChild(dialogElement);
    setTimeout(() => {
        document.querySelector('.dialog-container').remove();
    }, 3000);

}
function animateError(){
    var elements=document.querySelectorAll('input');
    elements.forEach(ele=>{
        ele.value='';
        ele.classList.add('error');
        setTimeout(() => {
            ele.classList.remove('error');
        }, 2000);
    })
}