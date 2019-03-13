const connection = require('./init');

function createIssueTable(){
    var cols=[];
    for(year=1;year<=4;year++){
        for(semister=1;semister<=2;semister++){
            for(session=1;session<=2;session++){
            cols.push(`Issue${year}${semister}${session} text`); //tostore issue
            cols.push(`${year}${semister}${session}IssueFaculty varchar(10)`); //tostore issue
            }
        }
    }
    console.log(cols);

        str=cols.join();
        sql=`create table issues (
            regdNo varchar(20) primary key,
            ${str}
        )`
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            console.log(result);
        })
    
}
function createRemarksTable(){
    var cols=[];
    for(year=1;year<=4;year++){
        for(semister=1;semister<=2;semister++){
            for(session=1;session<=2;session++){
            cols.push(`Remark${year}${semister}${session} text`); //tostore issue
            // cols.push(`${year}${semister}${session}IssueFaculty varchar(10)`); //tostore issue
            }
        }
    }
    console.log(cols);
        str=cols.join();
        sql=`create table Remarks (
            regdNo varchar(20) primary key,
            ${str}
        )`
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            console.log(result);
        })
    
}

module.exports = {
    createIssueTable,
    createRemarksTable
};