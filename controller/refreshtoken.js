import { DBRefresh } from "../model";
import CustomErrorHandler from "../service/customErrorHandler";

let RefreshToken={


    async deleteRefreshToken(req,res,next){

let token=req.body.token;

if(!token){

    return next(CustomErrorHandler.unAuthorized('token not found '));
}

// check the token is present on the databse
try {
   
   let refdelete= await DBRefresh.findOne({token:req.body.token});

  

   if(!refdelete){

    return next(CustomErrorHandler.unAuthorized("token not found in the databse"));
   }

   try {
       
    let finalresult=await DBRefresh.findByIdAndDelete(refdelete._id);
 
    return res.json({data:"token is successfully ",status:true});
    
   } catch (error) {
       
    return next(error);

   }
  


    
} catch (error) {
    
    return next(error);
}

      

    }


};







export default RefreshToken;
