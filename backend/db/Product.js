const mongoose=require("mongoose");
// import fetch from "node-fetch";
// const productSchema=new mongoose.Schema({
//     name:{
//         type:String
//     },
//     price:{
//         type:String,
//         unique:true
//     },
//     category:{
//         type:String
//     },
//     image:{
//         data:Buffer,
//         contentType:String,
//     },
//     userId:String,
//     company:String
// });

const productSchema=new mongoose.Schema({
        id:{
            type:Number
        },
        userId:String,
        title:{
            type:String,
        },
        description:{
            type:String
        },
        price:{
            type:Number
        },
        discountPercentage:{
            type:Number
        },
        rating:{
            type:Number
        },
        category:{
            type:String
        },
        images:[
            {type:String}
        ]
       
});

module.exports=mongoose.model("Product",productSchema);

