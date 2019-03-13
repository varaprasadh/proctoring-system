const connection = require('./init');
/**
 * 
"regdNo        varchar(20) primary key",
"name          varchar(30) ",
"year          varchar(10) ",
"section       varchar(10) ",
"department    varchar(10) ",
"fathername    varchar(30) ",
"mobile        varchar(20) ",
"email         varchar(30) ",
"localAddress  text        "
+--------------+-------------+------+-----+---------+-------+
 * 
 */

 var cols=[
     "regdNo        varchar(20) primary key",
     "name          varchar(30) ",
     "year          varchar(10) ",
     "section       varchar(10) ",
     "department    varchar(10) ",
     "fathername    varchar(30) ",
     "mobile        varchar(20) ",
     "email         varchar(30) ",
     "localAddress  text        "
 ];

 var str=cols.join();
function createStudentTable(){
    var sql=`
      create table students (
          ${str}
      )
    `;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("students table created:",result);
    })
}
module.exports=createStudentTable;