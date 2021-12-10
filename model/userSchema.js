
import mongoose from 'mongoose';

let Schema=mongoose.Schema;

// user schema for application

let userSchema=new Schema({
    email:{type:String,required:true},
    role:{type:String,default:'user'},
    date:{type:Date,default:Date.now()}
  
    
},{timestamps:true});


export default mongoose.model('DBUser',userSchema);


