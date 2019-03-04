var regex = {
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
}
var old = false,
    p1 = false,
    p2 = false;
window.onload = function() {

    var logoutbtn = document.querySelector('.logout');
    logoutbtn.addEventListener('click', e => {
        localStorage.removeItem('auth');
        //take to index url;
        window.location.assign("../../index/index.html");
    });
    var changepassBtn = document.querySelector('.password');
    var passwordForm = document.querySelector('.password-form');
    changepassBtn.addEventListener('click', e => {
        passwordForm.style.height = "100%";
    })
    var oldpass = document.querySelector('#password_old');
    oldpass.addEventListener('input', e => {
        var value = oldpass.value;
        if (regex.password.test(value)) {
            oldpass.parentNode.querySelector('.error').style.height = "0px";
            console.log("rifht");
            old = true;

        } else {
            old = false;
            oldpass.parentNode.querySelector('.error').style.height = "100%";

        }
    })
    var passone = document.querySelector('#password');
    passone.addEventListener('input', e => {
        var value = passone.value;
        if (regex.password.test(value)) {
            passone.parentNode.querySelector('.error').style.height = "0px";
            p1 = true;

        } else {
            p1 = false;
            passone.parentNode.querySelector('.error').style.height = "100%";

        }
    });
    var passtwo = document.querySelector('#password2');
    passtwo.addEventListener('input', e => {
        var value = passtwo.value;
        if (passone.value == value) {
            passtwo.parentNode.querySelector('.error').style.height = "0px";
            console.log("rifht");
            p2 = true;
        } else {
            p2 = false;
            passtwo.parentNode.querySelector('.error').style.height = "100%";
        }
    });
    var updateBtn = document.querySelector('.update');
    updateBtn.addEventListener('click', e => {
        if (old && p1 && p2) {
            var regdNo = localStorage.getItem('regdNo');
            var newpassword = passone.value;
            //send a post request to server
            updatePassword({
                regdNo,
                newpassword
            });
        }
    })


}