const express=require("express");
const app=express();
require('./db/config');
const User=require("./db/User");
const Product=require("./db/Product");
const jwt=require('jsonwebtoken');
const jwtKey='e-comm';
const multer=require("multer");
const Cart = require("./db/Cart");
const Favrt = require("./db/Favrt")
var upload = multer({dest:'uploads/'});
var cors = require('cors')
  
app.use(express.json());
app.use(cors());

app.post("/register",async(req,res)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password
    jwt.sign({result},jwtKey,{expiresIn:"4h"},(err,token)=>{
        if(err)
        {
            res.send({result:"User not found"});
        }
        res.send({result,auth:token})
    })
    // res.send(result)
})

app.post("/login",async(req,res)=>{
    if(req.body.email && req.body.password)
    {
    let user=await User.findOne(req.body).select("-password");
    if(user)
    {
        jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err)
            {
                res.send({result:"User not found"});
            }
            res.send({user,auth:token})
        })
        // res.send(user);
    }
    else{
        res.send({result:"No User Found"})
    }
    }
    else{
        res.send({result:"No User Found"})
    }
    
})

app.patch("/profileupdate/:userId",async(req,res)=>{
    var updateObj=req.body;
    let result=await User.updateOne({_id:req.params.userId},{'$set':updateObj});
    res.send(result);    
})


app.post("/add-product",verifyToken,async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    console.log(req.body);
    res.send(result)
})

// app.post("/cart/:id/:userId",verifyToken,async(req,res)=>{
//     Cart.findOne({user:req.params.userId})
//     .exec((error,cart)=>{
//         if(error) return res.status(400).json({error});
//         if(cart)
//         {
//             Cart.findOneAndUpdate({user:req.params.userId},{
//                 "$push":{
//                     "cartItems":req.body
//                 }
//             })
//             .exec((error,_cart)=>{
//                 if(error) return res.status(400).json({error});
//                 if(_cart){
//                     return res.status(201).json({cart:_cart});
//                 }
//             })
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


app.post("/cart/:id/:userId",verifyToken,async(req,res)=>{
    Cart.findOne({user:req.params.userId})
    // .populate('user')
    .exec((error,cart)=>{
        if(error) return res.status(400).json({error});
        if(cart)
        {
            const myproduct=req.body.title;
            const productExist=cart.cartItems.find(c=> c.title==myproduct);
            if(productExist)
            {
                Cart.findOneAndUpdate({"user":req.params.userId,"cartItems.title":myproduct},{
                    "$set":{
                        "cartItems":{
                            ...req.body,
                            quantity:productExist.quantity+req.body.title.quantity
                        }
                    }
                })
                // .populate('user')
                .exec((error,_cart)=>{
                    if(error) return res.status(400).json({error});
                    if(_cart){
                        return res.status(201).json({cart:_cart});
                    }
                })
            }else{
                Cart.findOneAndUpdate({user:req.params.userId},{
                    "$push":{
                        "cartItems":req.body
                    }
                })
                // .populate('user')
                .exec((error,_cart)=>{
                    if(error) return res.status(400).json({error});
                    if(_cart){
                        return res.status(201).json({cart:_cart});
                    }
                })
            }
            
            // res.status(200).json({message:cart});
        }else{
            const cart=new Cart({
                user:req.params.userId,
                cartItems:[req.body]
            });
            cart.save((error,cart)=>{
                if(error) return res.status(400).json({error});
                if(cart){
                    return res.status(201).json({ cart });
                }
            })
        }
    })
})



// app.post("/cart/:id",verifyToken,async(req,res)=>{
//     let cart=new Cart(req.body);
//     let cartResult=await cart.save();
//     res.send(cartResult);
//     console.log(cartResult);
// })

app.get("/cart/:userId",verifyToken,async(req,res)=>{
    let cartProds=await Cart.findOne({user:req.params.userId})
   if(cartProds)
    {
        // res.send(cartProds.cartItems)
        res.send(cartProds.cartItems)
    }else{
        res.send({result:"No Products Found"})
    }
})

app.put("/cart/:id/:userId",verifyToken,async(req,res)=>{
    try{
        const result=await Cart.updateOne({user:req.params.userId},{'$pull':{"cartItems":{id:req.params.id}}})
        res.status(200).json(result);
    }catch(e)
    {
        res.status(401).json(e);   
    }
})

// app.delete("/cart/:id/:userId",verifyToken,async(req,res)=>{
// // app.delete("/cart/:id",verifyToken,async(req,res)=>{
//     const result=await Cart.deleteOne({id:req.params.id})
//     // const result=await Cart.deleteOne({id:req.params.id})
//     res.send(result);
// })



app.post("/favrt/:id/:userId",verifyToken,async(req,res)=>{
    Favrt.findOne({user:req.params.userId})
    // .populate('user')
    .exec((error,favrt)=>{
        if(error) return res.status(400).json({error});
        if(favrt)
        {
            Favrt.findOneAndUpdate({user:req.params.userId},{
                "$push":{
                    "favrtItems":req.body
                }
            })
            // .populate('user')
            .exec((error,_favrt)=>{
                if(error) return res.status(400).json({error});
                if(_favrt){
                    return res.status(201).json({favrt:_favrt});
                }
            })
            // res.status(200).json({message:cart});
        }else{
            const favrt=new Favrt({
                user:req.params.userId,
                favrtItems:[req.body]
            });
            favrt.save((error,cart)=>{
                if(error) return res.status(400).json({error});
                if(favrt){
                    return res.status(201).json({ favrt });
                }
            })
        }
    })
})


app.get("/favrt/:userId",verifyToken,async(req,res)=>{
        let cartProds=await Favrt.findOne({user:req.params.userId})
       if(cartProds)
        {
            res.send(cartProds.favrtItems)
        }else{
            res.send({result:"No Products Found"})
        }
    })

app.put("/favrt/:id/:userId",verifyToken,async(req,res)=>{
    try{
        const result=await Favrt.updateOne({user:req.params.userId},{'$pull':{"favrtItems":{id:req.params.id}}})
        res.status(200).json(result);
    }catch(e)
    {
        res.status(401).json(e);   
    }
})


app.get("/products/category/smartphones",async(req,res)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        res.send(products)
    }else{
        res.send({result:"No Products Found"})
    }
})


app.get("/products",async(req,res)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        res.send(products)
    }else{
        res.send({result:"No Products Found"})
    }
})

app.get("/products/category/laptops",async(req,res)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        res.send(products)
    }else{
        res.send({result:"No Products Found"})
    }
})

app.get("/products/category/skincare",async(req,res)=>{
    let products=await Product.find();
    if(products.length>0)
    {
        res.send(products)
    }else{
        res.send({result:"No Products Found"})
    }
})

app.get("/products/:id",verifyToken,async(req,res)=>{
   let result=await Product.findOne({_id:req.params.id});
   if(result)
   {
    res.send(result);
   }
   else{
    res.send({result:"No product found"})
   }
})

app.put("/products/:id",verifyToken,async(req,res)=>{
    let result=await Product.updateOne({_id:req.params.id},
        {
            $set: req.body
        })
        res.send(result);
})

app.get("/search/:key",verifyToken,async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
        ]
    });
    res.send(result);
})

function verifyToken(req,res,next)
{
    let token=req.headers['authorization'];
    if(token)
    {
        token=token.split(' ')[1];
        console.log("Middleware",token);
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err)
            {
                res.status(401).send({result:"Please add valid token"})   
            }else{
                next();
            }
        })
    }
    else{
        res.status(403).send({result:"Please add token with header"})
    }
    
}

app.listen(5000,()=>{
    console.log("Listening at port 5000")
})