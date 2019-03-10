//students------------------------------------------------------------------------------
function populateStudents(studentData) {
    console.log("debug");
    console.log("fuck::", studentData);
    var container = student_list_container;
    var Studentnode = student_item_node;
    if (studentData.length) {

        studentData.forEach(dataobj => {
            console.log("puss::", dataobj);
            var node = Studentnode.cloneNode(true);
            node.querySelector('.dataholder').dataset.stData = JSON.stringify(dataobj);
            node.querySelector('.regdNo').id = dataobj.regdNo;
            node.querySelector('.name').innerHTML = dataobj.name;
            node.querySelector('.regdNo').innerHTML = dataobj.regdNo;
            node.querySelector('.year').innerHTML= dataobj.year+" year";
            node.querySelector('.section').innerHTML = dataobj.section;
            node.querySelector('.department').innerHTML = dataobj.department;
            var student_item = node.querySelector('.student-item');
            addStudentSelectHandler(student_item);
            container.appendChild(node);
        });

    }
}

function addStudentSelectHandler(node) {
    node.addEventListener('click', e => {
        //addtomapped table; network request
        loadingIcon.classList.add('load');
        
        if (mapped_Student_container.childElementCount >= 15 && !override) {
            //dont add item to the container 
            alert("you can override");
        } else {
            var data = JSON.parse(node.querySelector('.dataholder').dataset.stData);
            console.log(data);
            fetch(`/map/${session.faculty}/${data.regdNo}`)
            .then(res=>res.json()).then(log=>{
                console.log(log);
                if(log.status=='done'){
                    console.log("fireship:", data);
                    node.remove();
                    populateMappedStudents([data])
                }else{
                    alert("something went wrong");
                }
            })
      
        }

    });
}
