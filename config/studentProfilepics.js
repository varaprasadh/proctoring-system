const connection = require("./init");

var cols=[
    "regdNo   varchar(20) primary key ",
    "fileData blob " 
]
var str=cols.join();

function createStudentProfileepics(){
   var sql = `
     create table student_profilepics (
         ${str}
     )
   `;
   connection.query(sql,(err,result)=>{
     if(err) {
       console.log(err.sqlMessage);
       throw err;
     }
     console.log("profilepics",result);
     
   })
}

module.exports=createStudentProfileepics;



/**
 *
 +----------+-------------+------+-----+---------+-------+
 "regdNo   varchar(20) ",
  "fileData blob "
 +----------+-------------+------+-----+---------+-------+
 *
 *
 */