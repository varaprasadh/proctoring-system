var percent_format = /^(100|\d{1,2}|\d{1,2}\.\d|)$/;
var attendenceData = {};

function PopulateAttendenceTables() {

    var atd_template = document.querySelector('.year-attendence-template');
    var atd_element = document.importNode(atd_template.content, true);
    console.log(atd_element);
    var tables_container = document.querySelector('.attendence-tables');
    var tableyearrfields = [
        "1st Year", "2nd Year", "3rd Year", "4th Year"
    ]
    for (var i = 0; i < 4; i++) {
        var node = atd_element.cloneNode(true);
        node.querySelector('.year-label').innerHTML = tableyearrfields[i];
        console.log(node);
        tweakId(node, i + 1);
        tables_container.appendChild(node);
    };
    AttendenceEventHandler();
}
//toCheck whether the attendence are right or wrong?
function isAttendenceValid() {
    var attendenceinputs = document.querySelectorAll('.atd');
    var valid = false;
    attendenceinputs.forEach(input => {
        var value = input.value;
        if (percent_format.test(value)) {
            valid = true;
        } else {
            valid = false;
        }
    })
    return valid;
}
/*
 */
function AttendenceEventHandler() {
    var percent_format = /^(100|\d{1,2}|\d{1,2}\.\d|)$/;
    var attendenceinputs = document.querySelectorAll('.atd');
    attendenceinputs.forEach(input => {
        input.addEventListener('input', e => {
            var value = input.value;
            //need to select id ;
            if (percent_format.test(value)) {
                //attendencedata[id]=value;
                input.classList.remove('error');
            } else {
                input.classList.add('error');
            }
        })
    })
}

function tweakId(node, year) {
    var inputs = node.querySelectorAll('.atd');
    inputs.forEach(input => {
        var id = input.id;
        var newid = year + "_" + id;
        console.log(newid, end = " ");
    })
    console.log("--------")
}

function getAttendenceDataFromTable() {
    var attendenceinputs = document.querySelectorAll('.atd');
    attendenceinputs.forEach(input => {
        var id = input.id;
        attendenceData[id] = input.value;
    });
    return attendenceData;
}

/*
| regdNo      | varchar(20) | NO   | PRI | NULL    |       |
| JanuaryEnd  | int(5)      | YES  |     | NULL    |       |
| FebruaryEnd | int(5)      | YES  |     | NULL    |       |
| MarchEnd    | int(5)      | YES  |     | NULL    |       |
| SemisterEnd |
*/
// var attendence = {
//     "1year": {
//         "semister1": {
//             "AugustEnd": "",
//             "SeptemberEnd": "",
//             "OctoberEnd": "",
//             "SemisterEnd": ""
//         },
//         "semister2": {
//             "JanuaryEnd": "",
//             "FebruaryEnd": "",
//             "MarchEnd": "",
//             "SemisterEnd": ""
//         }
//     },
//     "2year": {
//         "semister1": {
//             "AugustEnd": "",
//             "SeptemberEnd": "",
//             "OctoberEnd": "",
//             "SemisterEnd": ""
//         },
//         "semister2": {
//             "JanuaryEnd": "",
//             "FebruaryEnd": "",
//             "MarchEnd": "",
//             "SemisterEnd": ""
//         }
//     },
//     "3year": {
//         "semister1": {
//             "AugustEnd": "",
//             "SeptemberEnd": "",
//             "OctoberEnd": "",
//             "SemisterEnd": ""
//         },
//         "semister2": {
//             "JanuaryEnd": "",
//             "FebruaryEnd": "",
//             "MarchEnd": "",
//             "SemisterEnd": ""
//         }
//     },
//     "4year": {
//         "semister1": {
//             "AugustEnd": "",
//             "SeptemberEnd": "",
//             "OctoberEnd": "",
//             "SemisterEnd": ""
//         },
//         "semister2": {
//             "JanuaryEnd": "",
//             "FebruaryEnd": "",
//             "MarchEnd": "",
//             "SemisterEnd": ""
//         }
//     }
// }






/*
 regdNo       | varchar(20) | NO   | PRI | NULL    |       |
| AugustEnd    | int(5)      | YES  |     | NULL    |       |
| SeptemberEnd | int(5)      | YES  |     | NULL    |       |
| OctoberEnd   | int(5)      | YES  |     | NULL    |       |
| SemisterEnd  | int(5)      | YES  |     | NULL    |       |
+--------------+-------------+------+-----+---------+-------+
5 rows in set (0.14 sec)

mysql> desc faculty;
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| regdNo     | varchar(10) | NO   | PRI | NULL    |       |
| name       | varchar(30) | YES  |     | NULL    |       |
| department | varchar(10) | YES  |     | NULL    |       |
| mobile     | varchar(10) | YES  |     | NULL    |       |
| email      | varchar(30) | YES  |     | NULL    |       |
+------------+-------------+------+-----+---------+-------+ */