const express=require('express');
const Router=express.Router();
const path=require('path');
const connection = require('../../dbconnection').connection;
// const crypto=require('crypto');

Router.get('/',(req,res)=>{
    res.send(path.join(__dirname,"public","index.html"));
    res.end();
    console.log('connected');
    
    //console.log(connection);
})
//to add a student
Router.get('/add/student/:reg_id/:name/:dep/:year',(req,res)=>{
    var reg_id=Number(req.params.reg_id);
    var name=String(req.params.name);
    var dep=String(req.params.dep);
    var year=Number(req.params.year);
    console.log(reg_id,name,dep,year);
    var student={reg_no:reg_id,name:name,department:dep,year:year};
    var sql ="insert into students set ?";
    
    var values=[name,reg_id,dep,year];
   
       connection.query(`select * from students where reg_no = ${reg_id}`,(err,result)=>{
           if (err) throw err;
          if(result.length==0) {
               connection.query(sql, student, (err, result) => {
                   if (err) throw err;
                   console.log(result);
                   res.status(200);
                   res.json({
                       status: 'success',
                       who: 'student'
                   }).end();
             });
       }
       else{
              res.status(200);
              res.json({
                  status: 'failed',
                  who: 'student'
              }).end();
       }
    });        
   });

   // to add a faculty
Router.get('/add/faculty/:reg_id/:name/:dep/:exp', (req, res) => {
    var reg_id = req.params.reg_id;
    var name = req.params.name;
    var dep = req.params.dep;
    var exp = Number(req.params.exp);
    console.log(reg_id, name, dep, exp);
    var sql = "insert into faculty set ?";
    var faculty= { reg_no: reg_id, name: name, department: dep, experience:exp };
    connection.query(
      `select * from faculty where reg_no = '${reg_id}'`,
      (err, result) => {
        if (err) console.log(err);
        console.log(result.length);
        if (!result.length) {
            connection.query(sql, faculty, (err, result) => {
                if (err) throw err;
                // console.log(res);
                console.log('\nadded the uniqueone'); 
                var passwordquery=`insert into faculty_passwords set ?`;
                // var md5=crypto.createHash('md5');
                // md5.update('faculty101');
                // var password=md5.digest().toString();
                let buffer=new Buffer('faculty101');
                var password=buffer.toString('base64');
                console.log("password is ",password);
                var password_row={
                    fac_id:reg_id,
                    password:password
                }
                connection.query(passwordquery,password_row,(err,res)=>{
                    if(err) console.log(err);
                    console.log('password has been set');
                    
                    
                })
                res.status(200);
               res.json({
                   status:'success',
                   who:'faculty'
               }).end();
               
            })
        }
        else{
            res.status(200);
            res.json({
                status:'failed',
                who:'faculty'
            }).end();
            console.log('duplicates');
           // res.redirect('http://google.com');
        }
      }
    );
   
   
});
//




Router.get('/users/faculty',(req,res)=>{
    var body=JSON.parse(req.body);
})
Router.get('/debug',(req,res)=>{
    res.writeHead(200, {
        name: "bean",
        img:'kds.sf.com'
    });
    res.write(',dfjskfsdskjnslkfj')
    res.end();
});
 module.exports=Router;