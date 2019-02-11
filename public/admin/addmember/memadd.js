console.log("hello world");

function updateform(show, hide) {
    show.classList.remove("invisible");
    show.classList.add('visible');
    hide.classList.add('invisible');
    //console.log(show, hide);
}

const choseflag = 'chooser-active';
var studentform = document.getElementsByClassName('student-form')[0];
var facultyform = document.getElementsByClassName('faculty-form')[0];
var factab = document.getElementsByClassName('chooser-faculty')[0];
factab.addEventListener('click', (e) => {
    e.target.classList.add(choseflag);
    studenttab.classList.remove(choseflag);
    updateform(facultyform, studentform);
});
var studenttab = document.getElementsByClassName("chooser-student")[0];
studenttab.addEventListener("click", e => {
    e.target.classList.add(choseflag);
    factab.classList.remove(choseflag);
    updateform(studentform, facultyform);
})



var input_targets = document.querySelectorAll(".input-box");
input_targets.forEach(target => { //input[type='text']
    target.addEventListener('blur', e => {
        //  console.log(e.target.value, "empty");
        var input_type = e.target.name;
        //console.log(input_type);
        if (e.target.value === "") {
            e.target.classList.remove('has-value');
        } else {
            e.target.classList.add('has-value');
        }
        // console.log(e.target);
      console.log(input_type);
      
        if (!regex[input_type].test(e.target.value)) {
            e.target.classList.add('show-error');
        } else {
            e.target.classList.remove('show-error');
        }


    })

})
var select_boxes = document.querySelectorAll('.input_select');
select_boxes.forEach(box => {
    // console.log(box);

    box.addEventListener('blur', e => {
        //  console.log(e.target.name);

        if (!regex[e.target.name].test(e.target.value)) {
            e.target.classList.add('show-error');
        } else {
            e.target.classList.remove('show-error');
        }
    })
})