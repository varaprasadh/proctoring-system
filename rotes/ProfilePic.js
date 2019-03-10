const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;


Router.get('/profilepic/faculty/:regdNo',(req,res)=>{

    var regdNo=req.params.regdNo;
    var sql =`select file from faculty_profilepics where regdNo='${regdNo}'`;
    new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject(new Error(err.sqlMessage));
            }
           if(result.length){
               console.log(result);
               
               resolve(result[0].file.toString());
           }
           else{
               resolve('');
           }
        })
    }).then(fileData=>{
        res.json({
            dataUrl:fileData
        })
    })
})
//need to test this out
Router.get('/profilepic/student/:regdNo',(req,res)=>{

    var regdNo=req.params.regdNo;
    var sql =`select fileData from student_profilepics where regdNo='${regdNo}'`;
    new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                reject("something went wrong");
            }
            else{
                console.log(result); //[] or [{null,null}]
                if(result[0] != undefined && result[0].filetype!=null && result[0].filetype!=null ){
                    var base64String = data.fileData.toString();
                    resObject = {
                        dataUrl: `data:${data.filetype};base64,${base64String}`
                    }
                    resolve(resObject);
                }
                else{
                    reject("somethin error with photo");
                }
               
            }
        })
    }).then(obj=>{
        res.json(resObject);
    }).catch(err=>{
        res.json({ })
    });
})

module.exports=Router;


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