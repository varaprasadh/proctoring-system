const connection = require("./init");


var ar = [311, 325, 411, 414, 415, 421, 422, 424];
var cols = ar.map(num => "G" + String(num).concat(" varchar(10)"));

var str = cols.join();

function createElectiveTable() {
    var sql = `create table electives ( 
    regdNo varchar(20) primary key,
    ${str} )`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("done", result);
    })
}
module.exports = createElectiveTable;