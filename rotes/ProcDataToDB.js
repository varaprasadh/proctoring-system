const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;


Router.post('/updateProcData', (req, res) => {
    var data = req.body;
    var regdNo = data.regdNo;
    var fac_regdNo = data.faculty;
    var attendence = data.Attendence;
    var gradesBody = data.grades;
    var IssueRemarksBody = data.IssueRemarks;
    var subGrades = gradesBody.gradeData;
    var electiveCodes = data.ElectiveCodes;
    var cgpa = gradesBody.CgpaData;
    var issues = IssueRemarksBody.Issues;
    var remarks = IssueRemarksBody.Remarks;
    console.log("incoming Request");
    // console.log(req.body);


    console.log("debug electives", electiveCodes);
    var _keys = Object.keys(issues);
    _keys.map(key => {
        code = key.substr(-3) + "IssueFaculty";
        issues[code] = fac_regdNo;
    });


    var Attendence_ = new Promise((resolve, reject) => {

        if (Object.entries(attendence).length) {
            sql = `update Attendence set ? where regdNo='${regdNo}'`
            connection.query(sql, attendence, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log("Attendence_done");

            })
        } else {
            resolve("success");
        }
    });
    var subjectGrades_ = new Promise((resolve, reject) => {
        if (Object.entries(subGrades).length) {
            sql = `update grades set ? where regdNo='${regdNo}'`;
            connection.query(sql, subGrades, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log("subjectGrades_done");
            })
        } else {
            resolve("success");
        }
    })
    var electives_=new Promise((resolve,reject)=>{
        if(Object.entries(electiveCodes).length){
            sql=`update electives set ? where regdNo='${regdNo}'`;
            connection.query(sql,electiveCodes,(err,result)=>{
                if(err){
                    reject(err.sqlMessage);
                }
                console.log("electiveSubject codes done");
                resolve("success");
            })
        }else{
            resolve("success");
        }
    })
    var cgpa_ = new Promise((resolve, reject) => {

        if (Object.entries(cgpa).length) {
            sql = `update cgpa set ? where regdNo='${regdNo}'`;
            connection.query(sql, cgpa, (err, result) => {
                if (err) {
                    reject(err.sqlMessage);
                }
                resolve("success")
                console.log("cgpa_done");
            })
        } else {
            resolve("success");
        }
    })

    var issues_ = new Promise((resolve, reject) => {
        if (Object.entries(issues).length) {
            sql = `update issues set ? where regdNo='${regdNo}'`;
            connection.query(sql, issues, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log("issues_done");
            })
        } else {
            resolve("success");
        }
    })
    var remarks_ = new Promise((resolve, reject) => {
        if (Object.entries(remarks).length) {
            sql = `update remarks set ? where regdNo='${regdNo}'`;
            connection.query(sql, remarks, (err, result) => {
                if (err) {
                    reject(new Error(err.msg));
                }
                resolve("success")
                console.log("remarks_done");
            })
        } else {
            resolve("success");
        }
    })
    Promise.all([Attendence_, subjectGrades_, electives_, cgpa_, issues_, remarks_])
        .then(logs => {
            console.log(logs);
            console.log("wilson debug");
            res.json({
                status: "success"
            })
        }).catch(err => {
            console.log("error", err);
            res.json({
                status: "failed"
            })
        });
})


module.exports = Router;

