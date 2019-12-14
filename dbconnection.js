var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    db: "ost_project"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //console.log(connection.config.database);
    connection.query('use ost_project',(err,db)=>{
        if(err) throw err;
        console.log(db);
     
    });
   
});

module.exports.connection=connection;