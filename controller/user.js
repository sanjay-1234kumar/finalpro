
import Joi from 'joi';

import {DBUser} from '../model/index';
import CustomErrorHandler from '../service/customErrorHandler';

let User = {

    async addUser(req, res, next) {
        // addCatergory like appliances,beauty,baby

       // req.body={email:""}

        let userschema = Joi.object({
            email: Joi.string().email().required()
        });

        const { error } = userschema.validate(req.body);

        if (error) {
            return next(error);

        }
        // check is alreday present on the data base 

        try {

            const exist=await DBUser.exists({email:req.body.email});

            if(exist){

                return next(CustomErrorHandler.emailAlreadyExists('email alredy exsits'));
            }
            
        } catch (error) {
        
            return next(error);

            
        }

        let doc=new DBUser(req.body);

        try {
            
            let result=await doc.save();
         
            return res.json(result);

        } catch (error) {

            return next(error);

            
        }

        

    },
    async getAllUser(req,res,next){
try {
    const document=await DBUser.find();

    return res.json(document);

} catch (error) {
    
    return next(error);

}
    },
    async getSingleUser(req,res,next){

        
        const {id}=req.params;

        try {
            const document=await DBUser.findById(id);
            if(!document){

                return next("document not found in searching user");

            }

            return res.json(document);

        } catch (error) {
            
            return next(error);

        }

    },
    async updateUser(req,res,next){

        
    
        const {id}=req.params;

        try {
            
            const document=await DBUser.findById(id);

            if(!document){

                return next("document not found while upadting user");

            }
try {

    const upadated_document=await DBUser.findByIdAndUpdate(document._id,req.body);

    return res.json(upadated_document);

    
} catch (error) {
    
    return next(error);
}

        } catch (error) {
            
            return next(error);

        }

    },
    async deleteUser(req,res,next){

       
       const{id}=req.params;

       try {
           const document=await DBUser.findById(id);

           if(!document){

            return next("document not found while deleting");

           }

           try {

            const deleted_document=await DBUser.findByIdAndDelete(document._id);

            return res.json(deleted_document);

               
           } catch (error) {

            return next(error);

               
           }
           
       } catch (error) {
           
        return next(error);

       }

        
    }


};









export default User;
