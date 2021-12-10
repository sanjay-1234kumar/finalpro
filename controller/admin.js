
import Joi from 'joi';

import {DBAdmin,DBRefresh} from '../model/index';
import CustomErrorHandler from '../service/customErrorHandler';

import JwtService from '../service/jwtServices';







let Admin = {

    async addAdmin(req, res, next) {
        // addadmin the databse 
      // req.body={name:"",email:"",password:""}



        let adminschema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,15}$')).required(),
        });


        const { error } = adminschema.validate(req.body);

        if (error) {
            return next(error);

        }

// check is email is present in the already database

try {
    const exist= await DBAdmin.exists({email:req.body.email});
    if(exist){
        return next(CustomErrorHandler.emailAlreadyExists('this email is alredy exist'));
    }
    
} catch (error) {
    
    next(error)
}




// password to hashed

try {
    

    // save document into dabatbse
    let doc=new  DBAdmin({name:req.body.name,email:req.body.email,password:req.body.password});


    try {

        let result= await  doc.save();
        // document is saved into databse
        return res.json({data:"thanks for singup ",status:true,name:result.name});
    } catch (error) {
        
     return  next(error);

    }


} catch (error) {
    
   return next(error);


}



        


    },
async loginAdmin(req,res,next){

    
let adminloginschema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$'))
});

const {error}=adminloginschema.validate(req.body);

if(error){

    return next(error);
    
}
// find the the data on the basis of email whether emailis prensent or not

let admin;// golbal scope
try {
    
    admin= await  DBAdmin.findOne({email:req.body.email});
    if(!admin){
        return next(CustomErrorHandler.invalidCredentails('email is wrong or password is wrong'));

    }
    // check password

} catch (error) {
return next(error);

    
}
// check password



  try {
    let checkpassword;
      
    checkpassword=await DBAdmin.findOne({password:req.body.password});
    
// true when match 
    if(!checkpassword){

        return next(CustomErrorHandler.invalidCredentails('password is wrong'));
    }


  } catch (error) {
      
    return  next(error);

  }
  // all checking is compelete admin is prefrect 
 

  const {_id,role}=admin;



// we can genreate a token 
// refresh token inserted into the databse 
let refresh_token= JwtService.signRefreshToken({_id,role});
// we can inssert the token into data bse

let refreshdoc=new DBRefresh({token:refresh_token});

try {

    let lastresult= await refreshdoc.save();
    // refresh token is succesfully insterted


    // {_id:"dd",token:"gdgdssfsf"}

    return res.json(lastresult);

    
    
    
} catch (error) {
    
    return next(error);
}

},
async getSingleAdmin(req,res,next){

// req.admin={_id:"101",role:"admin"}

const{_id}=req.admin;

    try {
        
        const profile_data=await DBAdmin.findById(_id).select({name:1,email:1}).exec();
        // selected field 

        if(!profile_data){

            return next("admin profile not found may id wrong");

        }

    

        return res.json(profile_data);



    } catch (error) {
        
        return next(error);

    }


},



};


export default Admin;
