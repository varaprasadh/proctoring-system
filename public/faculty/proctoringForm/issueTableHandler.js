function populateIssuesTable(year,regdNo){
    var template = document.querySelector('.issues-table-template');
    var node=document.importNode(template.content,true);
    var container = document.querySelector('.issue-tables');
    var yearfields=["first year","second year","third year","fourth year"];
    node.querySelector('.year-label>div').innerHTML=yearfields[year-1];
    tweakTableId(node,year);
    container.appendChild(node);
   
    FetchIssuesAndRemarks(year, regdNo)
   
}
function tweakTableId(node,year){
    var issues=node.querySelectorAll('.issue');
    issues.forEach(issue=>{
        var id=issue.id;
        var new_id ="Issue"+year+id;
        issue.id=new_id;
    })
    var remarks = node.querySelectorAll('.remark');
    remarks.forEach(remark => {
      var id = remark.id;
        var new_id = "Remark" + year + id;
        remark.id = new_id;
    });
}
function FetchIssuesAndRemarks(year,regdNo){
    fetch(`/ProcData/Issues/${year}/${regdNo}`)
        .then(res => res.json())
        .then(data => {
            console.log("issuedata", data);
            var issues = document.querySelectorAll(".issue");
            issues.forEach(issue => {
                id = issue.id;
                issue.value = (data[id]!=undefined)?data[id]:"";
            });
        }).catch(err => console.log(err))


    fetch(`/ProcData/Remarks/${year}/${regdNo}`)
        .then(res => res.json())
        .then(data => {
            console.log("Remarkdata", data);
            var remarks = document.querySelectorAll(".remark");
            remarks.forEach(remark => {
                id = remark.id;
                console.log(remark,id);
                remark.value=(data[id]!=undefined)?data[id]:data[id];
            })
        })
        .catch(err => console.log(err));
}

function getIssueTableData(){
    var Issues ={};
    var Remarks={};
   var issues=document.querySelectorAll('.issue');
   issues.forEach(issue=>{
       var id=issue.id;
       var value=issue.value;
       if(value!=""){
           Issues[id]=value;
       }

   })
   var remarks=document.querySelectorAll('.remark');
   remarks.forEach(remark=>{
       var id=remark.id;
       var value=remark.value;
       if(value!=""){
           Remarks[id]=value;
       }
   })
   return {
     Issues,
       Remarks
   };
}
