const tablefunctions=[
    require('./adminData'),
    require('./createAttendenceTable'),
    require('./createCGPATable'),
    require('./createFaculty'),
    require('./createStudentTable'),
    require('./createissueRemarksTable').createIssueTable,
    require('./createissueRemarksTable').createRemarksTable,
    require('./createsubGradeTable'),
    require('./facultyPasswords'),
    require('./facultyProfilePics'),
    require('./maptable'),
    require('./passwordResetPending'),
    require('./studentProfilepics'),
    require('./pendingFaculty')
];


function configure(){
       tablefunctions.forEach(fun => {
           fun();
       });
}
configure();
