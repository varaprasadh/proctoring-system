const express=require('express');
const mysql=require('mysql');
const app=express();
const path=require('path');
const cors=require('cors');
const body_parser=require('body-parser');

const getRouter=require('./rotes/getroutes');
const dataSender=require('./rotes/dataSender').Router;
const mapHandler=require('./rotes/mapHandler');
const port=process.env.port||9999;
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(getRouter);
app.use(dataSender);
app.use(mapHandler);
app.listen(port, "localhost",() => {
  console.log("listening at lol " + port);
});
   

//sdinisha.16.cse@anits.edu.in
//Anits@2018