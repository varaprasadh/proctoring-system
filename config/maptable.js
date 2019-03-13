const connection = require("./init");

/**
"s_regdNo varchar(20) ", 
"f_regdNo varchar(20) "  
 * 
 */

 var cols=[
     "s_regdNo varchar(20) primary key",
     "f_regdNo varchar(20) " 
 ]
 var str=cols.join();

 function createMapTable(){
     var sql=`create table map_fac_to_student (
         ${cols}
     )`;
     connection.query(sql,(err,result)=>{
         if(err) throw err;
         console.log("map table",result);
         
     })
 }
 module.exports=createMapTable;