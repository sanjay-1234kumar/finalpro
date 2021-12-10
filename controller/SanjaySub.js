import Joi from 'joi';
import multer from 'multer';

import path from 'path';

import fs from 'fs';


import{DBSubCatergory,DBSanSub} from '../model/index';

import {APP_URL} from '../config/index';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {


        cb(null, 'sanjayupload/');


    },
    filename: (req, file, cb) => {
        const unique_name = `${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname)}`;
        cb(null, unique_name);
    }
});

const upload = multer({ storage: storage, }).single('image');


const SanjaySub={

addsansubcater:async(req,res,next)=>{

    upload(req,res,async(err)=>{
            if (err) {

                

                return next(err);

            }

             // file is uploaded 
           

            if (!req.file) {
                // custom error error provided
                return next('image must provide');

            }

               const ImagePath = req.file.destination + req.file.filename;

          

            
            let sanschema = Joi.object({
                name: Joi.string().required(),
                image: Joi.string().required(),
                parent:Joi.string().required(),

            });



            const Sanjaycatergory = {
                name: req.body.name,
                image: ImagePath,
                parent:req.body.parent,

                
            };

            const{error}=sanschema.validate(Sanjaycatergory);

            // validation error handling 
            if (error) {
                // we need to delete uplode file from the computer 

                fs.unlink(`${appRoot}/${ImagePath}`, (err) => {

                    if (err) {

                        return next(err);
                    }

                });

            }
            // validation over 

            try {

                const parentDoc=await DBSubCatergory.findOne({name:req.body.parent});

                if(!parentDoc){
return next("parent document not found please enter correct parent ");

                }

let child=new DBSanSub({
    name:req.body.name,
    image:ImagePath,
    parent:parentDoc._id,
});

const childdoc=await child.save();


let parentdocupdate=await DBSubCatergory.findByIdAndUpdate(parentDoc._id,{
    $push:{childs:childdoc._id}
});



return res.json(childdoc);
                
            } catch (error) {
                
                return next(error);

            }

    });
},

getsanjayallsub:async(req,res,next)=>{

    try {
        const document=await DBSanSub.find({});
        return res.json(document);

    } catch (error) {
        
        return next(error);

    }

},

getsanjaysinglesub:async(req,res,next)=>{

    const{id}=req.params;

    try {
        
        const document=await DBSanSub.findById(id);

       
        
        return res.json(document);


    } catch (error) {
     
        return next(error);

    }

},

sanjaysubupdate:async(req,res,next)=>{

    const{id}=req.params;
  

try {

    const result=await DBSanSub.findById(id);

    if(!result){
        return next('invalid id plaese enter coorect id')
    }

    const doc=await DBSanSub.findByIdAndUpdate(id,req.body);

    

    return res.json(doc);



    
} catch (error) {
    
    return next(error);

}
    

},

sanjaysubdelete:async(req,res,next)=>{

    const{id}=req.params;

try {
    
    const document=await DBSanSub.findById(id);

    if(!document){

        return next('invalid id for deleting document ');
    }

    const ImagePath=document._doc.image;


   

    fs.unlink(`${appRoot}/${ImagePath}`,(err)=>{

        if(err){


return next(err);


      }
    });
    // image delete from computer 
const deldoc=await DBSanSub.findByIdAndDelete(document._id);

const Prdoc=await DBSubCatergory.findByIdAndUpdate(deldoc.parent,{
    $pull:{childs:deldoc._id}
});



return res.json(deldoc);



} catch (error) {
    
    return next(error);

}


},

};


export default SanjaySub;
