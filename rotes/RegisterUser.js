const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

Router.post('/register/faculty', (req, res) => {
    var data = req.body;
    var facultyObject = {
        name: data.name,
        regdNo: data.regdNo,
        department: data.department,
        mobile: data.mobile,
        email: data.email
    }
    var passwordObject = {
        regdNo: data.regdNo,
        password: data.password
    }
    var base64String;
    var checkedFileType;
    if (data.fileData && data.fileType) {
        base64String = data.fileData.split(',')[1];
        checkedFileType = data.fileType;
    } else {
        base64String = null;
        checkedFileType = null;
    }

    var photoObject = {
        regdNo: data.regdNo,
        filetype: checkedFileType,
        fileData: base64String
    }
    var facultysql = "insert into faculty set ?";
    var passwordsql = "insert into faculty_passwords set ?";
    var picsql = "insert into faculty_profilepics set ?";
    //inset faculty
    connection.query(facultysql, facultyObject, (err, result) => {
        if (err) {
            res.json({
                status: "failed"
            })
        } else {
            //insert faculty passwords
            connection.query(passwordsql, passwordObject, (err, result) => {
                if (err) throw err;
                //insert faculty photos
                connection.query(picsql, photoObject, (err, result) => {
                    if (err) throw err;
                    //after insertion send response back to user
                    res.json({
                        status: "succeed"
                    });
                });
            })
        }
    })


});


module.exports = Router;