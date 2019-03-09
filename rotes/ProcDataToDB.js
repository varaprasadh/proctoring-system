const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;


Router.post('/updateProcData',(req,res)=>{
    var data=req.body;
    var regdNo=data.regdNo;
    var attendence=data.Attendence;
    var gradesBody=data.grades;
    var IssueRemarksBody=data.IssueRemarks;
    var subGrades=gradesBody.gradeData;
    var cgpa=gradesBody.cgpaData;
    var issues=IssueRemarksBody.Issues;
    var remarks=IssueRemarksBody.Remarks;

    var Attendence_=new Promise((resolve,reject)=>{

        if (Object.entries(attendence).length) {
            sql = `update Attendence set ? where regdNo='${regdNo}'`
            connection.query(sql, attendence, (err, result) => {
                if (err) {
                   reject(err.message);
                }
                resolve("success")
                console.log(result);

            })
        }
    });
    var subjectGrades_=new Promise((resolve,reject)=>{
        if(Object.entries(subGrades).length){
            sql = `update grades set ? where regdNo='${regdNo}'`;
            connection.query(sql, subGrades, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log(result);
            })
        }
    })
    var cgpa_=new Promise((resolve,reject)=>{
        if(Object.entries(subGrades).length){
            sql = `update cgpa set ? where regdNo='${regdNo}'`;
            connection.query(sql,cgpa, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log(result);
            })
        }
    })
    var issues_=new Promise((resolve,reject)=>{
        if(Object.entries(subGrades).length){
            sql = `update issues set ? where regdNo='${regdNo}'`;
            connection.query(sql, issues, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log(result);
            })
        }
    })
    var remarks_=new Promise((resolve,reject)=>{
        if(Object.entries(subGrades).length){
            sql = `update remarks set ? where regdNo='${regdNo}'`;
            connection.query(sql, remarks, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log(result);
            })
        }
    })
    Promise.all([Attendence_, subjectGrades_, cgpa_, issues_, remarks_])
    .then(logs=>{
        res.end(success)
    }).catch(err=>{
        res.end("faild");
    });

    
})


module.exports=Router;