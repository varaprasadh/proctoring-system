function submitHandle() {
    var fac_submit_btn = document.querySelector('.f-submit .text');
    var student_submit_btn = document.querySelector('.s-submit .text');

    fac_submit_btn.addEventListener('click', e => {
        var fac_input_value = document.querySelector('.faculty-search .faculty-search-input').value;
        var fac_dept_value = document.querySelector('.faculty-search .department').value;
        console.log("input", fac_input_value, fac_dept_value);
        var url = null;
        if (fac_input_value.length && fac_dept_value.length) {
            //getfaculty/both/:aux/:dep
            url = `/getfaculty/both/${fac_input_value}/${fac_dept_value}`;
        } else if (fac_input_value.length && fac_dept_value == '') {
            url = `/getfaculty/either/${fac_input_value}`;
        } else if (fac_input_value == '' && fac_dept_value != '') {
            url = `/getfaculty/department/${fac_dept_value}`;
        }
        console.log(url);

        if (url != null) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    hidefacultyListoverlay(true);
                    resetFacultyListContainer();
                    populateFaculty(data);
                })
                .catch(err => err)
        }
    });






    student_submit_btn.addEventListener('click', e => {
        var std_input_value = document.querySelector('.student-search .student-search-input').value;
        var std_dept_value = document.querySelector('.student-search .department').value;
        var std_section_value = document.querySelector('.student-search .section').value;
        console.log(std_input_value, std_dept_value, std_section_value);

        var payload = {
            aux: std_input_value,
            department: std_dept_value,
            section: std_section_value
        }

        var payload_str = JSON.stringify(payload);
        fetch(`/getStudents/${payload_str}`).then(res => res.json()).then(data => {
            console.log(data);
            resetStudentListContainer();
            populateStudents(data);
        }).catch(err => err);

    });

}
/**
 *  fetch(`/getfaculty/both/${fac_input_value}/${fac_dept_value}`)
             .then(res=>res.json())
             .then(data=>{
                 console.log(data);
                hidefacultyListoverlay(true);
                populateFaculty(data);
            })
             .catch(err=>err)
            
 * 
 * 
 * 
 * faculty-search faculty-search-input
 *                department
 * student-search student-search-input
 *                department
 *                section
 * 
 * 
 */