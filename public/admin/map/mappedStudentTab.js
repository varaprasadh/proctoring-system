//mapped -----------------------------------------------------------------------------------
function populateMappedStudents(data) {
  var container = mapped_Student_container;
  var _node = mapped_student_node;
  if (data.length) {
    data.forEach((obj,index) => {
      node = _node.cloneNode(true);
      node.querySelector(".dataholder").dataset.stData = JSON.stringify(obj);
      node.querySelector(".name").innerHTML = obj.name;
      node.querySelector(".regdNo").id = obj.regdNo;
      node.querySelector(".regdNo").innerHTML = obj.regdNo;
      node.querySelector('.year').innerHTML=obj.year+" year";
      node.querySelector(".section").innerHTML = obj.section;
      node.querySelector(".department").innerHTML = obj.department;
      var mapped_st_item = node.querySelector(".mapped-student");
      addMappedStudentEventHandler(mapped_st_item);
      container.appendChild(node);
      //auto scroll
      container.scrollTop=container.scrollHeight;
    });
  }
}

function addMappedStudentEventHandler(node) {
  var trash=node.querySelector('.unmap');
  trash.addEventListener("click", e => {
    // var regdNo = node.closest('.mapped-student').querySelector('.regdNo').id;
    var dataholder = node.querySelector(".dataholder");
    // console.log((dataholder.dataset.stData));
    var data = JSON.parse(dataholder.dataset.stData);
    fetch(`/unmap/${session.faculty}/${data.regdNo}`).then(res=>res.json())
    .then(log=>{
       if(log.status=="done"){
        //  alert("unmapped faculty"+ session.faculty+"with student:"+data.regdNo);
            statuslog(`unmaped student:${data.regdNo} with faculty:${session.faculty}`);
           console.log("unmapped",session.faculty,data.regdNo);
           node.remove();
           hidestudentListoverlay(true);
           populateStudents([data]); 
       }
    }).catch(err=>err);
  
  });
}

