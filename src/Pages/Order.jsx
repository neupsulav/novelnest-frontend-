/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const navigate = useNavigate();

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  //   to store total amount
  const [amount, setAmount] = useState("");

  // for storing order data
  const [orderData, setOrderData] = useState({
    fname: "",
    lname: "",
    email: "",
    gender: "",
    address1: "",
    address2: "",
    city: "",
    phone: "",
  });

  // to store image
  const [image, setImage] = useState("");

  // to handle image input
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // to handle form inputs
  let name, value;
  const handleInputs = (event) => {
    name = event.target.name;
    value = event.target.value;
    setOrderData({ ...orderData, [name]: value });
  };

  // to post data to server using fetch api
  const postData = async (e) => {
    // to prevent default behaviour
    e.preventDefault();

    // using fetch API to send data to server
    const { fname, lname, email, gender, address1, address2, city, phone } =
      orderData;

    const formData = new FormData();
    formData.append("paymentProofImage", image);
    formData.set("fname", fname);
    formData.set("lname", lname);
    formData.set("email", email);
    formData.set("gender", gender);
    formData.set("address1", address1);
    formData.set("address2", address2);
    formData.set("city", city);
    formData.set("phone", phone);
    formData.set("amount", amount);

    const res = await fetch("api/createorder", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      body: formData,
    });

    // console.log(res.status);
    const response = await res.json();
    console.log(response);

    // to check for status of API post request
    if (res.status === 201) {
      toast.success("Your order has been created");
    } else {
      toast.error("Something went wrong!");
    }
  };

  //   to retrieve total purchasing amount
  const getAmount = async () => {
    const res = await fetch("/api/getCartItems", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    const response = await res.json();
    setAmount(response.totalPrice);
  };

  useEffect(() => {
    protectPath();
    getAmount();
  }, []);

  return (
    <div className="orderPage">
      <ToastContainer />
      <div className="orderFormContainer">
        <p className="orderContainerHeading1">Almost Done</p>
        <p className="orderContainerHeading2">
          Enter your personal information
        </p>

        <form onSubmit={postData}>
          <p className="orderFormSubHeading">Personal Info</p>
          <div className="orderPageInputsDiv">
            <label htmlFor="fname">FIRST NAME</label>
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="FIRST NAME"
              required
              onChange={handleInputs}
              value={orderData.fname}
            />
          </div>
          <div className="orderPageInputsDiv">
            <label htmlFor="lname">LAST NAME</label>
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="LAST NAME"
              required
              onChange={handleInputs}
              value={orderData.lname}
            />
          </div>
          <div className="orderPageInputsDiv">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              required
              onChange={handleInputs}
              value={orderData.email}
            />
          </div>
          <div className="orderPageInputsDiv">
            <label htmlFor="gender">GENDER</label>
            <input
              type="text"
              id="gender"
              name="gender"
              placeholder="Gender"
              onChange={handleInputs}
              value={orderData.gender}
            />
          </div>

          <p className="orderFormSubHeading">Address</p>
          <div className="orderPageInputsDiv">
            <label htmlFor="address1">ADDRESS LINE 1</label>
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="123 STREET NAME"
              required
              onChange={handleInputs}
              value={orderData.address1}
            />
          </div>
          <div className="orderPageInputsDiv">
            <label htmlFor="address2">ADDRESS LINE 2 (OPTIONAL)</label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="RUE / TDHS / SD"
              onChange={handleInputs}
              value={orderData.address2}
            />
          </div>
          <div className="orderPageInputsDiv">
            <label htmlFor="city">CITY</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="CITY NAME"
              required
              onChange={handleInputs}
              value={orderData.city}
            />
          </div>

          <div className="orderPageInputsDiv">
            <label htmlFor="phone">PHONE NUMBER</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="+977-98xxxxxxxx"
              required
              onChange={handleInputs}
              value={orderData.phone}
            />
          </div>

          <p className="formNoteText">
            To complete your purchase , you are required to scan the given QR
            <br />
            and make payment for the given total amount
            <br /> and upload the payment proof as an image
          </p>

          <p className="orderFormSubHeading">QR Code:</p>

          <div className="qrCode"></div>

          <p className="orderFormSubHeading">Upload payment proof image</p>
          <div className="loginFormDiv paymentProofImageUpload">
            <input
              className="signUpFormImageInput"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImage}
              required
            />
          </div>

          <p className="orderPagePuchaseAmount">{`TOTAL PURCHASE COST : Rs. ${amount}`}</p>
          <button type="submit" className="confirmPurchaseBtn">
            CONFIRM YOUR PURCHASE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Order;
