var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    db: "ost_project",
    port: 3307
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