import React,{useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';
import './AddToCart.css';
import  cart2 from '../images/cart2.png'

import { Link } from 'react-router-dom';

function AddToCart() {
  const[cartProducts,setCartProducts]=useState([]);

  // const userId=JSON.parse(localStorage.getItem("user"))._id;
  useEffect(()=>{
    getCart();
  },[]);

  const getCart=async()=>{
    let result=await fetch(`http://localhost:5000/cart`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      } 
   });
   result=await result.json();
   console.log(result);
   setCartProducts(result);
  }
    
    const deleteProduct=async(id)=>{
      console.log(id);
      let result=await fetch(`http://localhost:5000/cart/${id}`,{
          method:"delete",
          headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            } 
      })
      result=await result.json()
      if(result)
      {
          alert("Product Removed");
          getCart();
      }
  }
    
  return (
    <div className='page'>
      <div className='box'>
      <p className='your'>Your Shopping Cart</p> 
        { 
            cartProducts.length>0 ? 
            cartProducts.map((list)=>(
                    // <div className='box'>
                     
                    <div className='added'>
                    <Card className='one'>  
                    <Card.Text className='two'><h3 className='heading'>Product Name:</h3>{list.name} </Card.Text>
                    <Card.Text className='two'><h3 className='heading'>Price:</h3> ${list.price}</Card.Text>
                    <Card.Text className='two'><h3 className='heading'>Category: </h3>{list.category}</Card.Text>
                    <div className='btns'>
                    <Card.Text><button className='buy'>Buy</button></Card.Text>
                    <Card.Text><button onClick={()=>deleteProduct(list._id)} className='remove'>Remove</button></Card.Text>
                    </div>
                    </Card>
                    </div> 
                    //  </div>    
               
            ))

            :
            <div>
              <img src={cart2} className="carting" alt=""/>
            <div className='shop'>
              <h1 className='empty'>Your Cart is Empty</h1>
              <Link to="/products" className='cont'>continue shopping</Link>
              </div>
            </div>  
        }
        <div className='total'>
          <p className='amt'>Subtotal:</p>
          <p className='amtadd'>$100</p>
        </div>
      </div>
    </div>
  )
}

export default AddToCart
