const connection=require('./dbconnection').connection;


function create(){
  var str=gradecols.join();
  console.log(str);
  sql=`create table grades (
  ${str}
  )`
  connection.query('use ost_project',(err,res)=>{
      connection.query(sql, (err, res) => {
          if (err) throw err;
          console.log(res);
      })
  })
}
const gradecols = [
  "regdNo varchar(20)",
 " G111 varchar(2)", 
 " G112 varchar(2)" , 
 " G113 varchar(2)" , 
 " G114 varchar(2)" , 
 " G115 varchar(2)" , 
 " G116 varchar(2)" , 
 " G117 varchar(2)" , 
 " G118 varchar(2)" , 
 " G119 varchar(2)" , 
 " G121 varchar(2)" , 
 " G122 varchar(2)" , 
 " G123 varchar(2)" , 
 " G124 varchar(2)" , 
 " G125 varchar(2)" , 
 " G126 varchar(2)" , 
 " G127 varchar(2)" , 
 " G128 varchar(2)" , 
 " G129 varchar(2)" , 
 " G211 varchar(2)" , 
 " G212 varchar(2)" , 
 " G213 varchar(2)" , 
 " G214 varchar(2)" , 
 " G215 varchar(2)" , 
 " G216 varchar(2)" , 
 " G217 varchar(2)" , 
 " G218 varchar(2)" , 
 " G219 varchar(2)" , 
 " G221 varchar(2)" , 
 " G222 varchar(2)" , 
 " G223 varchar(2)" , 
 " G224 varchar(2)" , 
 " G225 varchar(2)" , 
 " G226 varchar(2)" , 
 " G227 varchar(2)" , 
 " G228 varchar(2)" , 
 " G229 varchar(2)" , 
 " G311 varchar(2)" , 
 " G312 varchar(2)" , 
 " G313 varchar(2)" , 
 " G314 varchar(2)" , 
 " G315 varchar(2)" , 
 " G316 varchar(2)" , 
 " G317 varchar(2)" , 
 " G318 varchar(2)" , 
 " G319 varchar(2)" , 
 " G321 varchar(2)" , 
 " G322 varchar(2)" , 
 " G323 varchar(2)" , 
 " G324 varchar(2)" , 
 " G325 varchar(2)" , 
 " G326 varchar(2)" , 
 " G327 varchar(2)" , 
 " G328 varchar(2)" , 
 " G329 varchar(2)" , 
 " G411 varchar(2)" , 
 " G412 varchar(2)" , 
 " G413 varchar(2)" , 
 " G414 varchar(2)" , 
 " G415 varchar(2)" , 
 " G416 varchar(2)" , 
 " G417 varchar(2)" , 
 " G418 varchar(2)" , 
 " G419 varchar(2)" , 
 " G421 varchar(2)" , 
 " G422 varchar(2)" , 
 " G423 varchar(2)" , 
 " G424 varchar(2)" , 
 " G425 varchar(2)" , 
 " G426 varchar(2)" , 
 " G427 varchar(2)" , 
 " G428 varchar(2)" , 
 " G429 varchar(2)"
]
module.exports=create;    