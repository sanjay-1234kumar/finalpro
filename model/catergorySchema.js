
import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;

// admin schema

let catergorySchema=new Schema({
    name:{type:String,required:true},
   image:{type:String,required:true,get:(image)=>{
    return `${APP_URL}/${image}`;
}},
childs:[{type:Schema.Types.ObjectId,ref:'DBSubCatergory'}],
},{timestamps:true,toJSON:{getters:true},id:false});


// name:"appliances" image:"" childs:["01","02","03","04"] when it child is 



export default mongoose.model('DBCatergory',catergorySchema);

// we have 


