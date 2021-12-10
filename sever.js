
// we are statring from sever.js file 
 import express from 'express';
import {APP_PORT,DB_URL} from './config/index';


let app=express();

import routes from './routes/index';

import errorHandler from './middleware/errorhandler';

import bodyPaser from 'body-parser';

import cors from 'cors';

import mongoose from 'mongoose';

import path from 'path';

import CustomErrorHandler from './service/customErrorHandler';



global.appRoot=path.resolve(__dirname);

// third-party middleware 

app.use(cors());

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({extended:false}));

// databse connection code 
mongoose.connect(DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then((res)=>{
  console.log("we are connected to data base");
}).catch((e)=>{
console.log("we are not connected to databse");
  console.log(e);
});


// setting of static file 
app.use('/uploads',express.static('uploads'));
app.use('/subupload',express.static('subupload'));
app.use('/caterupload',express.static('caterupload'));

app.use('/sanjayupload',express.static('sanjayupload'));


app.use(express.static('client/build'));

// routes for start application 


app.use('/api',routes);


app.get('/',(req,res,next)=>{

  return res.sendFile(__dirname+'/client/build/index.html');
  

});


app.use((req,res,next)=>{

 return next(CustomErrorHandler.pagenotFound("page not found "));
})

app.use(errorHandler);




app.listen(APP_PORT,()=>{

    console.log(`sever running at port ${APP_PORT}`);

});














