const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;


Router.post('/updateProcData',(req,res)=>{
    var data=req.body;
    var regdNo=data.regdNo;
    var fac_regdNo=data.faculty;
    var attendence=data.Attendence;
    var gradesBody=data.grades;
    var IssueRemarksBody=data.IssueRemarks;
    var subGrades=gradesBody.gradeData;
    var cgpa=gradesBody.cgpaData;
    var issues=IssueRemarksBody.Issues;
    var remarks=IssueRemarksBody.Remarks;
    console.log("incoming Request");
    console.log(req.body);
    //to add issuefaculty to the issues
    //Issue412 | 412IssueFaculty     
    var _keys=Object.keys(issues);
    _keys.map(key=>{
        code=key.substr(-3)+"IssueFaculty";
        issues[code]=fac_regdNo;
    });
    

    var Attendence_=new Promise((resolve,reject)=>{

        if (Object.entries(attendence).length) {
            sql = `update Attendence set ? where regdNo='${regdNo}'`
            connection.query(sql, attendence, (err, result) => {
                if (err) {
                   reject(err.message);
                }
                resolve("success")
                console.log("Attendence_", result);

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
                console.log("subjectGrades_", result);
            })
        }
    })
    var cgpa_=new Promise((resolve,reject)=>{
        if(Object.entries(cgpa).length){
            sql = `update cgpa set ? where regdNo='${regdNo}'`;
            connection.query(sql,cgpa, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log("cgpa_",result);
            })
        }
    })
    
     
    var issues_=new Promise((resolve,reject)=>{
        if(Object.entries(issues).length){
            sql = `update issues set ? where regdNo='${regdNo}'`;
            connection.query(sql, issues, (err, result) => {
                if (err) {
                    reject(err.message);
                }
                resolve("success")
                console.log("issues_", result);
            })
           
        }
    })
    var remarks_=new Promise((resolve,reject)=>{
        if(Object.entries(remarks).length){
            sql = `update remarks set ? where regdNo='${regdNo}'`;
            connection.query(sql, remarks, (err, result) => {
                if (err) {
                    reject(new Error(err.msg));
                }
                resolve("success")
                console.log("remarks",result);
            })
        }
    })
    Promise.all([Attendence_, subjectGrades_, cgpa_, issues_, remarks_])
    .then(logs=>{
        res.end("success")
    }).catch(err=>{
        console.log(err);
        res.end("failed");
    });

    
})


module.exports=Router;