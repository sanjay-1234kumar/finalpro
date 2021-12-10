
import Joi from 'joi';

import multer from 'multer';

import path from 'path';

import fs from 'fs';





import { DBSubCatergory,DBCatergory } from '../model/index';

// setting of multer function

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'subupload/');

    },
    filename: (req, file, cb) => {
        const unique_name = `${Date.now()}-${Math.round(Math.random() * 10000)}${path.extname(file.originalname)}`;
        cb(null, unique_name);


    },

});

const subupload = multer({ storage: storage }).single('image');



let SubCatergory = {

    async addSubCatergory(req, res, next) {
        // addSubCatergory like refrigators tvs ac,beauty,baby

        subupload(req, res, async (err) => {

            //checking of error
            if (err) {
               

                return next(err);

            }

            if (!req.file) {

                return next('image is not provide by user');

            }
            
            const ImagePath = req.file.destination + req.file.filename;

            

            // checking valiadtion error
            let subCatergoryschema = Joi.object({
                name: Joi.string().required(),
                parent: Joi.string().required(),
                image: Joi.string().required()

            });

            let myobj={
                name:req.body.name,
                parent: req.body.parent,
                image: ImagePath
            };
            


            const { error } = subCatergoryschema.validate(myobj);
            

            if (error) {
                // error of valiadtaion we need to remove the uploded file from the computer
                fs.unlink(`${appRoot}/${ImagePath}`, (err) => {

                    if (err) {
                        console.log("error in deleting uploded file ");

                        return next(err);

                    }
                });
                

                return next(error);
            }
            // validaiton completed

            // parent databse coding 

            let parent_id;

            try {
                
                const doc=await DBCatergory.findOne({name:req.body.parent});

               

                if(!doc){

                    return next("reqbody of not found ");

                }
                parent_id=doc._id;

            } catch (error) {
                
                return next(error);
            }

           
            const document = new DBSubCatergory({
                name: req.body.name,
                parent: parent_id,
                image: ImagePath,
            });

            try {

                const result = await document.save();

               
                // we upadte parent doumment push 

const prudate=await DBCatergory.findByIdAndUpdate(parent_id,{$push:{
    childs:result._id}
});



return res.json(result);

            } catch (error) {

                return next(error);

            }



        });




    },

    async getAllSubCatergory(req, res, next) {

        try {
            const document = await DBSubCatergory.find();

            return res.json(document);

        } catch (error) {

            return next(error);

        }
        

    },


    async getSingleSubCatergory(req, res, next) {

      
        const { id } = req.params;
        try {
            const document = await DBSubCatergory.findById(id);

            if (!document) {
               
                return next("Suabcatergory document not found or inavalid id");


            }

            return res.json(document);


        } catch (error) {

            return next(error);

        }

    },

    async updateSubCatergory(req, res, next) {
       

        const { id } = req.params;

        try {

            const document = await DBSubCatergory.findById(id);

            if (!document) {

                return next("document not found for upadate");
            }

            try {

                const upadate_document = await DBSubCatergory.findByIdAndUpdate(document._id, req.body);

                return res.json(upadate_document);


            } catch (error) {

                return next(error);

            }

        } catch (error) {

            return next(error);

        }

    },

    async deleteSubCatergory(req, res, next) {
      
        const { id } = req.params;



        try {
            const document = await DBSubCatergory.findById(id);

            if (!document) {

                return next("document not found for deleting");

            }

            const image_path = document._doc.image;

            console.log(image_path);

            fs.unlink(`${appRoot}/${image_path}`, (err) => {

                if (err) {
                    console.log("document image is not deledted");
                    return next(err);

                }

            });

            try {
                const deleted_document = await DBSubCatergory.findByIdAndDelete(document._id);

                const parentdel=await DBCatergory.findByIdAndUpdate(deleted_document._id,{
                    $pull:{childs:deleted_document._id}
                });

               
                
                return res.json(deleted_document);


            } catch (error) {

                return next(error);


            }



        } catch (error) {

            return next(error);

        }
    }




};




export default SubCatergory;
