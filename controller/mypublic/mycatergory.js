
import {DBCatergory} from '../../model/index';



const MySubcatergory={

    getAllCatergoryPublic:async(req,res,next)=>{

        try {
            const document=await DBCatergory.find().populate('childs');

            return res.json(document);

        } catch (error) {
            
            return next(error);

        }
    },

    getSingleCatergoryPublic:async(req,res,next)=>{

       const{id}=req.params;

       try {
        
        const result=await DBCatergory.findById(id).populate('childs');

        if(!result){

            return next('invalid id ');
            
        }

        return res.json(result);

       } catch (error) {
           
        return next(error);


       }

        

    }


};



export default MySubcatergory;
