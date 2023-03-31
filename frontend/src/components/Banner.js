import { bannerData } from "../constants/data";
import "./Banner.css";
// import ProductList from './ProductList';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Card.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom'
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";

const Banner = () => {
  const [products, setProducts] = useState([]);
  const [smart, setSmart] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [skincare, setSkincare] = useState([]);
  useEffect(() => {
    getSmartProducts();
    getLaptopProducts();
    getSkinProducts();
  }, []);

  //   const getProducts=async()=>{
  //     let result=await fetch("https://dummyjson.com/products",{
  //        headers:{
  //          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
  //        }
  //     });
  //     result=await result.json();
  //     console.log(result);
  //     setProducts(result);
  // }
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

  return (
    <div className="banner">
      <div className="boxing">
        {/* <p className="logging">ebay</p>
        <a className="categ" href="/products">
          Shop by category
          <i class="fa fa-angle-down" style={{ marginLeft: "5px" }}></i>
        </a> */}
        {/* <input
          type="text"
          placeholder="Search for anything"
          onChange={searchHandle}
          className="search"
        />
        <button className="search-btn">Search</button> */}
      </div>

      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
        autoplay={{
          delay:1500
        }}
        loop={true}
      >
        {bannerData.map((image) => (
          <SwiperSlide>
            <img src={image} className="image" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="prod-list">
        <div className="row">
          <div className="rowed">
            <p className="trend">Best of Smartphones</p>
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              navigation
              // loop={true}
            >
            {smart.filter(product=>product.category==='smartphones').map((item, index) => (
              <SwiperSlide className="smartlisting">
                <div className="smartproducts">
                  <div>
                      <img className="smart-prod-img" src={item.images[0]} alt="" />
                    </div>
                    <div className="display-cont">
                    <div className="smarthead smarttitle">{item.title}</div>
                    <div className="smarthead">{item.description}</div>
                    <div className="smarthead smartprice">Rs.{item.price}</div>
                    <div className="smarthead">{item.brand}</div>
                    </div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <p className="explore">Explore Now !</p>
              <Link to='/products'><button className="view-btn">View All Products</button></Link>
            </SwiperSlide>
            </Swiper>
            
          </div>
          
          <hr style={{height:"3px",borderwidth:"0",color:"gray",backgroundcolor:"gray",marginTop:"15px"}}/>     

          <div className="rowed">
            <p className="trend">Best of Laptops</p>
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              navigation
              // loop={true}
            >
              {laptops.filter(product=>product.category==='laptops').map((item, index) => (
              <SwiperSlide className="smartlisting">
                <div className="smartproducts">
                    <div>
                      <img className="smart-prod-img" src={item.images[0]} alt="" />
                    </div>
                    <div className="display-cont">
                    <div className="smarthead smarttitle">{item.title}</div>
                    <div className="smarthead">{item.description}</div>
                    <div className="smarthead smartprice">Rs.{item.price}</div>
                    <div className="smarthead">{item.brand}</div>

                    </div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide>
            <p className="explore">Explore Now !</p>
              <Link to='/products'><button className="view-btn">View All Products</button></Link>
            </SwiperSlide>
            </Swiper>
           
          </div>

           <hr style={{height:"3px",borderwidth:"0",color:"gray",backgroundcolor:"gray",marginTop:"15px"}}/>     
          <div className="rowed">
            <p className="trend">Best of Skincare</p>
            <Swiper
              modules={[Navigation]}
              slidesPerView={4}
              navigation
              // loop={true}
            >
             {skincare.filter(product=>product.category==='skincare').map((item, index) => (
              <SwiperSlide className="smartlisting">
                <div className="smartproducts">
                    <div>
                      <img className="smart-prod-img" src={item.images[0]} alt="" />
                    </div>
                    <div className="display-cont">
                    <div className="smarthead smarttitle">{item.title}</div>
                    <div className="smarthead">{item.description}</div>
                    <div className="smarthead smartprice">Rs.{item.price}</div>
                    <div className="smarthead">{item.brand}</div>
                    </div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide>
            <p className="explore">Explore Now !</p>
              <Link to='/products'><button className="view-btn">View All Products</button></Link>
            </SwiperSlide>
            </Swiper>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
