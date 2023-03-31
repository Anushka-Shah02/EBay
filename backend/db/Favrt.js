const mongoose=require("mongoose");
const User=require("./User");

const favrtSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:User},
    favrtItems:[
        {
            id:{
                type:Number
            },
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
                    // name:{
                    //     type:String,
                    // },
                    // price:{
                    //     type:Number,
                    // },
                    // category:{
                    //     type:String
                    // },
                    // image:{
                    //     data:Buffer,
                    //     contentType:String,
                    // },
                    // company:String,
                    // quantity:{
                    //     type:Number,
                    //     default:1
                    // }
        }
    ]
    
},{timestamps:true});

module.exports=mongoose.model("Favrt",favrtSchema);

// app.post("/cart/:id/:userId",verifyToken,async(req,res)=>{
//     Cart.findOne({user:req.params.userId})
//     // .populate('user')
//     .exec((error,cart)=>{
//         if(error) return res.status(400).json({error});
//         if(cart)
//         {
//             const myproduct=req.body.name;
//             const productExist=cart.cartItems.find(c=> c.name==myproduct);
//             if(productExist)
//             {
//                 Cart.findOneAndUpdate({"user":req.params.userId,"cartItems.name":myproduct},{
//                     "$set":{
//                         "cartItems":{
//                             ...req.body,
//                             // quantity:productExist.quantity+1
//                         }
//                     }
//                 })
//                 // .populate('user')
//                 .exec((error,_cart)=>{
//                     if(error) return res.status(400).json({error});
//                     if(_cart){
//                         return res.status(201).json({cart:_cart});
//                     }
//                 })
//             }else{
//                 Cart.findOneAndUpdate({user:req.params.userId},{
//                     "$push":{
//                         "cartItems":req.body
//                     }
//                 })
//                 // .populate('user')
//                 .exec((error,_cart)=>{
//                     if(error) return res.status(400).json({error});
//                     if(_cart){
//                         return res.status(201).json({cart:_cart});
//                     }
//                 })
//             }
            
//             // res.status(200).json({message:cart});
//         }else{
//             const cart=new Cart({
//                 user:req.params.userId,
//                 cartItems:[req.body]
//             });
//             cart.save((error,cart)=>{
//                 if(error) return res.status(400).json({error});
//                 if(cart){
//                     return res.status(201).json({ cart });
//                 }
//             })
//         }
//     })
// })
