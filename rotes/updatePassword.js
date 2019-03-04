const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

Router.put('/updatePassword',(req,res)=>{
    var reqData=req.body;
    //check whether the entered oldpassword is correct or not!!
    // 
    var sql = `select password from faculty_passwords where regdNo = '${reqData.regdNo}'`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result); 
        if(result && result[0]!=undefined){
            var result=result[0];
            //check if oldpassword is equals to new password;
            if(result.password==reqData.oldpassword){
                //update table with new password;
                console.log("password matched...");
                
                var updateSql=`update faculty_passwords set password= ? where regdNo= ? `;
                connection.query(updateSql,[reqData.newpassword,reqData.regdNo],(err,result)=>{
                    if(err) throw err;
                    console.log(result);
                    console.log("password updated");
                    res.json({
                        error:"nothing",
                        status:"updated"
                    });
                })
            }
            else{
                //password is not matching
                res.json({
                  error:"missmatch",
                  status:"failed"
                })
            }
        }
       
        //there is no user registered with redgNo
        else{
          res.json({
              error:"something",
              status:"failed"
          })
        }
    })
})

module.exports=Router;