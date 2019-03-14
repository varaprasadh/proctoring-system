var subcodeRegex = /^((mech|it|cse|ece|eee)\d\d\d|)$/i;
var Elective_subject_codes = {};
var electiveCodes = [{
        code: 311,
        type: "OE",
        seq: 1,
    }, {
        code: 325,
        type: "DE",
        seq: 1
    },
    {
        code: 411,
        type: "OE",
        seq: 2
    },
    {
        code: 414,
        type: "DE",
        seq: 2
    },
    {
        code: 415,
        type: "DE",
        seq: 3
    },
    {
        code: 421,
        type: "DE",
        seq: 4

    },
    {
        code: 422,
        type: "DE",
        seq: 5
    },
    {
        code: 424,
        type: "OE",
        seq: 3
    }
]

var targetElements = [];

function HandleOpenElectives() {
    var _subcodeinputs = document.querySelectorAll('.subcode:not(div)');
    var onlyCodes = electiveCodes.map(elective => elective.code);
    _subcodeinputs.forEach(input => {
        var subcode = Number(input.id.substr(1));

        if (onlyCodes.includes(subcode)) {


            input.disabled = false;
            targetElements.push(input);
            var node = electivepopup.cloneNode(true);
            input.value = '';
            var electiveData;
            electiveCodes.forEach(codeobj => {
                if (codeobj.code == subcode)
                    electiveData = codeobj;
            });

            input.classList.add('elective');
            var msg = "enter " + ((electiveData.type == 'OE') ? "Open " : "departmental ") + `elective-${electiveData.seq} subject code`;
            node.querySelector('.message').innerHTML = `${msg}`;
            input.parentNode.appendChild(node);


        }
    })
}

function electiveInputHanlder() {
    var electiveElements = document.querySelectorAll('.elective');
    console.log(electiveElements);

    electiveElements.forEach(elective => {
        elective.addEventListener('input', e => {
            var value = elective.value;
            var id = elective.id;
            console.log("debuggggggingggg");
            elective.value = value.toUpperCase();
            console.log(value);
            if (subcodeRegex.test(value)) {
                //set this as correct code;
                console.log("cooorerrrrrrrrrrett");

                Elective_subject_codes[id] = value;
                if(value==''){
                    elective.parentNode.querySelector('.elective-popup').style.display = "flex";
                }else{
                    elective.parentNode.querySelector('.elective-popup').style.display = "none";

                }
                elective.classList.remove('error');
            } else {
                console.log("werrronnsdgg");

                elective.parentNode.querySelector('.elective-popup').style.display = "flex";
                elective.classList.add('error');
            }

        })
    })
}

function isvalidElective() {
    var electiveElements = document.querySelectorAll('.elective');
    var valid = false;
    for (let i = 0; i < electiveElements.length; i++) {
        var value = electiveElements[i].value;
        if (!subcodeRegex.test(value)) {
            console.log("debbbbbuuug", electiveElements[i], value);
            console.log("ffff" + value);
            return false;
        } else {
            valid = true;
        }
    }
    return valid;
}

function updateElectiveCodes(regdNo) {
    fetch(`/ProcData/electives/${regdNo}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            var codeinputs = document.querySelectorAll(".subcode:not(div)");
            console.log(codeinputs);
            codeinputs.forEach(input => {
                var id = input.id;
                if (data[id] != null) {
                    input.value = data[id];
                    input.parentNode.querySelector('.elective-popup').style.display = "none";
                }
            })

        }).catch(err => console.log(err));
}

function getElectiveCodes() {
    return Elective_subject_codes;
}