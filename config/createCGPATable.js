const connection = require('./init');

function createCGPATable(){
    cols=[];

        for(year=1;year<=4;year++){
            for(semister=1;semister<=2;semister++){
              cols.push(`${year}${semister}CGPA varchar(2)`);
            }
        }
        str=cols.join();
        sql=`create table CGPA(
            regdNo varchar(20) primary key,
            ${str}
        )`
        connection.query(sql,(err,res)=>{
            if(err) throw err;
            console.log(res);
        })
}
module.exports=createCGPATable;