const _tables = [ 
"attendence"  ,            
"cgpa"         ,              
"grades"        ,             
"issues"         ,                  
"remarks"            ,        
"student_profilepics"            
];


module.exports = {
    legacy_table: "students".trim(),
    map_table: "map_fac_to_student".trim(),
    tables_to_init: [..._tables.map(table => table.trim())]
}

/*
  admindata              |
| attendence             |
| cgpa                   |
| faculty                |
| faculty_passwords      |
| faculty_profilepics    |
| grades                 |
| issues                 |
| map_fac_to_student     |
| password_reset_pending |
| remarks                |
| student_profilepics    |
| students               |
 */
