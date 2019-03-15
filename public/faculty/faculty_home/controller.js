window.onload = function() {
    fetchFaculty_UpdateUI();
    fetchStudents_updateUI();
    
    //seems async 
    
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