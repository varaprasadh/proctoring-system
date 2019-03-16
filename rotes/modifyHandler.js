const express = require("express");
const Router = express.Router();
const path = require("path");
const connection = require("../dbconnection").connection;

Router.get('/modify/:value', (req, res) => {
    var value = req.params.value;
    new Promise((resolve, reject) => {
        var sql = `select name,regdNo,department from faculty where name like '%${value}%' or regdNo like '%${value}%'`;
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err.sqlMessage);
                reject(err.sqlMessage);
            }
            console.log(result);
            resolve(result);
        })
    }).then(data => {
        res.json({
            data
        });
    }).catch(err => {
        console.log(err);
    })
});
Router.get('/modify/delete/:regdNo', (req, res) => {
    var regdNo = req.params.regdNo;
    var tables = ["faculty", "faculty_passwords", "faculty_profilepics"];
    var deletePending = [];
    tables.forEach(table => {
        var pending = new Promise((resolve, reject) => {
            var sql = `delete from ${table} where regdNo='${regdNo}'`;
            connection.query(sql, (err, result) => {
                if (err) reject(err.sqlMessage);
                resolve("success")
            })
        });
        deletePending.push(pending);
    });
    var mapTable = new Promise((resolve, reject) => {
        var sql = `update map_fac_to_student set f_regdNo= null where f_regdNo='${regdNo}'`;
        connection.query(sql, (err, result) => {
            if (err) reject(err.sqlMessage);
            resolve("success");
        })
    })
    Promise.all([...deletePending, mapTable]).then(logs => {
        res.json({
            status: "success"
        })
    }).catch(err => {
        res.json({
            status: "failed",
            reason: err
        })
    })
})


module.exports = Router;