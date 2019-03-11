const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

//aux can be id or name

Router.get('/getfaculty/:payload', (req, res) => {
    var payload = JSON.parse(req.params.payload);
    var aux = payload.aux;
    var department = payload.department;
    console.log(payload);
    var sql = null;
    var cols = `name,regdNo`;
    if (aux != '') {
        sql = `select ${cols} from faculty where (name like '%${aux}%' or regdNo='${aux}')`;
    } else if (aux == '') {
        sql = `select ${cols} from faculty where department='${department}'`;
    } else {
        sql = `select ${cols} from faculty where (name like '%${aux}%' or regdNo='${aux}') and department=${department}`
    }
    new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {

                    console.log(err.sqlMessage);

                    reject(new Error(err.sqlMessage));
                }
                console.log(result);
                resolve(result); //result returns array of objs
            })
        }).then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        });
})

///--------------------------returns mapped students-----------

Router.get('/getmappedStudents/:f_regdNo', (req, res) => {
    var fac_regdNo = req.params.f_regdNo;
    console.log(fac_regdNo);

    var studensNo_s = `select s_regdNo from map_fac_to_student where f_regdNo = '${fac_regdNo}'`;
    var sql = `select regdNo,name,year,section,department from students where regdNo in ( ${studensNo_s})`;
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            console.log(result);
            resolve(result);
        })
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.json(500, "i dont wanna send data");
    })
});

//----unmaps a student from a faculty

Router.get('/unmap/:fac_id/:std_id', (req, res) => {
    var f_regdNo = req.params.fac_id;
    var s_regdNo = req.params.std_id;
    var sql = `update map_fac_to_student set f_regdNo=null where s_regdNo='${s_regdNo}'`;
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve("done");
        })
    }).then(status => {
        console.log("unmapped", f_regdNo, s_regdNo);
        res.json({
            status
        })
    }).catch(err => {
        res.json({
            status: "failed",
            reason: err
        })
    })
});

//---maps a student to the faculty

Router.get('/map/:f_regdNo/:s_regdNo', (req, res) => {
    var f_regdNo = req.params.f_regdNo;
    var s_regdNo = req.params.s_regdNo;
    var sql = `update map_fac_to_student set f_regdNo='${f_regdNo}' where s_regdNo='${s_regdNo}'`;
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            resolve("done");
        })
    }).then(status => {
        res.json({
            status: status
        })
    }).catch(err => {
        res.json({
            status: "failed",
            reason: err
        })
    })
})

//---returns list of students ----

Router.get("/getStudents/:payload", (req, res) => {
    var payload = JSON.parse(req.params.payload);
    console.log(payload);
    aux = payload.aux;
    department = payload.department;
    section = payload.section;

    var cols = `regdNo,name,year,section,department`;
    // var sql=`select ${cols} from students where name = '${aux}' or regdNo='${aux}' or (department='${department}' and section='${section}')
    //   where regdNo in (select s_regdNo from map_fac_to_student where f_regdNo=null)`;
    var sql = null;
    if (aux.trim() != '') {
        //only search with aux
        sql = `select ${cols} from students where regdNo in 
        (
            select regdNo from students where ( name like '%${aux}%' or regdNo='${aux}') 
            and regdNo in (
                select s_regdNo from map_fac_to_student where f_regdNo is null
            )
        )`;
        console.log(sql);
    } else if (aux.trim() == '') {
        //search with department and section
        sql = `select ${cols} from students where regdNo in 
        (
            select regdNo from students where ( department='${department}' and section ='${section}') 
            and regdNo in (
                select s_regdNo from map_fac_to_student where f_regdNo is null
            )
        )`;
    } else {
        sql = `select ${cols} from students where regdNo in 
        (
            select regdNo from students where ( ( name like '%${aux}%' or regdNo='${aux}') and department='${department}' and section ='${section}') 
            and regdNo in (
                select s_regdNo from map_fac_to_student where f_regdNo is null
            )
        )`;
    }

    new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(new Error(err.sqlMessage));
                }
                console.log("result", result);
                resolve(result);
            })
        }).then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })

});

module.exports = Router;