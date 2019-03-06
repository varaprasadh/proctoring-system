const express = require('express');
const Router = express.Router();
const connection = require('../dbconnection').connection;
const AddStudent = require('./RegisterStudentFunction').AddStudent;
Router.post('/register/student', (req, res) => {
    //console.log(req.body);
    const reqData = req.body;
    AddStudent(reqData, res);
});

module.exports = Router;