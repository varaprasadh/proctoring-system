const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

function JsonHandler(sql, res) {
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(new Error("cant fetch attendence"));
            }
            else {
                // console.log(result);
                resolve(result[0])
            }
        });
    }).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => err);

}
Router.get('/Student/:regdNo',(req,res)=>{
    var regdNo=req.params.regdNo;
    sql=`select * from students where regdNo=${regdNo}`;
    JsonHandler(sql,res);
})

module.exports=Router;