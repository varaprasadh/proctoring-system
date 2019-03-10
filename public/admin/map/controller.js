var student_item_template,
    fac_item_template,
    fac_item_node,
    faculty_container,
    student_list_container,
    mapped_student_template,
    mapped_student_node;
var loadingIcon;
var maplistoverlay, studentListoverlay, facultyListoverlay;
var override = false; //to override mapping
window.onload = function() {
    loadingIcon = document.querySelector('.ProcessStatus .icon');
    student_item_template = document.querySelector('.student-item-template');
    fac_item_template = document.querySelector('.fac-item-template');
    fac_item_node = document.importNode(fac_item_template.content, true);
    student_item_node = document.importNode(student_item_template.content, true);
    faculty_container = document.querySelector('.fac-list');
    student_list_container = document.querySelector('.student-list');
    mapped_student_template = document.querySelector('.mapped-student-template');
    mapped_student_node = document.importNode(mapped_student_template.content, true);
    mapped_Student_container = document.querySelector('.mapped-list');

    maplistoverlay = document.querySelector('.maplist-overlay');
    studentListoverlay = document.querySelector('.studentList-overlay');
    facultyListoverlay = document.querySelector('.facultyList-overlay');
    // populateFaculty(faculty_data);
    // populateStudents(student_data);
    submitHandle();

}

function hidemaplistoverlay(bool) {
    maplistoverlay.style.display = (bool) ? "none" : "flex";
}

function hidestudentListoverlay(bool) {
    studentListoverlay.style.display = (bool) ? "none" : "flex";
}

function hidefacultyListoverlay(bool) {
    facultyListoverlay.style.display = (bool) ? "none" : "flex";
}



function resetStudentListContainer() {
    student_list_container.innerHTML = '';
}

function resetFacultyListContainer() {
    faculty_container.innerHTML = '';
}

function resetMapContainer() {
    mapped_Student_container.innerHTML = '';
}
/**
 * <div class="student-data">
                <div class="name">Varaprasadh Alajangi</div>
                <div class="regdNo">316126510201</div>
                <div class="section-wrapper"><span class="section">C</span> section</div>
                <div class="department">Cse</div>
            </div>
 *  <div class="name">Johua Jhonson</div>
            <div class="branch-details">
                <div class="regdNo">Anit123</div>
            </div>


 *   <div class="name">Varaprasadh Alajangi</div>
                <div class="regdNo">316126510201</div>
                <div class="section-wrapper"><span class="section">C</span> section</div>
                <div class="department">Cse</div>
 */