window.onload = function() {
    var downloadbtn = document.querySelector('.download');
    var department = document.querySelector('#department');
    var year = document.querySelector('#year');
    var section = document.querySelector('#section');
    downloadbtn.addEventListener('click', e => {
        console.log(department, year, section);
        var y = year.value;
        var s = section.value;
        var d = department.value;
        var payload = {
                year: y,
                section: s,
                department: d
            }
            // console.log(payload);
        var payloadString = JSON.stringify(payload);
        // fetch(`/download/${payloadString}`).then(res => res.json()).then(data => {
        //     console.log(data);
        // })
        window.location.href = `/download/${payloadString}`;
    })
}