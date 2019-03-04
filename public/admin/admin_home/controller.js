window.onload=function(){
    var logoutbtn = document.querySelector('.logout');
    logoutbtn.addEventListener('click', e => {
        localStorage.removeItem('auth');
        //take to index url;
        window.location.assign("../../index/index.html");
    });
}