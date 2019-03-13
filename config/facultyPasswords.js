const connection = require('./init');

var cols=[
    "regdNo   varchar(10) primary key",
    "password varchar(20)"
]
var str=cols.join();

function createfacultyPasswords(){
   var sql = `
     create table faculty_passwords (
         ${str}
     )
   `;
   connection.query(sql,(err,result)=>{
    if(err) throw err;
       console.log("faculty_passwords created",result);

   })

}
module.exports=createfacultyPasswords;




/**

+----------+-------------+------+-----+---------+-------+
"regdNo   varchar(10)",
"password varchar(20)"
+----------+-------------+------+-----+---------+-------+
 *
 */