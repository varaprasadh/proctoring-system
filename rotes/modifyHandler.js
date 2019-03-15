const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

Router.get('/modify/:value',(req,res)=>{
    var value=req.params.value;
    
})


module.exports=Router;
