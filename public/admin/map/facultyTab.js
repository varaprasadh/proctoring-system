//faculty -----------------------------------------------------------------------------
function populateFaculty(data) {
  var container = faculty_container;
  var _node = fac_item_node;
  if (data.length) {
    data.forEach((obj,index) => {
      var node = _node.cloneNode(true);
      node.querySelector(".name").innerHTML = obj.name;
      node.querySelector(".regdNo").innerHTML = obj.regdNo;
      node.querySelector(".regdNo").id = obj.regdNo;
      var fac_item = node.querySelector(".fac-item");

      AddFacultySelectHandler(fac_item);
      setTimeout(() => {
        container.appendChild(node);
      }, 100*index);
    });
  }
}

function AddFacultySelectHandler(node) {
  node.addEventListener("click", e => {
    //getMappedStudents from the db;
    //populateMappedStudent
    ///getmappedStudents/:f_regdNo
     session.faculty=node.querySelector('.regdNo').id;
     var fac_item = document.querySelector(`#${session.faculty}`).closest('.fac-item');
     clearActiveStatus();
     fac_item.classList.add('active');
     console.log(fac_item);
     fetch(`/getmappedStudents/${session.faculty}`).then(res=>res.json())
    .then(data=>{
        hidemaplistoverlay(true);
        resetMapContainer();
        populateMappedStudents(data);
    })
    .catch()
   
    console.log("faculty", node.id);
  });
}
function clearActiveStatus(){
    document.querySelectorAll('.fac-item').forEach(item=>{
        item.classList.remove('active');
    });
}
