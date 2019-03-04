const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

Router.get('/getFacultyInfo/:regdNo',(req,res)=>{
    var regdNo=req.params.regdNo;
    const sql=`select * from faculty where regdNo='${regdNo}'`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
       if(result && result[0]){
           res.json(result[0]);
       }
    })
})

module.exports=Router;