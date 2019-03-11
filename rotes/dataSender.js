const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;
// Router.get('/hello',(req,res)=>{
//     res.end("hellow");
// });
 
function parseResult(result,wrapper){
    result.forEach(obj => {
        wrapper.data.push({
            name: obj.name,
            regdNo: obj.regdNo,
            department: obj.department,
        });
    });
}
Router.get('/faculty/:name_or_id/:dep',(req,res)=>{
    var name_or_id=req.params.name_or_id;
    var dep=req.params.dep;
    console.log(name_or_id,dep);
    var sql = `select * from faculty where (name='${name_or_id}' or regdNO='${name_or_id}') or department='${dep}'  `
    connection.query(sql,(err,result)=>{
        if(err) console.log(err);
        console.log(result);

    
        var facultydata={
            data:[]
        };
        parseResult(result,facultydata);
        res.json(facultydata);
        res.end();
    });
});
Router.get('/student/:dep/:year',(req,res)=>{
    var dep=req.params.dep;
    var year=req.params.year;
    var sql=`select * from students where department='${dep}' and year=${year}`;
    connection.query(sql,(err,result)=>{
        console.log(err);
        console.log(result);
        var studentData={
            data:[]
        }
        parseResult(result,studentData);
        res.json(studentData);
        res.end();
    })
})
module.exports.Router=Router;