/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuBadgeCheck } from "react-icons/lu";
import OurProducts from "../Components/OurProducts";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";

const Products = () => {
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  // const cookies = new Cookies();
  // const cookie = cookies.get("jwttoken");

  // const protectPath = () => {
  //   if (!cookie) {
  //     navigate("/login");
  //   }
  // };

  // to store products data
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const getAllProducts = async () => {
    const res = await fetch("/api/getproducts", {
      method: "GET",
    });

    const response = await res.json();
    console.log(response);
    setProducts(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    // protectPath();
    getAllProducts();
  }, []);

  const increaseIndex = () => {
    const newIndex = index - 1;
    if (newIndex < 0) {
      setIndex(4);
    } else {
      setIndex(newIndex);
    }
  };

  const decreaseIndex = () => {
    const newIndex = index + 1;
    if (newIndex === 5) {
      setIndex(0);
    } else {
      setIndex(newIndex);
    }
  };

  if (isDataFetched) {
    return (
      <div className="productsPage">
        <div className="productImageContainer">
          <div className="productImageContainerFirst">
            {/* <div className="productCircleImageContainer">
              <img src={products[index].images[0]} alt="product" />
            </div> */}
            <div className="productImageContainerFirstDetailsContainer">
              <div className="productImageContainerProductTitle">
                {products[index].name}
              </div>
              <div className="productImageContainerProductInfo">
                {products[index].details}
              </div>
              <button
                className="navbarBtn"
                onClick={() => {
                  navigate(`/product/${products[index]._id}`);
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="productImageContainerSecond">
            <img src={products[index].images[0]} alt="product" />
          </div>
        </div>
        {/* slider icons */}
        <div className="slidingIcons productPageSliderIcons">
          <div className="ataglanceImageIndicators">
            {products.slice(0, 5).map((item, itemIndex) => {
              return (
                <FaCircle
                  className={
                    index === itemIndex
                      ? "imageIndicators activeIndicator"
                      : "imageIndicators"
                  }
                />
              );
            })}
          </div>
          <div className="leftRightSlider">
            <FaCircleChevronLeft
              className="newsLeftRightSliderIcon"
              onClick={() => {
                increaseIndex();
              }}
            />
            <FaCircleChevronRight
              className="newsLeftRightSliderIcon"
              onClick={() => {
                decreaseIndex();
              }}
            />
          </div>
        </div>
        {/* principles  */}
        <div className="productPagePrinciples">
          <div className="productPagePrincipleItem">
            <div className="productPagePrincipleItemIcon">
              <GoTrophy className="productPagePrincipleItemIcons" />
            </div>
            <div className="productPagePrincipleItemText">
              <div className="productPagePrincipleItemTitle">Best Sellers</div>
              <div className="productPagePrincipleItemSubtitle">
                All domestic and international novels
              </div>
            </div>
          </div>
          <div className="productPagePrincipleItem">
            <div className="productPagePrincipleItemIcon">
              <LuBadgeCheck className="productPagePrincipleItemIcons" />
            </div>
            <div className="productPagePrincipleItemText">
              <div className="productPagePrincipleItemTitle">Genuine Books</div>
              <div className="productPagePrincipleItemSubtitle">
                Completely authentic books
              </div>
            </div>
          </div>
          <div className="productPagePrincipleItem">
            <div className="productPagePrincipleItemIcon">
              <LiaShippingFastSolid className="productPagePrincipleItemIcons" />
            </div>
            <div className="productPagePrincipleItemText">
              <div className="productPagePrincipleItemTitle">Free shipping</div>
              <div className="productPagePrincipleItemSubtitle">
                Across entire nation
              </div>
            </div>
          </div>
        </div>
        {/* our products container */}
        <OurProducts products={products} />
        {/* footer */}
        <Footer />
      </div>
    );
  }
};

export default Products;
