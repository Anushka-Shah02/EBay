import React,{useState,useEffect} from 'react'
import  cart2 from '../images/cart2.png'
import { Link } from 'react-router-dom';
import './Cart.css'

function Cart() {

  const[count,setCount]=useState('0');
  const[amt,setAmt]=useState('0')
  const[cartProducts,setCartProducts]=useState('');
  const [usedId,setUsedId]=useState('');
  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    if(user)
    setUsedId(user._id);
    getCart(usedId);
    console.log(usedId)
  },[usedId,cartProducts]
  );

  const getCart=async(userId)=>{
    var amount=0;
    let result=await fetch(`http://localhost:5000/cart/${userId}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      } 
   });
   result=await result.json();
   console.log(result);
   setCartProducts(result);
   setCount(result.length);
   console.log(count);
   for(let i=0;i<count;i++){
      amount+=result[i].price;
      console.log(amount);
      setAmt(amount);
   }
  //  localStorage.setItem('count',count);
  //  setAmt(amount);
  }
    
    const deleteProduct=async(id,userId)=>{
      console.log(id);
      let result=await fetch(`http://localhost:5000/cart/${id}/${userId}`,{
          method:"put",
          headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            } 
      })
      result=await result.json()
      if(result)
      {
          alert("Product Removed");
          getCart(usedId);
      }
  }

  return (
    <div className='carts-page'>
     <div className='whole-cart'>
      <div className='two-part'>
      <p className='your-cart'>YOUR CART</p> 
      <div className=''>
        { 
            cartProducts.length>0 ? 
            cartProducts.map((list)=>(
                     
                    <div >  
                    <div className='parts'>
                        <div>
                        <img className='item-img' src={list.images[0]} alt=""/>    
                        </div>
                        <div className='content-part'>
                        <h2 className='list-title'>{list.title} </h2>
                        <p className='list-disc'>{list.description}</p>
                        <p className='list-rate'>{list.rating}/10</p>
                        </div>
                        <div className='price-part'>
                        <p className='list-price'>Rs.{list.price}</p>
                        {/* <h3>{list.discountPercentage}</h3> */}
                        </div>
                    </div>    
                    <div className='mybtns'>
                    <button className='purchase'>Move to Wishlist</button>
                    <button onClick={()=>deleteProduct(list.id,usedId)} className='reject'>Remove</button>
                    </div>
                    <div className='added-items'></div>
                    </div>
               
            ))

            :
            <div className='hollowcart'>
              <img src={cart2} className="mycartimg" alt=""/>
            <div className='shopify'>
              <h1 className='emptycart'>Your Cart is Empty</h1>
              <Link to="/products"><h3 className='continue-shop'>continue shopping</h3></Link>
              </div>
            </div>  
        }
        </div>
        {cartProducts.length>0 && 
        <div>
        <div className='mydelivery'>
        <h2>Delivery Options</h2>  
        <p>Express Delivery by 9:00pm today Order within <span style={{color:'gold'}}>3hrs 4min</span></p>
        <p>Standard Delivery by Tomorrow</p>
         </div>

        <div className='mytotal'>
          <h2>Order Summary ({cartProducts.length} items)</h2>  
          <div className='order-cont'>
          <p className='myamt'>Original Price:</p><p className='right-cont'>Rs.{amt}</p>
          </div>    
          <div className='order-cont'>
          <p>Delivery:</p><p className='right-cont'>Rs.60</p>
          </div>  
          <div className='order-cont'>
          <p className='myamtadd'>Total</p><p className='right-cont'>Rs.{amt+60}</p>
           </div> 
          <button className='checkout'>CHECKOUT</button>
        </div>
        </div>      
        }
      </div>
    </div>
    </div>
  )
}

export default Cart
