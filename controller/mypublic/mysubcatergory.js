
import {DBSubCatergory,DBSanSub} from '../../model/index';


const MySubcatergory={

     getSubcatergroyPublic :async(req,res,next)=>{

        const{id}=req.params;
        try {
            
            const result=await DBSubCatergory.findById(id).populate('childs').populate({path:'parent', });

            if(!result){

                return next('in valid id of subcatergory');

            }
            return res.json(result);

        } catch (error) {
            
            return next(error);

        }

      

    },
   getRequestForSub:async(req,res,next)=>{
const{search}=req.query;




try {
    const document=await DBSanSub.find({$text:{$search:search}});

    return res.json(document);

} catch (error) {
    
    return next(error);

}


   },

};


export default MySubcatergory;
