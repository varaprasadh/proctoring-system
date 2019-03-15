const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

Router.get('/modify/:value',(req,res)=>{
    var value=req.params.value;
    new Promise((resolve,reject)=>{
        var sql=`select name,regdNo,department from faculty where name like '%${value}% or regdNo like '%${value}%'`;
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err.sqlMessage);
                reject(err.sqlMessage);
            }
            console.log(result);
            resolve(result);
            
        })
    })
})


module.exports=Router;
