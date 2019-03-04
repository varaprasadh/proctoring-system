function fetchData_UpdateUI() {
    const authData = JSON.parse(localStorage.getItem('auth'));
    var regdNo = authData.regdNo;
    const infourl = "http://localhost:9999/getFacultyInfo/" + regdNo;
    const picurl = "http://localhost:9999/profilepic/faculty/" + regdNo;
    fetch(infourl).then(res => res.json()).then(resData => {
        console.log(resData);
        updateInfo(resData);
    }).catch(err => err);
    fetch(picurl).then(res => res.json()).then(resData => {
        console.log(resData);
        updatePic(resData);
    })
} function updateInfo(data) {
    document.querySelector('.name').innerHTML = data.name;
    document.querySelector('.regdNo').innerHTML = data.regdNo;
    document.querySelector('.department').innerHTML = data.department;
    document.querySelector('.email').innerHTML = data.email;
    document.querySelector('.mobile').innerHTML = data.mobile;
}
function updatePic(data) {
    if (data.dataUrl != undefined) {
        document.querySelector('.fac-img').src = data.dataUrl;
    }
}