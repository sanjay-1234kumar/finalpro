
import express from 'express';


let router =express.Router();

import {
SubCatergory,
Product,
User,
Admin,
RefreshToken,
MySubcatergory,
MyProduct,
Catergory,
MyCatergory,
AllCount,
SanjaySub
} from '../controller/index';


import auth from '../middleware/authorization';

// sanjay subsub routes 

router.post('/addsansubcater',auth,SanjaySub.addsansubcater);// it is completed

router.get('/getsansuball',auth,SanjaySub.getsanjayallsub);// it is completed

router.get('/getsansub/:id',auth,SanjaySub.getsanjaysinglesub);//it is complted

router.put('/updatesansub/:id',auth,SanjaySub.sanjaysubupdate);// it is completed

router.delete('/deletesansub/:id',auth,SanjaySub.sanjaysubdelete);// it is is completed


// post for sub catergory only for admin

// it is complted
router.post('/addsubcatergory',auth,SubCatergory.addSubCatergory);// private admin 

// it is complted
// get for all subcatergory 
router.get('/getsubcatergory',auth,SubCatergory.getAllSubCatergory);// public 


// get for single subcatergory 
// it is completed
router.get('/getsubcatergory/:id',auth,SubCatergory.getSingleSubCatergory);// public 

// it is completed
// update  for single subcatergory 
router.put('/updatesubcatergory/:id',auth,SubCatergory.updateSubCatergory);// private admin

// it is completed
// update  for single subcatergory 
router.delete('/deletesubcatergory/:id',auth,SubCatergory.deleteSubCatergory);// private admin

// route for catergory 

// it is completed
// post addcatergory 
router.post('/addcatergory',auth,Catergory.addCatergory);



// it is completed 
// get all catergory
router.get('/getcatergory',auth,Catergory.getAllCatergory);

// get single catergroy

// it completed 
router.get('/getcatergory/:id',auth,Catergory.getSingleCatergory);

// upadate catergory

// it is completed
router.put('/updatecatergory/:id',auth,Catergory.updateCatergory);

// delete Catergory 
// it is completed
router.delete('/deletecatergory/:id',auth,Catergory.deleteCatergory);


// it is completed
router.post('/addproduct',auth,Product.addProduct);// private admin

// it is completed
// get all  product 
router.get('/getproduct',auth,Product.getAllProduct);// public 

// it is completed 
//get a single product with help of id
router.get('/getproduct/:id',auth,Product.getSingleProduct);// public 

// upadate a single product only for admin

// it is completed
router.put('/updateproduct/:id',auth,Product.updateSingleProduct);// private admin 

// delete a single product for admin

// it is completed
router.delete('/deleteproduct/:id',auth,Product.deleteSingleProduct);// private admin


// post for user
// it is completed
router.post('/adduser',User.addUser);// public 

// get all   details of  user
// it is complted 
router.get('/getuser',auth,User.getAllUser);// private admin 

// get a single user 

// it is completed is 
router.get('/getuser/:id',auth,User.getSingleUser);// private admin

// update a single user 

// it is completed 
router.put('/updateuser/:id',auth,User.updateUser);// private admin

// delete a single user

// it is completed 
router.delete('/deleteuser/:id',auth,User.deleteUser);// private admin



// post for admin 

router.post('/addadmin',Admin.addAdmin);// private admin this is url hiding 


 //get all admin  for only who is admin and role admin

 router.post('/loginadmin',Admin.loginAdmin);// gernerate refresh token
 
 // get single admin data 

 // it is commpleted 
 router.get('/getadmin',auth,Admin.getSingleAdmin);// private admin





 // for deleting the refresh token it is only for admin 
 // it is completed
 router.post('/delete/refreshtoken',auth,RefreshToken.deleteRefreshToken);



// public routes for app

// public route for getting subcatergrory with qrey


router.get('/public/getsubcatergorybyid/:id',MySubcatergory.getSubcatergroyPublic);//["smartv","invetrible ac"]
// it is complted
// req query 

router.get('/public/getsubbytext',MySubcatergory.getRequestForSub);// it is complted

// it is complted
router.get('/public/getallcatergory',MyCatergory.getAllCatergoryPublic);//["app","beabety"]

// it is complted
router.get('/public/getallcatergorybyid/:id',MyCatergory.getSingleCatergoryPublic);//{"appliances"}



// for products

router.get('/public/getproduct/:id',MyProduct.getProductPublic);// it is completed
// router for youtube data


router.get('/public/getvideo',MyProduct.getProductVideo);

router.get('/public/data1',AllCount.getParentOfSub);//["appliances","baybay care","fashion"]

router.get('/public/data2',AllCount.getParentOfSubOfSub);//["smart ac ","smar tv"]

router.get('/public/data3',AllCount.getSubParent);//["air coolers","refriagtors","ac"]



// router for dashboard data

// it is is completed
router.get('/dashboard/count-data',auth,AllCount.getAllCount);// count [{np:"",data:4},{nuser:"",data:5}];

// it is completed
router.get('/dashboard/user-data',auth,AllCount.getUserCount);// [{january:"8","febauray":"8",march:""}]

// it is completed
router.get('/dashboard/catergory-data',auth,AllCount.getProductCount);


// it is completed
router.get('/dashboard/luser-data',auth,AllCount.getLastestUsers);




export default router;




