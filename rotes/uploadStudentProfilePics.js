const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;


Router.post("/uploadStudentPics",(req,res)=>{
   console.log(req.body);
    var files=req.body.files;
    console.log(files);
   console.log(files[0]);
  
    

    res.end("Ok");
});

module.exports=Router;