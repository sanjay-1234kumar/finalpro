
import { DBCatergory, DBProduct, DBUser, DBSubCatergory,DBSanSub } from '../model/index';

const AllCount = {

    getAllCount: async (req, res, next) => {

        const all_data = [];

        
        try {

            const n_product = await DBProduct.find().countDocuments();

            all_data.push({
                name: 'total number of products',
                data: n_product,
            });

            const n_catergory = await DBCatergory.find().countDocuments();

            all_data.push({
                name: "total number of catergory ",
                data: n_catergory,
            });

            const n_subcatergory = await DBSubCatergory.find().countDocuments();

            all_data.push(
                {
                    name: "total number of subactergory ",
                    data: n_subcatergory,
                }
            );

            const n_user = await DBUser.find().countDocuments();

            all_data.push({
                name: "total number of user ",
                data: n_user,
            });



            return res.json(all_data);



        } catch (error) {


            return next();

        }
        // [{name:"total number of user ",data:4},{}]

    },

    getUserCount: async (req, res, next) => {

       

        try {

            let document = await DBUser.find();// [{4,4,5,5,6,7,7}]

            const myuser = document.map((item) => {



                


                let d = new Date(item.date);

                let d2 = d.toJSON().slice(5, 7);

                return (parseInt(d2));


            });


            let data = [{
                name: "january",
                value: 0,

            }, {
                name: "febuary",
                value: 0,

            },
            {
                name: "march",
                value: 0,

            },
            {
                name: "April",
                value: 0,

            },
            {
                name: "may",
                value: 0,

            },
            {
                name: "june",
                value: 0,

            },
            {
                name: "july",
                value: 0,

            },
            {
                name: "august",
                value: 0,

            },
            {
                name: "stpember",
                value: 0,

            },
            {
                name: "octumber",
                value: 0,

            },
            {
                name: "novebermer",
                value: 0,

            },
            {
                name: "december",
                value: 0,

            }


            ];


            let i, j;

            const check = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            for (i = 0; i < check.length; i++) {

                let count = 0;

                for (j = 0; j < myuser.length; j++) {

                    // 1==8
                    if (check[i] == myuser[j]) {
                        count++;
                    }
                }

                // set data to 

                data[i].value = count;



            }


// [{name:"jaunray",value:0},{name:"febaury",value:0},{name:""}]

            return res.json(data);



        } catch (error) {


            return next(error);

        }

    },

getProductCount: async(req,res,next)=>{

    
try {
    
    let result=[];
  result=await DBSanSub.find();

    let myar=[];
    
    let i;
let document;

    for(i=0;i<result.length;i++){

        try {
            document= await  DBProduct.find({pcatergory:result[i]._id}).countDocuments();

            myar.push({
                name:result[i].name,
                data:document
            });

        } catch (error) {
            
            return next(error);

        }

    }


    return res.json(myar);
    

} catch (error) {
    
    return next(error);

}
 

},


getLastestUsers:async (req,res,next)=>{

try {
    
    const document=await DBUser.find().sort({_id:-1}).limit(10);

    return res.json(document);



} catch (error) {
    

    return next(error);

}



},

getParentOfSub:async(req,res,next)=>{

    try {
        let document=[];

         document=await DBCatergory.find();

        let ar=[];

      ar=document.map((item)=>{

            return item.name;

        });

        return res.json(ar);


    } catch (error) {
        
        return next(error);

    }

},

getParentOfSubOfSub:async(req,res,next)=>{

    try {
        
        let document=[];

        document=await DBSanSub.find();

        let ar=[];

        ar=document.map((item)=>{

            return item.name;

        });

        return res.json(ar);


    } catch (error) {
        
        return next(error);
        
    }
},
getSubParent:async(req,res,next)=>{
    try {
        
        let document=[];
let ar=[];

        document=await DBSubCatergory.find();
ar=document.map((item)=>{

    return item.name;

});

return res.json(ar);

    } catch (error) {
        
        return next(error);

    }
},

};




export default AllCount;


