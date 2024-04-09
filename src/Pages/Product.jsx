/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const Product = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  // to store review details
  const [review, setReview] = useState({
    rating: "",
    reviewContent: "",
  });

  // to handle change in review inputs
  let name, value;
  const handleInputs = (event) => {
    name = event.target.name;
    value = event.target.value;

    setReview({ ...review, [name]: value });
  };

  const postReview = async (e) => {
    // to prevent default behaviour
    e.preventDefault();

    const { rating, reviewContent } = review;

    const res = await fetch(`/api/addreview/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie}`,
      },
      body: JSON.stringify({
        rating: rating,
        reviewContent: reviewContent,
      }),
    });

    // const response = await res.json();
    // console.log(response);

    // showing error notifications
    if (res.status === 200) {
      toast.success("Review added");
      fetchProduct();
    } else {
      toast.error("Something went wrong");
    }
  };

  const [index, setIndex] = useState(0);

  const increaseIndex = () => {
    const newIndex = index - 1;
    if (newIndex < 0) {
      setIndex(product.images.length - 1);
    } else {
      setIndex(newIndex);
    }
  };

  const decreaseIndex = () => {
    const newIndex = index + 1;
    if (newIndex === product.images.length) {
      setIndex(0);
    } else {
      setIndex(newIndex);
    }
  };

  // to fetch a product
  const fetchProduct = async () => {
    const res = await fetch(`/api/getproduct/${id}`, {
      method: "GET",
    });

    const response = await res.json();

    setProduct(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    protectPath();
    fetchProduct();
  }, [id]);

  // to add products in cart
  const addToCart = async () => {
    const res = await fetch(`/api/addcartitem/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (res.status === 200) {
      toast.success("Product added to cart");
    } else {
      toast.error("Something went wrong!");
    }
  };

  if (isDataFetched) {
    return (
      <div className="singleProductPage">
        <ToastContainer />
        <div>
          <div className="newsSlider productPageSlider">
            <div className="productImage">
              <img src={product.images[index]} alt="product" />
            </div>
            <div className="newsData">
              <p className="productName">{product.name}</p>
              <p className="productDetails">{product.details}</p>
              <div className="productPrices">
                <p className="productCurrentPrice">
                  Rs. {product.currentprice}
                </p>
                {product.originalprice && (
                  <p className="produceOriginalPrice">
                    <strike>Rs. {product.originalprice}</strike>
                  </p>
                )}
              </div>
              <div className="productPageBtns">
                <button className="navbarBtn" onClick={addToCart}>
                  Add to cart
                </button>
                <button
                  className="navbarBtn"
                  onClick={() => {
                    navigate(`/cart`);
                  }}
                >
                  View cart
                </button>
              </div>
            </div>
          </div>

          {/* icons */}
          <div className="slidingIcons">
            <div className="ataglanceImageIndicators">
              {product.images.map((item, itemIndex) => {
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
        </div>

        <div className="reviewComponent">
          <div className="reviewForm">
            <form onSubmit={postReview}>
              <div>
                <label htmlFor="review">Write a customer review:</label>
                <textarea
                  rows={5}
                  cols={20}
                  type="text"
                  name="reviewContent"
                  id="review"
                  placeholder="write your review here"
                  required
                  onChange={handleInputs}
                />
              </div>

              <div>
                <label for="rating">Rate this book:</label>
                <select
                  id="rating"
                  name="rating"
                  onChange={handleInputs}
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <button type="submit" className="navbarBtn">
                Submit
              </button>
            </form>
          </div>

          {product.reviews.length > 0 && <h1>User reviews</h1>}

          {product.reviews.length > 0 &&
            product.reviews.map((review) => {
              return (
                <div className="reviewItem">
                  <div className="reviewItemUserImage">
                    <img src={review.userImage} alt="harry potter" />
                  </div>
                  <div className="reviewItemTextContent">
                    <p className="reviewItemUsername">{review.username}</p>
                    {/* <p className="reviewItemUserVerification">verification</p> */}
                    <p className="reviewItemRating">
                      Rating: {review.rating}/5
                    </p>
                    <p className="reviewItemReview">{review.reviewContent}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default Product;
