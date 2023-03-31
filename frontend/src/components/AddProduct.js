import React, { useState } from 'react'
import '../App.css';

function AddProduct() {
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const[error,setError]=useState(false);
    // const[image,setImage]=useState("");
    // console.log(image);

    const addProduct=async()=>{
        if(!name || !price || !category || !company 
          // || !image
          )
        {
            setError(true);
            return false;
        }
        const userId=JSON.parse(localStorage.getItem("user"))._id;
        // const formData=new FormData()

        // formData.append('name',name)
        // formData.append('price',price)
        // formData.append('category',category)
        // formData.append('company',company)
        // formData.append('image',image)
        // formData.append('userId',userId)
        let result=await fetch("http://localhost:5000/add-product",{
            // formData,
            method:"post",
            body:JSON.stringify({name,price,category,company,userId}),
              // image,
            headers:{
                "Content-Type":"application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        console.log(result);
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
        // setImage("");
    }
  return (
    <div className='product'>
      {/* <form  encType="multipart/form-data"> */}
      <input className='inputBox' onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Product Name'/>
      {error && !name && <span className='error'>Enter valid name</span> }
       <input className='inputBox' onChange={(e)=>setPrice(e.target.value)} value={price} type="text" placeholder='Enter Product Price'/>
      {error && !price && <span className='error'>Enter valid price</span> } 
       <input className='inputBox' onChange={(e)=>setCategory(e.target.value)} value={category} type="text" placeholder='Enter Category'/>
       {error && !category && <span className='error'>Enter valid category</span> }
       <input className='inputBox' onChange={(e)=>setCompany(e.target.value)} value={company} type="text" placeholder='Enter Product Company'/>
       {error && !company && <span className='error'>Enter valid company</span> }
       {/* <input type="file" className="file" name="image" onChange={(e)=>setImage(e.target.files[0])}/> */}
       {/* {error && !image && <span className='error'>Enter Product Image</span> } */}
       <button onClick={addProduct} className='addbtn addbtn2'>Add Product</button>
       {/* </form>   */}
    </div>
  )
}

export default AddProduct
