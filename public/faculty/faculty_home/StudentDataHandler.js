var student_item_node;

function fetchStudents_updateUI() {
    //faculty regdNo
    const authData = JSON.parse(localStorage.getItem('auth'));
    var regdNo = authData.regdNo;
    var template = document.querySelector('.student-item-template');
    student_item_node = document.importNode(template.content, true);
    var container = document.querySelector('.student-list')
        //console.log(student_item_node);

    const mappedStudentsroute = "http://localhost:9999/mapped/" + regdNo;
    fetch(mappedStudentsroute).then(res => res.json()).then(data => {
        var student_objects = data.data;
        //console.log(student_objects);
        student_objects.forEach(obj => {
            var node = student_item_node.cloneNode(true);
            console.log(node);
            console.log(obj);

            addStudentItem(container, node, obj);
        })
    }).then(() => {
        StudentEventHandler();
    }).catch(err => err);
}

function addStudentItem(container, node, obj) {
    console.log(node);
    console.log("debug:", obj.regdNo);

    node.querySelector('.name').innerHTML = obj.name;
    node.querySelector('.regdNo').innerHTML = obj.regdNo;
    node.querySelector('.regdNo').dataset.regdNo = obj.regdNo;
    node.querySelector(".year").innerHTML = ["first year", "second year", "third year", "fouth year"][obj.year - 1];
    node.querySelector(".section").innerHTML = obj.section;
    node.querySelector(".department").innerHTML = obj.department;
    container.appendChild(node);

}

function StudentEventHandler() {
    var studentItems = document.querySelectorAll('.student-item');
    studentItems.forEach(student => {
        student.addEventListener('click', e => {
            console.log(student);
            var regdNo = student.querySelector('.regdNo').dataset.regdNo;

            url_params = new URLSearchParams();
            url_params.append("regdNo", regdNo);
            url = "../proctoringForm/theForm.html" + "?" + url_params;
            window.location.assign(url);
        })
    });
}

/*
   <div class="student-item" id="regdno">
            <div class="student-img">
                <img src="./ios-person.svg" alt="">
            </div>
            <div class="st-details">
                <div class="name">Varaprasadh Alajangi</div>
                <div class="regdNo">31612610201</div>
                <div class="year"></div>
                <div class="section-wrapper"><span class="section">C</span> Section</div>
                <div class="department">computer Science</div>
            </div>
        </div>
*/