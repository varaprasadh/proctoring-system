const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;


Router.get('/profilepic/faculty/:regdNo',(req,res)=>{

    var regdNo=req.params.regdNo;
    var sql =`select filetype,fileData from faculty_profilepics where regdNo='${regdNo}'`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        var data=result[0];
       if(result && (data.filetype != '' && data.filetype != undefined && data.filetype!=null)){
           console.log("filedata");
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
})

module.exports=Router;