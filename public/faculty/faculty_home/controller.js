window.onload = function() {
    var studentItems = document.querySelectorAll('.student-item');
    studentItems.forEach(student => {
        student.addEventListener('click', e => {
            console.log(student);
            var regdNo = student.querySelector('.regdNo').textContent;
            console.log(regdNo);
            window.location.assign('../proctoringForm/theForm.html');
        })
    });
    var AccountBtn = document.querySelector('.profile');
    AccountBtn.addEventListener('click', e => {
        window.location.assign("../faculty_profile/facultyProfile.html");
    })
    var logoutbtn=document.querySelector('.logout');
    logoutbtn.addEventListener('click',e=>{
       localStorage.removeItem('auth');
       //take to index url;
        window.location.assign("../../index/index.html");
    })
}