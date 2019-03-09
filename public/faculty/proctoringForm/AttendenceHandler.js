var percent_format = /^(100|\d{1,2}|\d{1,2}\.\d|)$/;
var attendenceData = {};

AttendenceIDs = [
    "1August",
    "1February",
    "1FirstSemEnd",
    "1January",
    "1March",
    "1October",
    "1SecondSemEnd",
    "1September",
    "2August",
    "2February",
    "2FirstSemEnd",
    "2January",
    "2March",
    "2October",
    "2SecondSemEnd",
    "2September",
    "3August",
    "3February",
    "3FirstSemEnd",
    "3January",
    "3March",
    "3October",
    "3SecondSemEnd",
    "3September",
    "4August",
    "4February",
    "4FirstSemEnd",
    "4January",
    "4March",
    "4October",
    "4SecondSemEnd",
    "4September"
];

function PopulateAttendenceTables(regdNo) {
    new Promise((resolve,reject)=>{
        var atd_template = document.querySelector('.year-attendence-template');
        var atd_element = document.importNode(atd_template.content, true);
        // console.log(atd_element);
        var tables_container = document.querySelector('.attendence-tables');
        var tableyearrfields = [
            "1st Year", "2nd Year", "3rd Year", "4th Year"
        ]
        for (var year = 1; year <= 4; year++) {
            var node = atd_element.cloneNode(true);
            node.querySelector('.year-label').innerHTML = tableyearrfields[year - 1];
             console.log(node);
            tweakId(node, year);
            tables_container.appendChild(node);
        };
        AttendenceEventHandler();
        resolve();
    }).then(_=>{
        FetchAttendence(regdNo);
    })
  
    
}

function FetchAttendence(regdNo) {
    console.log("Attendencedebug");
    fetch('/ProcData/Attendence/' + regdNo).then(res => res.json())
        .then(data => {
            console.log("attendence",data);
            console.log(AttendenceIDs);
            AttendenceIDs.forEach(id=>{
                var node=document.getElementById(id);
                // console.log(node);
                // console.log("data:",data[id]);
                node.value=(data[id]!=undefined)?data[id]:'';
            })
            
        })
        .catch(err => err);
}




//toCheck whether the attendence are right or wrong?
function isAttendenceValid() {
    var attendenceinputs = document.querySelectorAll('.atd');
    var valid = false;
    AllNodes = [...attendenceinputs];
    for (i = 0; i < AllNodes.length; i++) {
        if (AllNodes[i].classList.contains('error')) {
            return false;
        }
        else {
            valid = true;
        }
    }
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
            var id=input.id;
            if (percent_format.test(value)) {
                if(value!=''){
                    attendenceData[id] = value;
                }
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
        input.id=year+id;
    })

}

function getAttendenceDataFromTable() {
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