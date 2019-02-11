const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

function parseResult(result, wrapper) {
    result.forEach(obj => {
        wrapper.data.push({
            name: obj.name,
            reg_no: obj.reg_no,
            department: obj.department,
        });
    });
}
Router.get('/map/:body',(req,res)=>{
    // console.log(req.body);
    // console.log(req);
    var body=JSON.parse(req.params.body);
    console.log(body);
    var sql =`insert into map_fac_to_student set ?`;
    body.students.forEach(student=>{
        var values = {
            fac_id: body.faculty,
            student_id:student
        }
        connection.query(sql, values, (err, result) => {
            if (err) throw (err);
            console.log(result);
        })
    })
   
    res.end("hello");

    
});
Router.get('/mapped/:id',(req,res)=>{
    var id=req.params.id;
    sql =`select * from students where reg_no in
              (select student_id  from map_fac_to_student where fac_id='${id}')`;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        var resObj = {
          data: []
        };
        console.log(result);
        

        parseResult(result,resObj);
        res.json(resObj);
        res.end("");

    })
})
module.exports=Router;