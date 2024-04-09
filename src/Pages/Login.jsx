import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const Login = () => {
  const navigate = useNavigate();

  // for cookies
  const cookies = new Cookies();

  // to store login credentials
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  // to handle change in inputs
  let name, value;
  const handleInputs = (event) => {
    name = event.target.name;
    value = event.target.value;

    setuser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    // to prevent default behaviour
    e.preventDefault();

    const { email, password } = user;

    // to post data through api
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const response = await res.json();

    // showing error notifications
    if (res.status === 400) {
      toast.error("Please fill all the credentials");
    } else if (res.status === 401) {
      toast.error("Invalid user credentials");
    } else if (res.status === 406) {
      toast.error("Email is not verified, please verify your account");
    } else if (res.status === 200) {
      navigate("/");

      // to refresh the page
      window.location.reload();

      // to store login token in cookies
      cookies.set("jwttoken", response.token, {
        path: "/",
        expires: new Date(Date.now() + 2629800000),
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="loginPage">
      <ToastContainer />
      <p className="loginpageTitle">WELCOME BACK!</p>
      <p className="loginPageSubtitle">
        Don't have a account?{" "}
        <Link className="signUpLink" to="/signup">
          <span>Sign Up</span>
        </Link>
      </p>

      <div className="loginForm">
        <form onSubmit={postData}>
          <div className="loginFormDiv">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@gmail.com"
              required
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
              onChange={handleInputs}
            />
          </div>

          {/* login form options */}
          <div className="loginFormOptions">
            <div className="remembermeOption">
              <input type="checkbox" name="rememberme" id="rememberme" />
              <p>Remember Me</p>
            </div>

            <div className="forgetPasswordOption">
              {/* <p>Forget Password?</p> */}
            </div>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
