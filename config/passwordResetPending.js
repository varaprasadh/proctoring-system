const connection = require('./init');

 var cols=[
     "regdNo    varchar(20) primary key",
     "type      varchar(10)",
     "email     varchar(50)",
     "reset_key varchar(50)"
 ]
 var str=cols.join();

 function createPasswordReset(){
     var sql =`create table password_reset_pending
     (
         ${str}
     ) `;
     connection.query(sql,(err,result)=>{
         if(err) throw err;
         console.log("password_reset_pending",result);

     })   
 }

 module.exports=createPasswordReset;

/**
"regdNo    varchar(20)",
"type      varchar(10)",
"email     varchar(50)",
"reset_key varchar(50)"
 *   */
