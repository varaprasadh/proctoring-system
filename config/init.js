const connection=require('../dbconnection').connection;

var database="ost_project";


function initConnection(){
  var sql = `use ${database}`;
     connection.query(sql, (err, result) => {
       if (err) throw err;
     })
     return connection;
  
}
module.exports = initConnection();


