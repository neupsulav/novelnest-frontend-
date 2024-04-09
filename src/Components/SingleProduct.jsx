import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = (props) => {
  return (
    <div className="singleProduct">
      {props.originalprice && (
        <div className="offerSticker">
          <p>Offer</p>
        </div>
      )}
      <div className="singleProductImage">
        <img src={props.images[0]} alt="product" />
      </div>
      <div className="singleProductDetails">
        <p className="singleProductName">{props.name}</p>
        <p className="singleProductDetail c">
          {props.details.length > 20
            ? props.details.substring(0, 20) + "..."
            : props.details}
        </p>
        <div className="productPriceContainer">
          <p className="singleProductPrice">{`Rs. ${props.currentprice}`}</p>
          {props.originalprice && (
            <p className="singleProductOldPrice">
              <strike>{`Rs. ${props.originalprice}`}</strike>
            </p>
          )}
        </div>
      </div>

      <div className="singleProductHoverContainer">
        <Link to={`/product/${props.id}`}>
          <button className="addToCartBtn">View Product</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
