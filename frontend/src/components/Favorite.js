import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Favorite.css";

import { Link } from "react-router-dom";

function Favorite() {
  const [favrtProducts, setFavrtProducts] = useState([]);
  const [usedId, setUsedId] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) setUsedId(user._id);
    getFavrt(usedId);
    // getCart();
    console.log(usedId);
  }, [usedId, favrtProducts]);

  // useEffect(()=>{
  //     getFavrt();
  //   },[]);

  const getFavrt = async (userId) => {
    let result = await fetch(`http://localhost:5000/favrt/${userId}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setFavrtProducts(result);
  };

  const deleteProduct = async (id,userId) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/favrt/${id}/${userId}`, {
      method: "put",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      alert("Product Removed");
      getFavrt(usedId);
    }
  };

  return (
    <div className="pagef">

          <p className='yourf'>WISHLIST</p>
          <div className="whole-wish">
            {favrtProducts.length > 0 ? (
              favrtProducts.map((list) => (
                <div>
                  <div className="parts">
                    <div>
                      <img className="item-img" src={list.images[0]} alt="" />
                    </div>
                    <div className="favrt-content-part">
                      <h2 className="list-title">{list.title} </h2>
                      <p className="favrt-list-disc">{list.description}</p>
                      <p className="favrt-list-rate">{list.rating}/10</p>
                    </div>
                    <div className="price-part">
                      <p className="favrt-list-price">Rs.{list.price}</p>
                    </div>
                  </div>
                  <div className="favrt-btns">
                    <button
                      onClick={() => deleteProduct(list.id,usedId)}
                      className="reject"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="added-items"></div>
                </div>
              ))
            ) : (
              <div>
                <div className="shopf">
                  <h1 className="emptyf">No Products Added</h1>
                  <Link to="/products" className="contf">
                    add your favorite products
                  </Link>
                </div>
              </div>
            )}

          </div>
        {/* </div> */}

    </div>
  );
}

export default Favorite;
