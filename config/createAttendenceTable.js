const connection = require('./init');

var AttendenceTableColumns=[];

function createAttendenceTable() {
    var cols = [
      "August",
      "September",
      "October",
      "January",
      "February",
      "March",
      "FirstSemEnd",
      "SecondSemEnd"
    ];
    for(year=1;year<=4;year++){
        for(i=0;i<cols.length;i++){
            AttendenceTableColumns.push(year + '' + cols[i] +" varchar(3)");
        }
    }
    
    var str=AttendenceTableColumns.join();
 

    str=AttendenceTableColumns.join();
    var sql=`
       create table Attendence (
           regdNo varchar(20) primary key,
          ${str}
       )
    `;

        connection.query(sql,(err,res)=>{
            if(err) throw err;
            console.log(res);
        })
}

module.exports=createAttendenceTable;