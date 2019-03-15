const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;
const Datauri = require('datauri');
const datauri = new Datauri();
//need to fix this issues
Router.post("/uploadStudentPics", (req, res) => {

    var photos = req.files.file;
    //  console.log(photos);
    if (photos.length != undefined) {
        var PendingUploads = [];
        photos.forEach(photo => {
            PendingUploads.push(processPicture(photo));
        })
        Promise.all(PendingUploads).then(logs => {
            res.json({
                status: "success",
                log: logs
            })
        }).catch(err => {
            res.json({
                status: "failed",
                log: err
            })
        })

    } else {
        processPicture(photos).then(log => {
            res.json({
                status: "success",
                log: log
            });
        }).catch(err => {
            res.json({
                status: "error",
                log: err
            })
        })
    }
});

function processPicture(photo) {
    return new Promise((resolve, reject) => {
        var photoname = photo.name;
        var data = photo.data;
        var regdNo = photoname.substr(0, photoname.lastIndexOf('.'));
        console.log(regdNo);
        var mimetype = photo.mimetype;
        var encoding = 'base64';
        var bufferData = new Buffer(data).toString('base64');
        var datauri = `data:${mimetype};${encoding},${bufferData}`;
        //   console.log(datauri);
        var sql = `update student_profilepics set fileData='${datauri}' where regdNo='${regdNo}'`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                reject(err.sqlMessage);
            }
            resolve("success");
        })
    })
}
module.exports = Router;