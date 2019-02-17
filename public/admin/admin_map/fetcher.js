console.log("hello wrslkvsv");

var f_search_btn = document.querySelector('#fac-search-btn');
var f_dpt = document.querySelector('.f-dept');
var f_id = document.querySelector('#fac-id');

var fac_list = document.querySelector('.fac-list');
var student_list = document.querySelector('.student-list');
console.log(f_id);
// console.log(f_search_btn);
f_search_btn.addEventListener('click', (e) => {
    var name_or_id = f_id.value;
    var dept = f_dpt.value;
    console.log(name_or_id);
    //query database for that name or id;
    //and for department also
    if (name_or_id == '') {
        console.log('hehe');
        name_or_id = ' ';
    }

    // console.log('skjfnskfjskg');

    var url = `http://localhost:9999/faculty/${name_or_id}/${dept}`;
    console.log(url);

    fetch(url).then(res => res.json()).then(obj => {
        var fac_items = obj.data;
        console.log(fac_items);
        console.log(fac_list);
        if(!fac_items.length>0){
            alert("data not found");
        }
        populateFacultyList(fac_items);

        /*
        `<div class="fac-item card">
                        <div class="fac-name">${fac.name}</div>
                        <div class="fac-id">${fac.reg_no}</div>
                    </div>`
            */
    }).catch(err => err);
})
var s_dpt = document.querySelector('.student-department select');
var s_year = document.querySelector('.student-year select');
var s_search_btn = document.querySelector('#std-search-btn');

s_search_btn.addEventListener('click', (e) => {
    var year = s_year.value;
    var dept = s_dpt.value;
    //fetch data from database as the department and year
    var url = `http://localhost:9999/student/${dept}/${year}`;
    fetch(url).then(res => res.json()).then(data => {
        var objs = data.data;
        populateStudentList(objs);
    }).catch(err => err);
});

function populateFacultyList(dataobjs) {
    dataobjs.forEach(obj => {
        var element = `<div data-id=${obj.reg_no} class="fac-item card">
                        <div class="fac-name">${obj.name}</div>
                        <div class="fac-id">${obj.reg_no}</div>
                    </div>`
        console.log(element);
        fac_list.innerHTML += element;
    });
    initListEventHandlers.facultyEventHandler();
}

function populateStudentList(objs) {
    objs.forEach(obj => {
        var element = ` <div data-id=${obj.reg_no} class="student-item student-card">
                            <div  class="student-data">
                                <div class="student-name">${obj.name}</div>
                                <div class="student-id">${obj.reg_no}</div>
                            </div>
                            <input type="checkbox" id="std-selected">
                       </div>`
        student_list.innerHTML += element;
    });
    initListEventHandlers.studentEventHandler();
}
