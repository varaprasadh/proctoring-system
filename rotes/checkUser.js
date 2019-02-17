const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

Router.post('/checkUser',(req,res)=>{
    var reqData=req.body;
    var response={
        found:0
    }
    if(reqData.type=='admin'){
        var sql = `select email from adminData where admin_id='${reqData.userid}'`
        connection.query(sql, (err,result)=>{
            if(err)throw(err)
            //if atleast one email found
            if (result.length > 0 && result[0].email){
               console.log("atleast one shold be found");
               console.log(result);
               
                var email_ = result[0].email;
                console.log(email_);
                var key = Date.now();
                var row = { 
                    uid: reqData.userid,
                    type: reqData.type,
                    email: email_,
                    reset_key: String(key)
                }
                console.log(row);
                var sql = `select * from password_reset_pending where uid='${reqData.userid}'`
                connection.query(sql, (err, result) => {
                    if (err) throw (err);
                    var reset_sql;
                    console.log(result);
 
                    if (result[0]) {
                        console.log("update query fired");

                        reset_sql = `update password_reset_pending set ?`;
                    }
                    else {
                        console.log("insert query fored");

                        reset_sql = `insert into password_reset_pending set ?`;

                    }
                    connection.query(reset_sql, row, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        response = {
                            found: 1
                        }
                        res.json(response);
                        //send emailvalue to password reset applicant table 
                        //send an mail to that email with key   
                    });
                })
            }
            else{
                response={
                    found:0
                }
                res.json(response)
                console.log(result,"no member email found");
            }
        });
    }
    else{
        var sql = `select email from faculty where reg_no='${reqData.userid}'`
        connection.query(sql, (err, result) => { 
           if(result.length>0 && result[0].email){
               if (err) throw (err)
               var email_ = result[0].email;
               console.log(email_);
               var key = Date.now();
               var row = {
                   uid: reqData.userid,
                   type: reqData.type,
                   email: email_,
                   reset_key: String(key)
               }
              // console.log(row);
               var sql = `select * from password_reset_pending where uid='${reqData.userid}'`
               connection.query(sql, (err, result) => {
                   if (err) throw (err);
                   var reset_sql;
                   console.log(result);
                   if (!result.length>0) {
                       console.log("here is the cat");
                       reset_sql = `insert into password_reset_pending set ?`;
                   }
                   else {
                       console.log("update karo");
                       reset_sql = `update password_reset_pending set reset_key='${row.reset_key}' where uid='${row.uid}'`;
                   }
                   connection.query(reset_sql, row, (err, result) => {
                       if (err) throw err;
                       console.log(result);
                       response = {
                           found: 1
                       }
                       res.json(response);
                       //send emailvalue to password reset applicant table 
                       //send an mail to that email with key   
                   });
               })
           }
           else{
               res.json({
                   found:0
               })
           }
        });
    }  
})

module.exports = Router;