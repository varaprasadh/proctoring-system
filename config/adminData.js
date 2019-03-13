const connection=require('./init');
var cols = [
    "admin_id  varchar(20) primary key",
    "name      varchar(20)",
    "email     varchar(50)",
    "password  varchar(50)"
]

var str = cols.join();

function createAdmin() {
    var sql = `
     create table admindata (
         ${str}
     )
   `;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("admindata created", result);

    })

}
module.exports =createAdmin;


/**
"admin_id  varchar(20)",
"name      varchar(20)",
"email     varchar(50)",
"password  varchar(50)"
 *
 */