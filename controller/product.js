
import Joi from 'joi';
import multer from 'multer';

import path from 'path';

import fs from 'fs';


import {DBProduct,DBSanSub} from '../model/index';






// setting of multer of multer 

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{


        cb(null,'uploads/');


    },
    filename:(req,file,cb)=>{
        const unique_name=`${Date.now()}-${Math.round(Math.random()*1E9) }${path.extname(file.originalname)}`;
cb(null,unique_name);
    }
});

const upload=multer({storage:storage,}).single('image');



let Product = {

    async addProduct(req, res, next) {


        // fisrt uploading the file

        upload(req,res,async(err)=>{
            // error handling while uploading the image
if(err){
    console.log("error in the uploading product image");
   return next(err);

}


if(!req.file){
// custom error error provided
    return next('image must provide');

}

const ImagePath=req.file.destination+req.file.filename;



let productschema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    reviews: Joi.number().required(),
    pcatergory: Joi.string().required(),
   
    image: Joi.string().required(),
    buynow: Joi.string().required(),
 

});

const MyProduct={
    name:req.body.name,
    description:req.body.description,
    reviews:req.body.reviews,
    pcatergory:req.body.pcatergory,
    image:ImagePath,
    buynow:req.body.buynow,
    

};
// checking valiadation error
const {error}=productschema.validate(MyProduct);

// valiadtion error 
if(error){

    
    // we need to remove uploaded file 
fs.unlink(`${appRoot}/${ImagePath}`,(err)=>{


    if(err){

        return next(err);
    }
});

    return next(error);

}
// valdition over 

try {
    
    const Parentdoc=await DBSanSub.findOne({name:req.body.pcatergory});


    if(!Parentdoc){

        return next('Parent document not found in the db');

    }

    let Doc=new DBProduct({
        name:req.body.name,
        description:req.body.description,
    reviews:req.body.reviews,
 pcatergory:Parentdoc._id,
    image:ImagePath,
    buynow:req.body.buynow,
    });

    let result= await Doc.save();

  

    let upadateDoc=await DBSanSub.findByIdAndUpdate(Parentdoc._id,{
        $push:{prchilds:result._id}
    });

   


    return res.json(result);



} catch (error) {

    return next(error);

    
}





        });


       
      
       

    },
    async getSingleProduct(req, res, next) {

        const{id}=req.params;



        try {
const document=await DBProduct.findById(id);

if(!document){

   

    return next("document not found ");
}


            return res.json(document);

        } catch (error) {
            
            return next(error);

        }
        

    },
    async getAllProduct(req,res,next){

try {
    const result=await DBProduct.find();

    return res.json(result);

} catch (error) {

    return next (error);

}

        
    },

    async updateSingleProduct(req, res, next) {

     
        const{id}=req.params;


       try {
           const document =await DBProduct.findById(id);



           if(!document){
               console.log("document not found or invliad id");
               return  next('document not found ');

           }
           // document found 

       

           // we need to update the data 
           try {

            const upadated_document=await DBProduct.findByIdAndUpdate(document._id,req.body);

            return res.json(upadated_document);

               
           } catch (error) {
               
            return next(error);


           }

       } catch (error) {
           
        return next(error);

       }

    },
    async deleteSingleProduct(req, res, next) {

        const {id}=req.params;

        try {
            const document=await DBProduct.findById({_id:id});

            if(!document){

                
                return next('Product Not found Invalid Id');

            }


const impath=document._doc.image;
const documentId=document._id;




    
    fs.unlink(`${appRoot}/${impath}`,(err)=>{
if(err){
    
    return next(error);

}
    });
    // file is delete then we need to delete data from the databse 

    try {
        
        const deleted_doc=await DBProduct.findByIdAndDelete(documentId);
        // parent related work 

        const parentdoc=await DBSanSub.findByIdAndUpdate(deleted_doc.pcatergory,{
            $pull:{prchilds:deleted_doc._id}
        });

     
        

        return res.json(deleted_doc);


    } catch (error) {

        return next(error);

        
    }


            
        } catch (error) {
            
            
            return next(error);

        }

       
    }

};






export default Product;
