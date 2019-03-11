const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;

function parseResult(result, wrapper) {
    result.forEach(obj => {
        wrapper.data.push({
            name: obj.name,
            regdNo: obj.regdNo,
            department: obj.department,
            section:obj.section,
            year:obj.year
        });
    });
}

// Router.put('/map',(req,res)=>{
//     var body=req.body;
//     console.log(body);
//     var students = body.students;
//     var faculty=body.faculty;
//    //for each student assign that selected faculty;
//      var promises=[];
//      students.forEach(student=>{
//        var promise=new Promise((resolve,reject)=>{
//            var sql = `update map_fac_to_student set f_regdNo = '${faculty}' where s_regdNo = '${student}'`;
//            connection.query(sql, (err, result) => {
//                if (err) {
//                    reject(err.msg);
//                }
//                else{
//                    resolve("done");
//                }
//            });
//        });
//        promises.push(promise);
//     });
//     Promise.all(promises).then(logs=>{
//       res.json({
//           status:"success"
//       })
//     }).catch(err=>{
//         console.log(err);
//         res.json({
//             status:"failed"
//         })
//     })
      
// });

//returns the list of students under a faculty;
Router.get('/mapped/:id',(req,res)=>{
    var id=req.params.id;
    sql =`select * from students where regdNo in
              (select s_regdNo  from map_fac_to_student where f_regdNo='${id}')`;
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