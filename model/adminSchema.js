
import mongoose from 'mongoose';

let Schema=mongoose.Schema;

// admin schema

let adminSchema=new Schema({
    name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:'admin'},
   

  
},{timestamps:true});


export default mongoose.model('DBAdmin',adminSchema);


