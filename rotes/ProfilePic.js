const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;


Router.get('/profilepic/faculty/:regdNo', (req, res) => {

        var regdNo = req.params.regdNo;
        var sql = `select file from faculty_profilepics where regdNo='${regdNo}'`;
        new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(new Error(err.sqlMessage));
                }
                console.log(result);
                if (result.length ) {
                    console.log(result);
                    resolve(result[0].file);
                } else {
                   reject("null")
                }
            })
        }).then(fileData => {
            res.json({
              dataUrl: fileData.toString()
            });
        }).catch(err=>{
            res.json({
                dataUrl:null
            })
        })
    })
    //need to test this out
Router.get('/profilepic/student/:regdNo', (req, res) => {

    var regdNo = req.params.regdNo;
    var sql = `select fileData from student_profilepics where regdNo='${regdNo}'`;
    new Promise((resolve, reject) => {
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err.sqlMessage);
            }
           if(result.length){
               console.log(result[0].fileData);
               resolve(result[0].fileData);
           }else{
               reject('null');
           }
        });
    }).then(datauri=>{
        res.json({
            datauri:datauri.toString()
        })
    }).catch(err=>{
        res.json({
            datauri:null
        })
    })
})

module.exports = Router;


/**
 *    if(err) throw err;
       if(result && (data.filetype != '' && data.filetype != undefined && data.filetype!=null)){
           console.log("filedata");
           var data = result[0];

           var base64String = data.fileData.toString();
           resObject={
               dataUrl:`data:${data.filetype};base64,${base64String}`
           }
           res.json(resObject);
       }
       else{
        res.json({
            dataUrl:null
        })

       }

    })
 */