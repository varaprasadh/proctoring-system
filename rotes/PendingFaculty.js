const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

Router.post("/PendingFaculty",(req,res)=>{
    var data=req.body;
    var obj={
        regdNo:data.regdNo,
        name:data.name,
        department:data.department,
        mobile:data.mobile,
        email:data.email,
        file: (data.fileData==undefined)?null:data.fileData,
        password:data.password
    }
    console.log(obj);
    new Promise((resolve,reject)=>{
        sql=`insert into pendingfaculty set ?`;
        connection.query(sql,obj,(err,result)=>{
            if(err){
                reject(err.sqlMessage);
            }
            resolve("success")
        })
    }).then(status=>{
        res.json({status:status});
    }).catch(err=>{
        res.json({status:"failed",reason:err});
    })
});
Router.get("/pendingFaculty",(req,res)=>{
    new Promise((resolve,reject)=>{
        sql=`select * from pendingFaculty`;
        connection.query(sql,(err,result)=>{
            if(err){
                reject(err.sqlMessage);
            }
            else{
                console.log(result);
                if(result.length!=0){
                    result.forEach(_result=>{
                        _result.file = (_result.file != null) ? _result.file.toString():null;
                    })  
                }
                resolve(result);
            }
        })
    }).then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({data:null});
    })
})

Router.get("/pendingFaculty/accept/:regdNo",(req,res)=>{
    var regdNo=req.params.regdNo;
    sql = `select * from pendingfaculty where regdNo='${regdNo}'`;
    new Promise((resolve,reject)=>{
        connection.query(sql,(err,result)=>{
            if(err){
                console.log(err.sqlMessage);
                reject(err.sqlMessage);
            }
            console.log(result);
            resolve(result[0]);
        });
    }).then(result=>{
        //moveto facultyTable and delete in pending table;
        // console.log("debug",result);
      //wer
        var faculty_profilepic={
            regdNo:result.regdNo,
            file: (result.file != null) ? result.file : null
        }
        var facultyObj={
            regdNo:result.regdNo,
            name:result.name,
            department:result.department,
            email:result.email,
            mobile:result.mobile,
        }
        var fac_password={
            regdNo:result.regdNo,
            password:result.password
        }

            console.log("debug",faculty_profilepic);
        
        insert_faculty = new Promise((resolve, reject) => {
            fac_sql = `insert into faculty set ?`;
            connection.query(fac_sql, facultyObj, (err, result) => {
                if (err) { reject(err.sqlMessage) }
                resolve("faculty data inserted");
            })
        })
        insert_profilePic = new Promise((resolve, reject) => {
            var facpic_sql =`insert into faculty_profilepics set ?`
            connection.query(facpic_sql,faculty_profilepic,  (err, result) => {
                if (err) {
                    console.log(err);
                    reject("expecting " + err.sqlMessage)
                }
                resolve("faculty picture inserted");
            })
        })
        insert_password = new Promise((resolve, reject) => {
            pass_sql = `insert into faculty_passwords set ?`;
            connection.query(pass_sql, fac_password, (err, result) => {
                if (err) { reject(err.sqlMessage) }
                resolve("faculty password inserted");
            })
        })
new Promise((resolve,reject)=>{
            deleteSql=`delete from pendingfaculty where regdNo='${regdNo}'`;
            connection.query(deleteSql,(err,result)=>{
                if(err){
                    reject(err.sqlMessage);
                }
                resolve("deleted");
            })
        });
       deletePromise=new Promise((resolve,reject)=>{
            deleteSql=`delete from pendingfaculty where regdNo='${regdNo}'`;
            connection.query(deleteSql,(err,result)=>{
                if(err){
                    reject(err.sqlMessage);
                }
                resolve("deleted");
            })
        });
   
        Promise.all([
          insert_faculty,
          insert_profilePic,
          insert_password,
          deletePromise])
          .then(logs => {
            logs.forEach(log => console.log(log));
            res.json({
              status: "success"
            });
          })
          .catch(err => {
            res.json({
              status: "failed",
              reason: err
            });
          });
 
    }).catch(err=>{
        res.json({err:"maybe"})
    })
});

Router.get("/pendingFaculty/reject/:regdNo", (req, res)=>{
    var regdNo=req.params.regdNo;
    new Promise((resolve,reject)=>{
            deleteSql=`delete from pendingfaculty where regdNo='${regdNo}'`;
            connection.query(deleteSql,(err,result)=>{
                if(err){
                    reject(err.sqlMessage);
                }
                resolve("deleted");
            })
        }).then(statusMsg=>{
            res.json({
              status: "success"
            });
        }).catch(err=>{
            res.json({
                status:"failed",
                reason:err
            })
        })

})









/**
 * name: 'varaprasadh alajangi',
  mobile: '8106492369',
  email: 'varaprasadh.a@gmail.com',
  regdNo: 'anit123',
  password: 'anit123@',
  department: 'cse',
  fileType: 'image/png',
  fileData:
 * 
| regdNo     | varchar(10) | NO   | PRI | NULL    |       |
| name       | varchar(30) | YES  |     | NULL    |       |
| department | varchar(10) | YES  |     | NULL    |       |
| mobile     | varchar(10) | YES  |     | NULL    |       |
| email      | varchar(30) | YES  |     | NULL    |       |
| file       | blob        | YES  |     | NULL    |       |
| password   | varchar(20) | YES  |     | NULL    |       |
+------------+-------------+------+-----+---------+-------+

 */
module.exports=Router;