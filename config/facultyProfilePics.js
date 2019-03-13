const connection = require('./init');

/*
"regdNo varchar(10) ",
"file   blob        "
*/
var cols=[
    "regdNo varchar(10) primary key",
    "file   blob        "
];
var str=cols.join();
function createFacultyProfilepics() {
    var sql = `
    create table faculty_profilepics (
        ${str}
    )`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log("faculty_profilepics",result);
    })
}
module.exports=createFacultyProfilepics;