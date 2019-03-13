
var electiveCodes = [
    {
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

function HandleOpenElectives() {
    var _subcodeinputs = document.querySelectorAll('.subcode:not(div)');
    // console.log(_subcodeinputs);
    var onlyCodes=electiveCodes.map(elective=>elective.code);
     console.log("wilsonDebug",onlyCodes);
     _subcodeinputs.forEach(input=>{
         subcode.disabled="true";
         var subcode=Number(input.id.substr(1));
         if(onlyCodes.includes(subcode)){
             console.log("includeddddddddd");
             input.disabled="false";
                
         }
     })
}


     // electiveCodes.forEach(_code => {
        //     if (_code.code != Number(code)) {
        //         console.log(">>>>>>>", Number(code), ">>", _code.code);

        //         subcodeinput.disabled = "false";
        //         // subcodeinput.classList.add('DontEdit');
        //     }else{
        //         subcodeinput.disabled = "true";

        //     }
        // })