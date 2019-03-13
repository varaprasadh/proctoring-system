const connection=require('../dbconnection').connection;

var database="test_project";
// function dropdatabaseAndCreate(){
//   var sql=`drop database if exists ${database}`;
//   connection.query(sql,(err,result)=>{
//     if(err) throw err;
//     var createsql=`create database ${database}`;
//     connection.query(createsql,(err,result)=>{
//       if(err) throw err;
//       return connection;
//     })
//   })
// }


function initConnection(){
  var sql = `use ${database}`;
     connection.query(sql, (err, result) => {
       if (err) throw err;
     })
     return connection;
  
}
module.exports = initConnection();


