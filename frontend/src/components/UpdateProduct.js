import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
function UpdateProduct() {
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const params=useParams();

    const navigate=useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails=async()=>{
        let result=await fetch(`http://localhost:5000/products/${params.id}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          } 
        });
        result=await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    const updateProduct=async()=>{    
       let result=await fetch(`http://localhost:5000/products/${params.id}`,{
         method:"Put",
         body:JSON.stringify({name,price,category,company}),
         headers:{
            "Content-Type":"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         }
       });
       result=await result.json()
       console.log(result);
       navigate("/");
    }  
  return (
    <div className='product'>
        <h2>Update Product</h2>
       <input className='inputBox' onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Enter Product Name'/>
       <input className='inputBox' onChange={(e)=>{setPrice(e.target.value)}} value={price} type="text" placeholder='Enter Product Price'/>
       <input className='inputBox' onChange={(e)=>{setCategory(e.target.value)}} value={category} type="text" placeholder='Enter Category'/>
       <input className='inputBox' onChange={(e)=>{setCompany(e.target.value)}} value={company} type="text" placeholder='Enter Product Company'/>
       <button onClick={updateProduct} className='btn btn2'>Update Product</button>
    </div>
  )
}

export default UpdateProduct
