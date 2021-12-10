import mongoose from 'mongoose';

import {APP_URL} from '../config/index';


let Schema=mongoose.Schema;

// text search on two feild p_catergory and p_subcatergory

let productSchema=new Schema({
    
    name:{type:String,required:true},
    description:{type:String,required:true},
    reviews:{type:Number,required:true},
    pcatergory:{type:Schema.Types.ObjectId,ref:'DBSanSubcater'},
   
    
    image:{type:String,required:true,get:(image)=>{

        return `${APP_URL}/${image}`
    }},
    buynow:{type:String,required:true},
   
},{timestamps:true,toJSON:{getters:true},id:false});// text search on p_catergory and p_subcatergory

productSchema.index({name:'text'});

// movies.find({$text:{$search:searchstring}}).limit(5).sort({rating:1})


export default mongoose.model('DBProduct',productSchema);

