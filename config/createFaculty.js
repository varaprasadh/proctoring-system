const connection = require('./init');


var cols=[
    "regdNo     varchar(10) primary key",
    "name       varchar(30)",
    "department varchar(10)",
    "mobile     varchar(10)",
    "email      varchar(30)" 
]

var str = cols.join();

function createfaculty() {
    var sql = `
     create table faculty (
         ${str}
     )
   `;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("faculty created", result);

    })

}
module.exports=createfaculty;


/**
"regdNo     varchar(10) primary key",
"name       varchar(30)",
"department varchar(10)",
"mobile     varchar(10)",
"email      varchar(30)"
+------------+-------------+------+-----+---------+-------+
 *
 *
 */