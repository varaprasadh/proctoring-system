var grade_format = /^([A,B]{1,1}\+?|C|F|P|O|I|)$/;
var code_format = /^(\d\d\d|)$/;
var cgpaFormat = /^([0-9]{1,1}\.\d|10|\d|)$/;
var gradeData = {};
var CgpaData = {};
/**
                  *   311  open elective 1
                      325  departmental elective1
                      411  open elective 2
                      414  departmental elective2
                      415  departmental elective3
                      421  departmental elective4
                      422  departmental elective5 
                      424  open elective;
                  */


function populateGradeTables(regdNo) {
    var grade_table_template = document.querySelector('.grade-table-template');
    var grade_table_node = document.importNode(grade_table_template.content, true);
    var grade_table_container = document.querySelector('.grade-tables');
    var tableyearrfields = [
        "1st Year", "2nd Year", "3rd Year", "4th Year"
    ];

    for (var year = 1; year <= 4; year++) {
        var node = grade_table_node.cloneNode(true);
        node.querySelector('.year-label').innerHTML = tableyearrfields[year - 1];
        //console.log(node);
        // tweakgradeinputid(node,  year);
        putSubjectCodes(node, year);
        putgpaCodes(node, year);
        grade_table_container.appendChild(node);

    };
    gradeinputEventHandler();
    fetchGrades(regdNo);
}
//Manually set the values for subjectcodes and id for the subgrade inputs
function putSubjectCodes(node, year) {
    //console.log("putsubcode",node,year);
    var subcodeinputs = node.querySelectorAll('.subcode:not(div)');
    var count = 1;
    subcodeinputs.forEach((subcodeinput, index) => {
        var semister = subcodeinput.closest('.grade-table').dataset.semister;
        //console.log(subcodeinput,index);
        var code = year + '' + semister + "" + count;

        count++;
        if (count > 9) {
            count = 1;
        }
   
        subcodeinput.id="G"+code;

        subcodeinput.parentNode.querySelector('.subgrade').id = "G" + code; //matched with table column name
        subcodeinput.value = code;
        //  console.log(code); 
    });
}

function gradeinputEventHandler() {
    var gradeinputs = document.querySelectorAll('.subgrade:not(div)'); //select only input elements
    // console.log(gradeinputs);
    gradeinputs.forEach(input => {
        input.addEventListener('input', e => {
            var id = input.id;
            var value = input.value.toUpperCase();
            input.value = value;
            if (grade_format.test(value)) {
                gradeData[id] = value;
                input.classList.remove("error");
            } else {
                input.classList.add("error");
            }
        })
    })
    var CGpa_Inputs = document.querySelectorAll('.gpa');
    CGpa_Inputs.forEach(gpa_ip => {
        gpa_ip.addEventListener('input', e => {
            var id = gpa_ip.id;
            var value = gpa_ip.value;
            if (cgpaFormat.test(value)) {
                console.log(id);
                CgpaData[id] = value;
                gpa_ip.classList.remove("error");
            } else {
                gpa_ip.classList.add("error");
            }
        })
    })
}

function putgpaCodes(node, year) {
    var gpas = node.querySelectorAll('.gpa');
    gpas.forEach(gpa => {
        var id = gpa.id;
        gpa.id = year + id;
    })
}

function isGradeTableValid() {
    var nodes = document.querySelectorAll('.subgrade:not(div)');
    var CGpa_Inputs = document.querySelectorAll(".gpa");
    var valid = false;
    AllNodes = [...nodes, ...CGpa_Inputs];
    for (i = 0; i < AllNodes.length; i++) {
        if (AllNodes[i].classList.contains('error')) {
            return false;
        } else {
            valid = true;
        }
    }
    return valid;
}

function fetchGrades(regdNo) {
    fetch("/ProcData/Grades/" + regdNo)
        .then(res => res.json())
        .then(data => {
            // console.log("grades",data);
            var gradeinputs = document.querySelectorAll(".subgrade:not(div)");
            gradeinputs.forEach(input => {
                id = input.id;
                input.value = (data[id] != null) ? data[id] : '';
            })
        })
    fetch(`/ProcData/CGPA/${regdNo}`)
        .then(res => res.json())
        .then(data => {
            console.log("CGPA:", data);
            var gpas = document.querySelectorAll('.gpa');
            gpas.forEach(gpa => {
                var id = gpa.id;
                gpa.value = (data[id] != null) ? data[id] : '';
            })
        })
}

function getGradeDataFromTable() {

    return {
        gradeData,
        CgpaData
    };
}


/*

                      ^    ^
                      /  \  /  \
                     / () \/ () \
                     \          / 
                      \  \__/  / 
                       |______|
                      / 
                     /
                          



*/