window.onload = function() {
    var listOVerlay = document.querySelector('.list-overloay');
    var list_container = document.querySelector('.pending-list');
    var faculty_template = document.querySelector('.faculty-template');
    var faculty_node = document.importNode(faculty_template.content, true);
    var url = "/PendingFaculty";
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      populateFacultyItems(list_container,faculty_node,data);
    }).catch(err=>err);
   
}
function populateFacultyItems(container, faculty_node, data) {
    console.log(data);
    if(data.length!=0){
        data.forEach(obj => {
            var node = faculty_node.cloneNode(true);
            //set regdno as id 
            node.querySelector('.faculty-item').id=obj.regdNo;
            node.querySelector('.name').innerHTML = obj.name;
            node.querySelector('.regdNo').innerHTML = obj.regdNo;
            node.querySelector('.department').innerHTML = obj.department;
            if (obj.file != null) { node.querySelector('.profilepic').src = obj.file }
            container.appendChild(node);
        })
        addHandlers();
    }
    else{
        
        document.querySelector('.list-overlay').style.display="flex";
    }
    
}
function addHandlers(){
    var cards = document.querySelectorAll('.faculty-item');
    console.log("dfdggffsf",cards);
    
    cards.forEach(card=>{
        // console.log("dfdggffsf", card);
        addEventHandler(card);
    })
}


function addEventHandler(node){
  node.querySelector('.accept').addEventListener('click',e=>{
      var regdNo=node.id;
      fetch(`/PendingFaculty/accept/${regdNo}`).then(res=>res.json()).then(_res=>{
         if(_res.status=='success'){
             alert("accepted the faculty");

             animateAndRemoveNode(node);
           
         }
        console.log(_res);
        

      }).catch(err=>err);
    
  })
  node.querySelector('.reject').addEventListener('click',e=>{
      var regdNo=node.id;
      fetch(`/PendingFaculty/reject/${regdNo}`).then(res=>res.json()).then(data=>{
         if(data.status=="success"){
             alert("deleted successfully");
             animateAndRemoveNode(node);
    

         }
        console.log(_res);
        
      }).catch(err=>err);

  })
  
}
function animateAndRemoveNode(node){
    var card = node.closest(".faculty-item");
    card.classList.add("fadeout");
    setTimeout(() => {
        card.remove();
    }, 1000);
    updateUI();
}

function updateUI(){
    if (document.querySelector('.pending-list').childElementCount<=1){
        document.querySelector('.list-overlay').style.display = "flex";
    }
}
   
