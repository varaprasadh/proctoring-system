const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

//aux can be id or name
Router.get('/getfaculty/either/:aux', (req, res) => {
    var aux_value = req.params.aux;
    var sql = `select name,regdNo from faculty where name = '${aux_value}' or regdNo='${aux_value}'`;
    new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(new Error(err.sqlMessage));
                }
                console.log(result);
                resolve(result); //result returns array of objs
            })
        }).then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(500, "i dont know");
        });

})
Router.get('/getfaculty/department/:dep', (req, res) => {
    var dep = req.params.dep;
    var sql = `select name,regdNo from faculty where department='${dep}'`;
    new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(new Error(err.sqlMessage));
            }
            console.log(result);
            resolve(result);
        })
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(500, "i still dont know");
    })
})
Router.get("/getfaculty/both/:aux/:dep", (req, res) => {
    var dep = req.params.dep;
    var aux = req.params.aux;
    var sql = `select name,regdNo from faculty where ( name='${aux}' or regdNo='${aux}') and department='${dep}'`;
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
        res.json(500, 'i still dont have');
    })
});

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
    var sql = `select ${cols} from students`;
    console.log(sql);
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