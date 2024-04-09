/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState();

  const fetchCartItems = async () => {
    const res = await fetch("/api/getCartItems", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setCartItems(response);
    console.log(cartItems);
    setIsLoaded(true);
  };

  useEffect(() => {
    protectPath();
    fetchCartItems();
  }, []);

  const removeCartItems = async (id) => {
    const res = await fetch(`/api/removecartitems/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (res.status === 200) {
      toast.success("Product removed from cart");
      fetchCartItems();
    } else {
      toast.error("Something went wrong!");
    }
  };

  if (isLoaded) {
    return (
      <div className="cartPage">
        <ToastContainer />
        <div className="cartContainer">
          <p className="cartContainerTitle">Your Cart</p>
          {cartItems.usersCart.products.map((item, index) => {
            return (
              <div key={index} className="cartItems">
                <div className="cartItemsDetails">
                  <div className="cartItemsImage">
                    <img src={item.images[0]} alt="cart item" />
                  </div>
                  <div>
                    <p className="cartItemsName">{item.name}</p>
                    <p className="cartItemsPrice">{`Rs. ${item.currentprice}`}</p>
                  </div>
                </div>

                <button
                  className="removeCartItemsBtn"
                  onClick={() => {
                    removeCartItems(item._id);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <div className="cartPriceAndBuyOptions">
            <p>Total price: Rs. {cartItems.totalPrice}</p>
            {cartItems.totalPrice > 0 && (
              <button
                className="buyCartItemsBtn"
                onClick={() => {
                  navigate("/order");
                }}
              >
                Proceed To Buy
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;
