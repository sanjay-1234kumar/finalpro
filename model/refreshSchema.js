
import mongoose from 'mongoose';

let Schema=mongoose.Schema;
// text serach on name on name feild an parent feild 

let refreshSchema=new Schema({
    token:{type:String,required:true,unique:true}
    
    
});


export default mongoose.model('DBRefresh',refreshSchema);


