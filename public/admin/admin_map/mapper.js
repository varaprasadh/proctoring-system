var selected_faculty = '';
var selected_students;
var dragstarted=false;
var initListEventHandlers = {
    facultyEventHandler: function() {
        var fac_items = document.querySelectorAll('.fac-item');
        fac_items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log(item);
                fac_items.forEach(item => {
                    item.classList.remove('facSelected');
                })
                item.classList.add('facSelected');
                var fac_id = item.dataset.id;
                console.log('fac id ', fac_id);

                var data = getMappedStudentsData(fac_id);
                console.log("mapped data", data);

            }, true);
        });
    },
    studentEventHandler: function() {
        student_list.addEventListener('mousedown',e=>{
            dragstarted=true;
        })
        student_list.addEventListener('mouseup',e=>{
            dragstarted=false;
        })
        var student_items = document.querySelectorAll('.student-item');
        student_items.forEach(item => {
            item.addEventListener('click', (e) => {
                console.log(item);
                var cb = item.querySelector('input');
                item.classList.toggle('studentSelected');
                cb.checked = false;
                if (item.classList.contains('studentSelected')) {
                    cb.checked = true;
                }

            })
            item.addEventListener('mouseover',(e)=>{
                console.log("mouse over",e);
                if(dragstarted ){
                    console.log(item);
                    var cb = item.querySelector('input');
                    item.classList.add('studentSelected');
                    cb.checked = false;
                    if (item.classList.contains('studentSelected')) {
                        cb.checked = true;
                    }
                }
            })
        })
    }

}
var mapBtn = document.querySelector('.map');
mapBtn.addEventListener('click', (e) => {
    selected_faculty = document.querySelector('.facSelected');
    //to check whether the proctor is selected or not!!
    if (selected_faculty) {
        var fac_id = selected_faculty.dataset.id;
    } else {
        alert("you must choose a proctor");
    }
    //to check whether the students are alloted or not!
    selected_students = document.querySelectorAll('.studentSelected');

    var student_ids = [];
    if (selected_students.length > 0) {
        selected_students.forEach(student => {
            student_ids.push(student.dataset.id);
        });
        console.log(selected_students);
    } else {
        alert("you need to allot students")
    }

    console.log(fac_id);
    console.log(student_ids);
    var body = JSON.stringify({
        faculty: fac_id,
        students: student_ids
    });
    console.log(body);


    if (fac_id  && student_ids.length > 0) {
        fetch(`http://localhost:9999/map`,{
              method:"PUT",
              mode:"cors",
              body:body,
              headers:{
                  "Content-Type":"application/json"
              }
        }).then(res =>res.json())
        .then(data=>{
           alert(data.status);
        })
        .catch(err => console.log(err));
    } else {
        alert('check the fields');
    }


})

function getMappedStudentsData(id) {
    var url = `http://localhost:9999/mapped/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => data.data)
        .then(data => {
            populateStudentList(data);
        })
        .catch(err => err);
}