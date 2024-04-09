/* eslint-disable array-callback-return */
import React, { useState } from "react";
import SingleProduct from "./SingleProduct";

const OurProducts = ({ products }) => {
  const [noOfProductsShown, setNoOfProductsShown] = useState(12);
  const [showMoreBtnClicked, setShowMoreBtnClicked] = useState(false);

  // to show only search related products
  const [searchValue, setSearchValue] = useState("");

  const searchFun = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="ourProductsContainer">
      <p className="ourProductsContainerTitle">Our Books</p>

      <input
        type="text"
        placeholder="search books here..."
        id="book_search"
        name="search"
        onChange={searchFun}
      />

      <div className="products">
        {products
          .filter((item) => {
            return searchValue.toLocaleLowerCase() === ""
              ? item
              : item.name.toLocaleLowerCase().includes(searchValue);
          })
          .map((item, index) => {
            if (index < noOfProductsShown) {
              return (
                <SingleProduct
                  name={item.name}
                  details={item.details}
                  currentprice={item.currentprice}
                  originalprice={item.originalprice}
                  images={item.images}
                  key={item._id}
                  id={item._id}
                />
              );
            }
          })}
      </div>
      <button
        className="navbarBtn ourProductsShowMoreContainer"
        onClick={() => {
          if (showMoreBtnClicked) {
            setNoOfProductsShown(12);
          } else {
            setNoOfProductsShown(products.length);
          }

          setShowMoreBtnClicked(!showMoreBtnClicked);
        }}
      >
        {showMoreBtnClicked ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default OurProducts;
