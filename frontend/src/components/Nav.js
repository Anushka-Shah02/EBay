import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import cart from '../images/cart.png'
import './Nav.css';
import myprofile from '../images/myprofile.png'
import myorders from '../images/myorders.png'
import mywish from '../images/wishlist.png'
import logouticon from '../images/logout.png'
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BsFillCartCheckFill } from "react-icons/bs";
import { VscTasklist } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";

function Nav(props) {
  const auth=localStorage.getItem("user");

  const[count,setCount]=useState('0');
  const[amt,setAmt]=useState('0')
  const[cartProducts,setCartProducts]=useState('');
  const [usedId,setUsedId]=useState('');
  const user=JSON.parse(localStorage.getItem("user"));
  const[openpro,setOpenPro]=useState(false);
  const [products, setProducts] = useState([]);
  const [smart, setSmart] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [skincare, setSkincare] = useState([]);
  useEffect(()=>{
    if(user)
    setUsedId(user._id);
    getCart(usedId);
    console.log(usedId)
  },[usedId,cartProducts]);

  const getCart=async(userId)=>{
    let result=await fetch(`http://localhost:5000/cart/${userId}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      } 
   });
   result=await result.json();
   console.log(result);
   setCartProducts(result);
   setCount(result.length);
  //  setIsHovering(false);
   setAmt(amt);
  //  setOpenPro(false);
  }
    
  //   const deleteProduct=async(id,userId)=>{
  //     console.log(id);
  //     let result=await fetch(`http://localhost:5000/cart/${id}/${userId}`,{
  //         method:"delete",
  //         headers:{
  //             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
  //           } 
  //     })
  //     result=await result.json()
  //     if(result)
  //     {
  //         alert("Product Removed");
  //         getCart(usedId);
  //         // getCart();
  //     }
  // }

  // const handleCount=async()=>{
  //   let result=await fetch("http://localhost:5000/cart",{
  //     headers:{
  //       authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
  //     } 
  //  });
  //  result=await result.json();
  //  console.log(result);
  //  setCount(result.length);
  // }
  

  const navigate=useNavigate();
  const logout=()=>{
    localStorage.clear();
    navigate('/signup')
    setOpenPro(false);
  }

  const searchHandle = async (e) => {
    e.preventDefault();
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      // getProducts();
      getSmartProducts();
      getLaptopProducts();
      getSkinProducts();
    }
  };

  const getSmartProducts = async () => {
    let result = await fetch("http://localhost:5000/products/category/smartphones", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setSmart(result);
  };

  const getLaptopProducts = async () => {
    let result = await fetch("http://localhost:5000/products/category/laptops", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setLaptops(result);
  };

  const getSkinProducts = async () => {
    let result = await fetch("http://localhost:5000/products/category/skincare", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setSkincare(result);
  };


  return (
    <div >
    <div className='navbar'>
     {auth ? <ul className='nav-ul nav-right'>
        <ul className='heads'>
          <li><img src={logo} className='logo' alt=""/></li>
          <li><p className='logo2'>ebay</p></li>
          <li><Link to='/'>Home</Link></li>
        <li><Link to='/products'>Products</Link></li>
        {/* <li><Link to='/add'>Add Product</Link></li> */}
        <li><Link to='/favrt'>Favorites</Link></li>
        <li>
        <input
          type="text"
          placeholder="Search for anything"
          onChange={searchHandle}
          className="searchme"
        />
        <button className="searchme-btn">Search</button>
        </li>
        </ul>
        {/* <li> */}
        <li className='logout' onClick={()=>setOpenPro(!openpro)}>
                  <FaUserCircle className="curs" size="30" color="#ced0d2"/>
                  <IoMdArrowDropdown className="curs" size="20" color="#ced0d2"/>
                {/* </div> */}
        </li>
        {/* <li><img className='logout' src={User} onMouseOver={handleMouseOver} onClick={handleMouseOut} alt=""/></li> */}
       
        {/* <li><Link className='logout' onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li> */}
        {/* <li><Link to='/cart'><img className='cart' onClick={handleCount} src={cart} alt="/"/><sup className='num'>{count}</sup></Link></li> */}
        
        <li className='disp-right'>

        <div>  
        <Link to='/cart'>
        <img className='cart' src={cart} alt="/"/><sup className='num'>{count}</sup>
        </Link>
        </div>
        </li>  

        {openpro && 
        <div className='account-block'>
            <div className="act-section">
            <div className='block1'>
              {/* <img className='act-img' src={myprofile} alt=""/> */}
              <CgProfile className='act-img'/>
              <div className='act-content'>
              <Link to='/profile' className='act-logout' onClick={()=>setOpenPro(false)}><h1>My Profile</h1></Link>
                <p>Edit your basic details</p>
              </div>
            </div>

            <div className='block1'>
              {/* <img  className='act-img' src={myorders} alt=""/> */}
              <BsFillCartCheckFill className='act-img'/>
              <div className='act-content'>
                <h1>My Orders</h1>
                <p>View,Track,Cancel Orders</p>
              </div>
            </div>

            <div className='block1'>
              {/* <img className='act-img' src={mywish} alt=""/> */}
              <VscTasklist className='act-img'/>
              <div className='act-content'>
                <Link to='/favrt' className='act-logout' onClick={()=>setOpenPro(false)} ><h1>My Wishlist</h1></Link> 
                <p>Have a look at your favorite products</p>
              </div>
            </div>

            <div className='block1'>
              {/* <img className='act-img' src={logouticon} alt=""/> */}
              <MdLogout className='act-img'/>
              <div className='act-content'>
                <Link className='act-logout' onClick={logout} to='/signup'><h1>LogOut</h1></Link>
              </div>
            </div>
            </div>
        </div>
        }

        
        
      </ul>:

      <ul className='nav-ul nav-right'>
        <li><img src={logo} className='logo' alt=""/></li>
          <li><p className='logo2'>ebay</p></li>
        <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/login'>Login</Link></li>
      </ul>
      }
    </div>
    </div>
  )
}

export default Nav
