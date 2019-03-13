var payload;
var electivepopuptemplate,electivepopup;
window.onload = function() {
    electivepopuptemplate = document.querySelector(".elective-popup-template");
    electivepopup=document.importNode(electivepopuptemplate.content,true);
    // window.scrollTo(0,0);
    var auth = JSON.parse(localStorage.getItem('auth'));
    var fac_id = auth.regdNo; //faculty regdNo
    var student_data_url = '/Student/';
    var regdNo = new URL(window.location.href).searchParams.get('regdNo');
    console.log("got:", regdNo);

    fetchStudentData(student_data_url + regdNo).then(data => {
            var year = data.year;
            console.log(year);
            var studentDetails = data;
            //update student Details
            updateStudentDetails(studentDetails);
            //getStudentphoto
            updateStudentProfilePic(regdNo);
            PopulateAttendenceTables(regdNo);
            populateGradeTables(regdNo);
            populateIssuesTable(year, regdNo);
            HandleOpenElectives();
            electiveInputHanlder();
            updateElectiveCodes(regdNo);
        })
        .catch(err => err);

    //submit button
    document.querySelector(".submitForm-btn").addEventListener('click', e => {
        if (isAttendenceValid() && isGradeTableValid() && isvalidElective()) {
            //add loader
            payload = {
                "regdNo": regdNo,
                "faculty": fac_id,
                "Attendence": getAttendenceDataFromTable(),
                "grades": getGradeDataFromTable(),
                "IssueRemarks": getIssueTableData(),
                "ElectiveCodes":getElectiveCodes()

            }
            console.log(payload);
            fetch('/updateProcData', {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        'content-Type': "application/json"
                    }
                })
                .then(res => {
                    console.log(res);
                    alert("success");
                }).catch(err => {
                    console.log("front end debug")
                });
        } else {
            alert("something wrong");
        }
    });
}

function updateStudentProfilePic(regdNo) {
    fetch('/profilepic/student/' + regdNo)
        .then(res => res.json())
        .then(imgdata => {
            if (imgdata.dataUrl) {
                document.querySelector('.student-details .photo > img').src = imgdata;
            }
        })
}

function updateStudentDetails(details) {
    // console.log(details); 
    var year = details.year + ['st', 'nd', 'rd', 'th'][details.year - 1]
    document.querySelector('.name').innerHTML = details.name;
    document.querySelector('.regdNo').innerHTML = details.regdNo;
    document.querySelector('.year').innerHTML = year;
    document.querySelector('.section').innerHTML = details.section;
    document.querySelector('.department').innerHTML = details.department;
    document.querySelector('.mobile').innerHTML = details.mobile ? details.mobile : '';
    document.querySelector('.email').innerHTML = details.email ? details.email : "";
    document.querySelector('.address').innerHTML = details.localAddress ? details.localAddress : "";
}


/*
 *
 * /profilepic/student/:regdNo
 * /Student/:regdNo
 *
 * /ProcData/Attendence/:regdNo
 * /ProcData/Grades/:regdNo'
 * /ProcData/CGPA/:regdNo
 * /ProcData/Remarks/:year/:regdNo'
 * /ProcData/Issues/:year/:regdNo'
 */