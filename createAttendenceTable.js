const connection=require('./dbconnection').connection;

var AttendenceTableColumns=[];

function createAttendenceTable() {
    var cols=[
        "August",
        "September",
        "October",
        "January",
        "February",
        "March",
        "FirstSemEnd",
        "SecondSemEnd"
    ]
    for(year=1;year<=4;year++){
        for(i=0;i<cols.length;i++){
            AttendenceTableColumns.push(year+cols[i]);
        }
    }
    AttendenceTableColumns = AttendenceTableColumns.map(col=>{
        return col.concat(" varchar(3)");
    })
 

    str=AttendenceTableColumns.join();
    var sql=`
       create table Attendence (
           regdNo varchar(20) primary key,
          ${str}
       )
    `;
    connection.query('use ost_project',(err,result)=>{
        if(err) throw err;
        connection.query(sql,(err,res)=>{
            if(err) throw err;
            console.log(res);
        })
    })
}
createAttendenceTable();

// module.exports=createAttendenceTable;