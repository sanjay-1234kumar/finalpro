
import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;
// text serach on name on name feild an parent feild 

let subcatergorySchema=new Schema({
    name:{type:String,required:true},
   parent:{type:Schema.Types.ObjectId,ref:'DBCatergory'},

    image:{type:String,required:true,get:(image)=>{

        return `${APP_URL}/${image}`;
    }},
  childs:[{type:Schema.Types.ObjectId,ref:'DBSanSubcater'}]
},{timestamps:true,toJSON:{getters:true},id:false});


// model.find({$text:{$search:search string}})



export default mongoose.model('DBSubCatergory',subcatergorySchema);


