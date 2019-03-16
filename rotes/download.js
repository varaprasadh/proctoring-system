const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

Router.get('/download/:payload',(req,res)=>{
    var payload=JSON.parse(req.params.payload);
    console.log(payload);
    var department=payload.department;
    var section=payload.section;
    var year=payload.year;
     
    new Promise((resolve,reject)=>{
        var sql = `select * from students where department ='${department}' and section='${section}' and year= '${year}' order by regdNo`;
        connection.query(sql,(err,result)=>{
            if(err) {
                console.log(err.sqlMessage);
                reject(err.sqlMessage);
            }
            if(result.length){
                console.log(result);
                resolve(result)
            }else{
                reject("null")
            }
        })
    }).then(results=>{
        res.xls(`${department}_${year}_${section}.xlsx`,results);
    }).catch(err=>err);
}) 


module.exports=Router;