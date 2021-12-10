
import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;
// text serach on name on name feild an parent feild 

let sansubcaterSchema=new Schema({
    name:{type:String,required:true},
   parent:{type:Schema.Types.ObjectId,ref:'DBSubCatergory'},

    image:{type:String,required:true,get:(image)=>{

        return `${APP_URL}/${image}`;
    }},
 prchilds:[{type:Schema.Types.ObjectId,ref:'DBProduct'}],
 
},{timestamps:true,toJSON:{getters:true},id:false});

sansubcaterSchema.index({name:'text'});

// model.find({$text:{$search:search string}})


export default mongoose.model('DBSanSubcater',sansubcaterSchema);


