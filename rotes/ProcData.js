const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

// Router.get('/ProcData/:regdNo',(req,res)=>{
  
// })

function JsonHandler(sql,res){
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(new Error("cant fetch attendence"));
            }
            else {

                if(result && result[0]!=undefined){
                    resolve(result[0]);
                }
                else{
                    resolve({data:null});
                }
            }
        });
    }).then(data => {
        console.log(data);
        res.json(data);
    }).catch(err => err);

}
Router.get('/ProcData/Attendence/:regdNo',(req,res)=>{
    var regdNo = req.params.regdNo;
    sql = `select * from attendence where regdNo=${regdNo}`;
    JsonHandler(sql,res);
})
Router.get('/ProcData/Grades/:regdNo',(req,res)=>{
    var regdNo = req.params.regdNo;
    var sql=`select * from grades where regdNo=${regdNo}`;
    JsonHandler(sql, res);
})
Router.get('/ProcData/CGPA/:regdNo',(req,res)=>{
    var regdNo = req.params.regdNo;
    var sql=`select * from cgpa where regdNo=${regdNo}`;
    JsonHandler(sql,res);
})
Router.get('/ProcData/Remarks/:year/:regdNo',(req,res)=>{
    var regdNo = req.params.regdNo;
    var year=req.params.year;
    var colstr = `Remark${year}11, Remark${year}12,Remark${year}21, Remark${year}22`;
    var sql=`select ${colstr} from remarks where regdNo=${regdNo}`;
    JsonHandler(sql,res)
})

Router.get('/ProcData/Issues/:year/:regdNo',(req,res)=>{
    var regdNo = req.params.regdNo;
    var year = req.params.year;
    var colstr = `Issue${year}11, Issue${year}12,Issue${year}21, Issue${year}22`;
    var Procstr = `Issue${year}11, Issue${year}12,Issue${year}21, Issue${year}22`;
    var sql=`select ${colstr,Procstr} from Issues where regdNo=${regdNo}`;
    JsonHandler(sql,res);
});

/**
 * +-----------+-------------+------+-----+---------+-------+
| regdNo    | varchar(20) | NO   | PRI | NULL    |       |
| Remark111 | text        | YES  |     | NULL    |       |
| Remark112 | text        | YES  |     | NULL    |       |
| Remark121 | text        | YES  |     | NULL    |       |
| Remark122 | text        | YES  |     | NULL    |       |
| Remark211 | text        | YES  |     | NULL    |       |
| Remark212 | text        | YES  |     | NULL    |       |
| Remark221 | text        | YES  |     | NULL    |       |
| Remark222 | text        | YES  |     | NULL    |       |
| Remark311 | text        | YES  |     | NULL    |       |
| Remark312 | text        | YES  |     | NULL    |       |
| Remark321 | text        | YES  |     | NULL    |       |
| Remark322 | text        | YES  |     | NULL    |       |
| Remark411 | text        | YES  |     | NULL    |       |
| Remark412 | text        | YES  |     | NULL    |       |
| Remark421 | text        | YES  |     | NULL    |       |
| Remark422 | text        | YES  |     | NULL    |       |
 * 
 * 
 *
 */

module.exports=Router;