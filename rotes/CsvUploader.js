const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

Router.post('/csvfiles',(req,res)=>{
    console.log(req.body);
    res.end();
})

module.exports=Router;
