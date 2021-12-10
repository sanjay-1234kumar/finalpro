
import {DBProduct} from '../../model/index';


import {API_KEY} from '../../config/index';

import axios from 'axios';

const MyProduct={

getProductPublic: async(req,res,next)=>{
   
    const{id}=req.params;

 

    try {
        
        const document=await DBProduct.find({pcatergory:id}).populate('pcatergory');


        return res.json(document);


    } catch (error) {
        
        return next(error);

    }

},

getProductVideo: async(req,res,next)=>{


const{search}=req.query;

if(!req.query.search){

    

    return next("sarch qurey is empty please send ");


}




const config={
    method:'get',
    url:'https://youtube.googleapis.com/youtube/v3/search',
    params: {
        part:'snippet',
        maxResults:2,
        q:search,
        key:API_KEY
      },
};


try {
    
const result=await axios(config);





const {items}=result.data;





return res.json(items);


} catch (error) {
    
   
    return next(error);
}




},






};


export default MyProduct;
