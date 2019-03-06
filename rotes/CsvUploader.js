const express = require('express');
const Router = express.Router();
const path = require('path');
const connection = require('../dbconnection').connection;
const fs = require('fs');
const csv_parser = require('csv-parser');
const xls_parser = require('xls-parser'); //not used
const node_xlsx = require('node-xlsx');
const excelToJson = require('convert-excel-to-json'); //not used


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
    switch (ext) {
        case 'csv':
            tostream(fileData)
                .pipe(csv_parser()).on('data', (data) => {
                    console.log(data);
                })
                .on('end', () => {
                    console.log("the end")
                });
            break;
        case "xls":
        case "xlsx":

            var sheets = node_xlsx.parse(fileData); //return format is like [ { name: 'Sheet1', data: [ [Array], [Array] ] } ]
            var data = sheets[0].data;
            var header = data.shift();
            //now data contain values only;
            data.forEach(row => {
                    row.forEach(column => {
                        console.log(column, "|");
                    })
                    console.log("---------------")
                })
                // console.log(obj);
            break;
    }
    res.end();
})

module.exports = Router;