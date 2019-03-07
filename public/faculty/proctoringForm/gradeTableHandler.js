var grade_format = /^([A,B]{1,1}\+?|C|F|P|O|I|)$/;
var code_format = /^(\d\d\d|)$/;

var gradeData = {};

function populateGradeTables() {
    var grade_table_template = document.querySelector('.grade-table-template');
    var grade_table_node = document.importNode(grade_table_template.content, true);
    var grade_table_container = document.querySelector('.grade-tables');
    var tableyearrfields = [
        "1st Year", "2nd Year", "3rd Year", "4th Year"
    ];
    for (var i = 0; i < 4; i++) {
        var node = grade_table_node.cloneNode(true);
        node.querySelector('.year-label').innerHTML = tableyearrfields[i];
        console.log(node);
        tweakgradeinputid(node, i + 1);
        grade_table_container.appendChild(node);
    };
    gradeEventHandler();
}

function gradeEventHandler() {
    // var inputs_wrapper = document.querySelector('.grade-table-year');
    // console.log(inputs_wrapper);

    var gradeinputs = document.querySelectorAll('.subgrade:not(div)'); //select only input elements
    console.log(gradeinputs);
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
    var subcodeinputs = document.querySelectorAll('.subcode:not(div)');
    console.log(subcodeinputs);

    subcodeinputs.forEach(input => {
        input.addEventListener('input', e => {
            var value = input.value;
            var id = input.id;
            if (code_format.test(value)) {
                gradeData[id] = value;
                input.classList.remove("error");
            } else {
                input.classList.add("error");
            }
        })
    })
}

function isGradeTableValid() {
    var nodes = document.querySelectorAll('.subcode:not(div),.subgrade:not(div)');
    var valid = false;
    nodes.forEach(node => {
        if (!node.classList.contains('error')) {
            valid = true;
        } else {
            valid = false;
        }
    })
    return valid;
}

function getGradeDataFromTable() {

    return gradeData;
}

function tweakgradeinputid(node, year) {
    var inputs = node.querySelectorAll('input');
    inputs.forEach(input => {
        var id = input.id;
        var newid = year + "_" + id;
        input.id = newid;
        //console.log(newid, end = " ");
    })
    console.log("--------")
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