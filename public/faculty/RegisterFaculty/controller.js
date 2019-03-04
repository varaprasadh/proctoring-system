var registrationData = {};
var submitButton;
window.onload = function() {
    console.log("hello world");

    var regex = {
        name: /^[A-Za-z]+\s{1,2}[A-Za-z]+$/,
        regdNo: /^anit\d{3,3}$/,
        email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        mobile: /^\d{10,10}$/,
        department: /\w/,
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    }
    var photopreview = document.querySelector('.photopreview');
    photopreview.addEventListener('click', e => {
        document.querySelector('#file').click();
    });
    var inputElements = document.querySelectorAll('.inputs');
    inputElements.forEach(input => {
        input.addEventListener('input', e => {
            var id = input.id;
            var value = input.value;
            console.log(id, value);
            if (regex[id].test(value)) {
                registrationData[id] = value;
                input.parentNode.querySelector('.error').style.display = "none";
            } else {
                input.parentNode.querySelector('.error').style.display = "block";

            }
        })
    });
    var cpass = document.querySelector('.c-password');
    cpass.addEventListener('input', e => {
        value = cpass.value;
        if (registrationData["password"] == value) {
            registrationData['password'] = value;
            cpass.parentNode.querySelector('.error').style.display = "none";
        } else {
            cpass.parentNode.querySelector('.error').style.display = "block";

        }
    })
    var depselect = document.querySelector('select');
    depselect.addEventListener('change', e => {
        var id = depselect.id;
        var value = depselect.value;
        if (regex[id].test(value)) {
            registrationData[id] = value;
            depselect.parentNode.querySelector('.error').style.display = "none";
        } else {
            depselect.parentNode.querySelector('.error').style.display = "block";
        }
    });
    var previewimg = document.querySelector('.previewimg');
    var fileinput = document.querySelector('#file');
    fileinput.addEventListener('change', e => {
        file = fileinput.files[0];
        if (file && file.size < 1024 * 1024) {
            console.log("less than 1mb");
            registrationData.fileType = file.type;
            console.log(file);
            var filereader = new FileReader();
            filereader.onload = function() {
                previewimg.src = filereader.result;
                registrationData.fileData = filereader.result;
            }
            filereader.readAsDataURL(file);
            fileinput.parentNode.querySelector('.error').style.display = "none";

        } else {
            fileinput.parentNode.querySelector('.error').style.display = "block";
        }

    })
    submitButton = document.querySelector('.submit');
    submitButton.addEventListener('click', e => {
        var regexKeys = Object.keys(regex);
        var allpresent = false;
        regexKeys.forEach(key => {
            if (regex[key].test(registrationData[key])) {
                allpresent = true;
            } else {
                allpresent = false;
            }
        });
        if (allpresent) {
            submitButton.innerHTML = "please wait..."
            submitButton.classList.add('loading');
            console.log(registrationData);
            registerUser(registrationData);
        } else {
            alert("check the details once");
        }
    })
}

function updateUi(data) {
    console.log("update ui");

    if (data.status == "succeed") {

        localStorage.setItem('auth', JSON.stringify({
            regdNo: registrationData.regdNo
        }));
        //redirect
        window.location.assign('../fac_home/faculty_home/faculty_home.html');
    } else {
        alert("something went wrong..please try again");
        submitButton.classList.remove('loading');
        submitButton.innerHTML = "submit"

    }
}