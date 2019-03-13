const connection = require('./init');

var cols=[
    "regdNo      varchar(10) primary key",
    "name        varchar(30) ",
    "department  varchar(10) ",
    "mobile      varchar(10) ",
    "email       varchar(30) ",
    "file        blob        ",
    "password    varchar(20) "
]
var str=cols.join();

function createPendingFaculty(){
    var sql =`create table pendingfaculty (
        ${str}
    ) `;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        // console.log("pendingfaculty",result);
        console.log("pending faculty");  
    })
}
module.exports=createPendingFaculty;


/**
"regdNo      varchar(10) ",
"name        varchar(30) ",
"department  varchar(10) ",
"mobile      varchar(10) ",
"email       varchar(30) ",
"file        blob        ",
"password    varchar(20) "
+------------+-------------+------+-----+---------+-------+
 *
 *
 */