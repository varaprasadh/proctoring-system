const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;
const fs = require('fs');
const csv_parser = require('csv-parser');
const xls_parser = require('xls-parser'); //not used
const node_xlsx = require('node-xlsx');
const excelToJson = require('convert-excel-to-json'); //not used
const RegisterStudentFunction = require('./CsvRegisterStudentFunction').AddStudent;

// const xlsx_parser=require('')

const streamifier = require('streamifier');
const tostream = require('buffer-to-stream');


Router.post('/csvfiles', (req, res) => {
    console.log(req.body);
    console.log(req.files);
    var fileObj = req.files.file;
    var filename = fileObj.name;
    var fileData = fileObj.data;
    var ext = filename.substring(filename.lastIndexOf('.') + 1);

    console.log(filename, ext, fileData);
    //based on filetype take pasrser pasrse results;
    //and then upload to database
    var students = [];
    switch (ext) {
        case 'csv':
            tostream(fileData)
                .pipe(csv_parser()).on('data', (data) => {
                    students.push(data);
                })
                .on('end', () => {
                    processStudents(students, res);
                    console.log("the end")
                });
            break;
        case "xls":
        case "xlsx":

            var sheets = node_xlsx.parse(fileData); //return format is like [ { name: 'Sheet1', data: [ [Array], [Array] ] } ]
            var data = sheets[0].data;
            var header = data.shift();
            header = header.map(field => field.trim());

            //now data contain values only;
            console.log(header);
            var finalStudents = [];
            data.forEach(row => {
                var obj = {};
                row = row.map(column => String(column).trim());
                console.log(row);

                for (let i = 0; i < row.length; i++) {
                    obj[header[i]] = row[i];
                }
                console.log("student", obj);
                finalStudents.push(obj);
            })
            finalStudents.forEach(student => {
                if (!studenPresent(student.regdNo)) {
                    RegisterStudentFunction(student, res);
                }
            })
            break;
    }
    res.end();
})

function processStudents(students, res) {
    var finalStudents = [];
    students.forEach(student => {
        var keys = Object.keys(student);
        var values = Object.values(student);
        var mode_keys = keys.map(key => key.trim());
        var mode_values = values.map(value => value.trim());
        console.log(mode_keys);
        console.log(mode_values);
        var obj = {}
        for (let i = 0; i < keys.length; i++) {
            obj[mode_keys[i]] = mode_values[i];
        }
        finalStudents.push(obj);
    })
    console.log("debugger", finalStudents);
    finalStudents.forEach(student => {
        if (!studenPresent(student.regdNo)) {
            RegisterStudentFunction(student, res);
        } else {
            console.log("student might be therre already");
        }
    })
}

function studenPresent(regdNo) {
    new Promise((resolve, reject) => {
        var sql = `select regdNo from students where regdNo='${regdNo}'`;
        connection.query(sql, (err, result) => {
            if (err) {
                reject("error");
            }
            if (result.length) {
                resolve("found");
            } else {
                reject("error");
            }
        })
    }).then(log => {
        return true;
    }).catch(err => {
        return false;
    })
}

module.exports = Router;