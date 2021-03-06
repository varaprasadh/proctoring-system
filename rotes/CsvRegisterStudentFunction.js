const connection = require('../dbconnection').connection;
const TableConfig = require('../studentTables'); //tableConfiglist

function AddStudent(data, res) {
    //add this to students table;
    var studentobj = {
        regdNo: data.regdNo,
        name: data.name,
        year: data.year,
        section: data.section,
        department: data.department,
        fathername: data.fathername,
        mobile: data.mobile,
        email: data.email,
        localAddress: data.address
    };
    //add this to map table
    var map_init_obj = {
        s_regdNo: data.regdNo
    };
    //add this to init_tables
    var init_obj = {
        regdNo: data.regdNo
    }
    //insert into students table;
    var addedtoStudentTable = new Promise((resolve, reject) => {
        var sql = `insert into ${TableConfig.legacy_table} set ?`;
        connection.query(sql, studentobj, async (err, result) => {
            if (err) {
                //if error send response and then return;
                console.log(err);
                reject(new Error(err.msg))
            } else {
                resolve({
                    status: "success"
                })
            }
        });
    });
    //initialize map table;

    var added_to_map_table = new Promise((resolve, reject) => {
        var map_init_sql = `insert into ${TableConfig.map_table} set ?`;
        connection.query(map_init_sql, map_init_obj, (err, result) => {
            if (err) {
                console.log(err);
                reject(new Error(err.msg));
            } else {
                resolve('added to map table');
            }
        })
    })
    //initialize all student tables

    var Added_to_tables_to_init = new Promise((resolve, reject) => {
        tablesPromises = [];
        TableConfig.tables_to_init.forEach((table, index) => {
            added_to_table = new Promise((_resolve, _reject) => {
                console.log(table, index);
                var sql = `insert into ${table} set ?`
                connection.query(sql, init_obj, (err, result) => {
                    if (err) {
                        console.log(err);
                        _reject(new Error("something wrong with table:" + table));
                        // console.log(err.sqlMessage);

                    } else {
                        _resolve("added to table:" + table);
                    }
                });
            });
            tablesPromises.push(added_to_table);
        });
        Promise.all(tablesPromises).then(logdata => {
            resolve("added to all tables");
            logdata.forEach(log => {
                console.log(log);
            })
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });

    addedtoStudentTable.then(next => {
        var Added_to_all_studentTables = Promise.all([added_to_map_table, Added_to_tables_to_init]);
        Added_to_all_studentTables
            .then(msgs => {
                // msgs.forEach(msg=>{console.log(msg);
                console.log("added student");
                
            })
            .catch(err => {
                console.log(err);
                removeLastEntry(studentobj.regdNo);
                })
    }).catch(err => err);
}

function removeLastEntry(regdNo) {
    //all student tables
    console.log("something went wrong")

    var sql = `delete from ${TableConfig.map_table} where s_regdNo='${regdNo}'`;
    connection.query(sql, (err, result) => {
        if (err) console.log("<<", TableConfig.map_table, err.message, ">>\n");
        console.log("removed from map_fac_to_student");
    });

    var allTables = [...TableConfig.tables_to_init, TableConfig.legacy_table];
    allTables.forEach(table => {
        var sql = `delete from ${table} where regdNo='${regdNo}'`;
        connection.query(sql, (err, result) => {
            if (err) console.log("<<", table, err.message, ">>\n");
            console.log("removed from", table);
        })
    })
}

function clearTables() {
    //all student tables
    var allTables = [...TableConfig.tables_to_init, TableConfig.map_table, TableConfig.legacy_table];
    allTables.forEach(table => {
        var sql = `delete from ${table}`
        connection.query(sql, (err, result) => {
            if (err) console.log("<<", table, err.message, ">>\n");
            console.log("deleted from", table);
        })
    })
}
module.exports.AddStudent = AddStudent;