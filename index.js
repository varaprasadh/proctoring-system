const express=require('express');
const mysql=require('mysql');
const app=express();
const path=require('path');
const cors=require('cors');
const bodyParser=require('body-parser');
const express_fileupload=require('express-fileupload');
//data
const Tables=require('./studentTables');

//i defined 
const Auth=require('./rotes/Auth');
// const getRouter=require('./rotes/getroutes');
const dataSender=require('./rotes/dataSender').Router;
const mapHandler=require('./rotes/mapHandler');
const checkUser=require('./rotes/checkUser');
const RegisterUser=require('./rotes/RegisterUser');
const ProfilePic=require('./rotes/ProfilePic');
const updatePassword=require('./rotes/updatePassword');
const FacultyInfo=require('./rotes/FacultyInfo');
const CsvUploader=require('./rotes/CsvUploader');
const RegisterStudent=require('./rotes/RegisterStudent');
const ProcData=require('./rotes/ProcData');
const StudentDataSender=require('./rotes/studentDataSender');
const ProcDataToDB=require('./rotes/ProcDataToDB');
const PendingFaculty=require('./rotes/PendingFaculty');
const MappingSupporter=require('./rotes/MappingSupporter');
const uploadStudentProfilePics=require('./rotes/uploadStudentProfilePics');

const port=process.env.port||9999;
app.use(cors());
// app.use(body_parser.urlencoded({extended:true}));
// app.use(body_parser.json());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))

app.use(express.static(path.join(__dirname,'public')));
app.use(express_fileupload());
//uselessRoutes
// app.use(getRouter);


app.use(Auth); //actual authentication checkes id and password and returns status
app.use(checkUser); //email verification link thing
// app.use(dataSender); //servers data for the mapping 
app.use(mapHandler); //puts the mapped data; 
app.use(RegisterUser); //faculty registration
app.use(ProfilePic); //servers profilepics
app.use(updatePassword); //password update 
app.use(FacultyInfo); //servers the faculty information
app.use(CsvUploader);
app.use(RegisterStudent);
app.use(ProcData);
app.use(StudentDataSender);
app.use(ProcDataToDB);
app.use(PendingFaculty);
app.use(MappingSupporter); //useful when mapping major use
app.use(uploadStudentProfilePics);
app.use(express.static('public'));



app.listen(port, "localhost",() => {
  console.log("listening at port: " + port);
});


