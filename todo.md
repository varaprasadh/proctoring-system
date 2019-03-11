mark this codes as electives and ask faculty to enter manually 
  311 ,                                          
  325,411 - oe                                         
  ,414  pe-2 415 pe -3                                               
  421 pe-4 422 pe-5   mapcounter   pdf excell     
 
 <!-- delete unnecessary tables and queries
  -->
 **faculty side**
<!-- - facultyProfile/populate students -->
<!-- - facultyProfile/profilepage -->
- facultyProfile/profilepage/proctoringFrom- export to pdf;
<!-- - facultyProfile/profilepage/proctoringFrom/subject code; -->
<!-- - facultyProfile/profilepage/proctoringFrom-connect database -->
<!-- - facultyProfile/profilepage/proctoringFrom/issuetable/headingline; -->


**admin side**
   - it will have import more number of students by csv files;
   - can add a single student;
- modifypage
  - can delete a faculty;
  - can delete a student;
-  add student profile photo provision
**database**
 -   remove unneccessary subject code tables; 

- [ ]
- []






**studentdata database schema**

   create table students
     (
     regdNo varchar(20) primary key,
     name varchar(30) not null,
     year varchar(10) not null,
     section varchar(10) not null,
     department varchar(10) not null,
     fathername varchar(30),
     mobile varchar(20),
     email varchar(30),
     permenentAddress text,
     localAddress text);
**student profilepica**
 - regdNo varchar
 - filetype varchar
 - fileData blob

**grades database schema**
create table
    four_one_sub_codes
    ( regdNo varchar(20),
    sub1code varchar(10),
    sub2code varchar(10),
    sub3code varchar(10),
    sub4code varchar(10),
    sub5code varchar(10),
    sub6code varchar(10),
    sub7code varchar(10),
    sub8code varchar(10),
    sub9code varchar(10));


    create table
    four_one_sub_scores
     ( regdNo varchar(20) primary key,
     sub1score varchar(10),
     sub2score varchar(10),
     sub3score varchar(10),
     sub4score varchar(10),
     sub5score varchar(10),
     sub6score varchar(10),
     sub7score varchar(10),
     sub8score varchar(10),
     sub9score varchar(10),
     CGPA varchar(10)
     );

create table
    four_two_sub_codes
    ( regdNo varchar(20),
    sub1code varchar(10),
    sub2code varchar(10),
    sub3code varchar(10),
    sub4code varchar(10),
    sub5code varchar(10),
    sub6code varchar(10),
    sub7code varchar(10),
    sub8code varchar(10),
    sub9code varchar(10));


    create table
    four_two_sub_scores
     ( regdNo varchar(20) primary key,
     sub1score varchar(10),
     sub2score varchar(10),
     sub3score varchar(10),
     sub4score varchar(10),
     sub5score varchar(10),
     sub6score varchar(10),
     sub7score varchar(10),
     sub8score varchar(10),
     sub9score varchar(10),
     CGPA varchar(10)
     );

**student attendence yearwise schema**

  create table four_one_attendence
  (
     regdNo varchar(20) primary key,
     AugustEnd int(5),
     SeptemberEnd int(5),
     OctoberEnd int(5),
     SemisterEnd int(5)
  );
  create table four_two_attendence
  (
     regdNo varchar(20) primary key,
     JanuaryEnd int(5),
     FebruaryEnd int(5),
     MarchEnd int(5),
     SemisterEnd int(5)
  );


**student issues**

 - ambience isues
  - remarks
 - academic issues
  - remarks
  - **schema first year**
   create table one_one_one_issues_remarks
   (
      regdNo varchar(20) primary key,
      AcedemicIssues text,
      AcedmicRemarks text,
      AmbienceIssues text,
      AmbienceRemarks text
   );
   create table one_one_two_issues_remarks
   (
      regdNo varchar(20) primary key,
      AcedemicIssues text,
      AcedmicRemarks text,
      AmbienceIssues text,
      AmbienceRemarks text
   );
   create table one_two_one_issues_remarks
   (
      regdNo varchar(20) primary key,
      AcedemicIssues text,
      AcedmicRemarks text,
      AmbienceIssues text,
      AmbienceRemarks text
   );
   create table one_two_two_issues_remarks
   (
      regdNo varchar(20) primary key,
      AcedemicIssues text,
      AcedmicRemarks text,
      AmbienceIssues text,
      AmbienceRemarks text
   );


**CGPA TABLE**

create table CGPA
     (
     regdNo     varchar(20) primary key,
     one_one    varchar(4) ,
     one_two    varchar(4) ,
     two_one    varchar(4) ,
     two_two    varchar(4) ,
     three_one  varchar(4) ,
     three_two  varchar(4) , 
     four_one   varchar(4) , 
     four_two   varchar(4) 
     );    


