import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './Card.css';
import favrt from '../images/favrt.png';
import './Nav.css'
import redheart from '../images/red-heart.png'
// import { myproducts } from '../constants/data';
function ProductList() {
    const[products,setProducts]=useState([]);
    const[cartProducts,setCartProducts]=useState([]);
    const [favorites, setFavorites] = useState([]);
    const [usedId,setUsedId]=useState('');
    const [toggle, setToggle] = useState("");
    const [pointer,setPointer]=useState(false);
    const [favrtProducts, setFavrtProducts] = useState([]);
    const[myfavrt,setMyFavrt]=useState(false);
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"));
        getProducts();
        getFavrt(user._id);
        setUsedId(user._id);
    },[usedId]);

    const getFavrt = async (userId) => {
      let result = await fetch(`http://localhost:5000/favrt/${userId}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      // console.log(result);
      setFavrtProducts(result);
      console.log(favrtProducts);
      // const isFavorite = favrtProducts.includes(products.id);
      // console.log(isFavorite);
      // if(isFavorite)
      // {
      //   setMyFavrt(true);
      // }
    };


    const getProducts=async()=>{
      let result=await fetch("http://localhost:5000/products",{
         headers:{
           authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         } 
      });
      result=await result.json();
      console.log(result);
      setProducts(result);
  }

    const searchHandle=async(e)=>{
        e.preventDefault();
        let key=e.target.value;
        if(key)
        {
        let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              } 
        });
        result=await result.json();
        if(result)
        {
            setProducts(result);
        }
        }
        else{
            getProducts();
        }
    }

    
  const addToCart=async(id,userId)=>{
    console.log(userId);
    const prods = products.find(obj => obj.id === id);
    console.log(id);
    console.log(products);
    console.log(prods);
    let result=await fetch(`http://localhost:5000/cart/${id}/${userId}`,{
       method:"post", 
       body:JSON.stringify(prods),
       headers:{
        "Content-Type":"application/json",
         authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
       } 
    });
    
    result=await result.json();
    

    setCartProducts([...cartProducts,result]);
    console.log(result);
}

    const addToFavrt=async(id,userId)=>{
        console.log(id);
        const prods = products.find(obj => obj.id === id);
        console.log(prods);
        let result=await fetch(`http://localhost:5000/favrt/${id}/${userId}`,{
           method:"post", 
           body:JSON.stringify(prods),
           headers:{
            "Content-Type":"application/json",
             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
           } 
        });
        
        result=await result.json();
        
        setFavorites([...favorites,result]);
        setToggle(id);
        setPointer(true);
        const isFavorite = favrtProducts.includes(id);
      // console.log(isFavorite);
      if(isFavorite)
      {
        setMyFavrt(true);
        console.log(myfavrt);
      }
      
    }

  
  return (
    <div className='checking'>
      <div className='prod-list scrolling-list'>
        <h1 style={{marginBottom:"15px",color:"aqua",fontSize:"25px"}}>Available Products</h1>
        {/* <input type="text" placeholder='Search Product' onChange={searchHandle} className='search'/> */}
        <div className='row'>
        <div className='rowed'> 
        {
        products.length>0 ? products.map((item,index)=>
        <div className='listing'>
        <div className='products'>
        <div>
        <div><img className='allprod-img' src={item.images[0]} alt=""/></div>  
        <div className='all-prod-content'>
        <div className='all-head main-head '>{item.title}</div>
        <div className='all-head all-price'>Rs.{item.price}</div>
        <div className='all-head all-categ'>{item.category}</div>
        </div>  
        <div className='block'>
        <div>
          
        {
        toggle === item.id && pointer ? 
                <img src={redheart}  className="favrt" alt="" />                                  
                 :
                <img src={favrt} onClick={()=>addToFavrt(item.id,usedId)} className="favrt" alt="" />  
        }
        
        {/* {myfavrt ? <img src={redheart}  className="favrt" alt="" /> : 
        <img src={favrt} onClick={()=>addToFavrt(item.id,usedId)} className="favrt" alt="" />} */}
        </div>   
        <div className='add' onClick={()=>addToCart(item.id,usedId)} >Add to Cart</div>
        </div>
        </div>
        </div>
        </div>    
        ):
        <h1>No result found</h1>
       }
        </div>
        </div>
    </div>
    </div>  
  )
}

export default ProductList
