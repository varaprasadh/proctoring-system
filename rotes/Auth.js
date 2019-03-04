const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

Router.post('/signin',(req,res)=>{
  console.log(req.body);
  var reqData=req.body;
  if(reqData.type==='admin'){
    //search admin in database
    var sql =`select * from adminData where admin_id='${reqData.userid}'`;
    connection.query(sql,(err,result)=>{
      if(err) throw(err);
       var foundUser=result[0];
       //if found then send response back to the client
       if(foundUser && foundUser.password==reqData.password){
         console.log("login successfull");
          var response={
            status: 'found',
            type: reqData.type,
            redirectUri:"http://localhost:8080/",
            token:''
          }
          res.json(response);
          res.end();
       }
       else{
         var response={
           
           status:'notfound',
           type: reqData.type,
           redirectUri:''
         }
         res.json(response);
       }
    })
  }
  else{
    var sql = `select * from faculty_passwords where regdNo='${reqData.userid}'`
    connection.query(sql,(err,result)=>{
      if(err)throw(err);
      console.log(result);
      
      var foundUser=result[0];
      if(foundUser && foundUser.password===reqData.password){
        var response={
          status:'found',
          type: reqData.type,
          redirectUri:'http://localhost:8080/',
          token:''
        }
        res.json(response);
      }
      else{
        var response = {
          status: 'notfound',
          type: reqData.type,
          redirectUri: '',
          token: ''
        }
        res.json(response);
      }
    })
  }
});



module.exports=Router;