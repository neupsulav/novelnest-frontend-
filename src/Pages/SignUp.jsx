import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  // to store form data
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
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
    setUserData({ ...userData, [name]: value });
  };

  // to post data to server using axios
  const postData = async (e) => {
    // to prevent default behaviour
    e.preventDefault();

    // using fetch API to send data to server
    const { name, username, email, password, cpassword } = userData;

    const formData = new FormData();
    formData.append("image", image);
    formData.set("name", name);
    formData.set("username", username);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("cpassword", cpassword);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    // console.log(res.status);
    const response = await res.json();
    console.log(response);

    // to check for status of API post request
    if (res.status === 201) {
      toast.success("An email has been sent, please verify your email.");
    } else if (res.status === 403) {
      toast.error("Username or email already exists!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="loginPage">
      <ToastContainer />
      <p className="loginpageTitle">Sign Up</p>

      <div className="loginForm">
        <form onSubmit={postData}>
          <div className="loginFormDiv">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              required
              value={userData.name}
              onChange={handleInputs}
            />
          </div>
          <div className="loginFormDiv">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              required
              value={userData.username}
              onChange={handleInputs}
            />
          </div>
          <div className="loginFormDiv">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@gmail.com"
              required
              value={userData.email}
              onChange={handleInputs}
            />
          </div>
          <div className="loginFormDiv">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={userData.password}
              onChange={handleInputs}
            />
          </div>
          <div className="loginFormDiv">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="Enter your password again"
              required
              value={userData.cpassword}
              onChange={handleInputs}
            />
          </div>

          <div className="loginFormDiv">
            <label htmlFor="cpassword">Your Image</label>
            <input
              className="signUpFormImageInput"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
