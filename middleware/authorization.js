
import { DBRefresh } from '../model';
import CustomErrorHandler from '../service/customErrorHandler';
import JwtService from '../service/jwtServices';




let auth= async (req,res,next)=>{





let reftoken=req.headers.authorization;

if(!reftoken){
 
 return   next(CustomErrorHandler.unAuthorized('invalid token'));
}
// now check refresh token is present on the databse

try {

    let refresult=await DBRefresh.findOne({token:reftoken});

    // null return hota hi to ye 
    if(!refresult){

        return next(CustomErrorHandler.unAuthorized('token not found in the databse'));
    }
// now we can verify the token
// let refverify=await JwtService.
// {_id:"101",role:"admin"}
// req.admin={_id:"101",role:"admin"};


try {

    let refverify= await JwtService.verifyRefreshToken(refresult.token);


    let admin={_id:refverify._id,role:refverify.role};// admin={_id:'asd',role:'admin'}

    req.admin=admin;
    // admin={_id:"ffasgf",role:'admin'}

    // setting of reqresult.token
// req.admin={_id:"syys",role:"admin"}

    

    next();


    
} catch (error) {
    
    
    return next(CustomErrorHandler.unAuthorized('in valid token'));
}

    
} catch (error) {
    
    return next(error);

}




}




export default auth;


