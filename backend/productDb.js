const connectDB=require('./db/config');
const Product=require("./db/Product");

const productJson=require("./products.json");

const start=async()=>{
    try{
        // await connectDB("mongodb://localhost:27017/eCommerce");
        await Product.create(productJson);
    }catch(error)
    {
        console.log(error);
    }
}    
start();