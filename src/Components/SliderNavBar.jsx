import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const SliderNavBar = (props) => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  // to get pathname from url
  const location = useLocation();
  const { pathname } = location;

  // to handle logout operation
  const handleLoginOut = () => {
    if (cookie) {
      cookies.remove("jwttoken", { path: "/" });
      window.location.reload();
    }
  };
  return (
    <div className="sliderNavbar">
      <div className="navbarLogo"></div>
      <div className="sliderNavbarAddress">
        <Link
          to="/"
          className={pathname === "/" ? "navbarLink activeLink" : "navbarLink"}
        >
          HOME
        </Link>
        <Link
          to="/news"
          className={
            pathname === "/news" ? "navbarLink activeLink" : "navbarLink"
          }
        >
          NEWS
        </Link>
        <Link
          to="/campaigns"
          className={
            pathname.startsWith("/campaigns")
              ? "navbarLink activeLink"
              : "navbarLink"
          }
        >
          CAMPAIGNS
        </Link>
        <Link
          to="/aboutus"
          className={
            pathname === "/aboutus" ? "navbarLink activeLink" : "navbarLink"
          }
        >
          ABOUT US
        </Link>

        <Link
          to="/blogs"
          className={
            pathname.startsWith("/blogs")
              ? "navbarLink activeLink"
              : "navbarLink"
          }
        >
          BLOGS
        </Link>
        <Link
          to="/getinvolved"
          className={
            pathname === "/getinvolved" ? "navbarLink activeLink" : "navbarLink"
          }
        >
          GET INVOLVED
        </Link>
        <Link
          to="/letsdiscuss"
          className={
            pathname === "/letsdiscuss" ? "navbarLink activeLink" : "navbarLink"
          }
        >
          LET'S DISCUSS
        </Link>
        <Link
          to="/products"
          className={
            pathname.startsWith("/product")
              ? "navbarLink activeLink"
              : "navbarLink"
          }
        >
          PRODUCTS
        </Link>

        {props.isAdmin && (
          <Link
            to="/admin"
            className={
              pathname.startsWith("/admin")
                ? "navbarLink activeLink"
                : "navbarLink"
            }
          >
            ADMIN
          </Link>
        )}
      </div>

      <div className="navbarBtns">
        <Link to="/contactus" className="contactUsBtn navbarBtn">
          <p>CONTACT US</p>
        </Link>

        <Link
          to="/login"
          className="loginBtn navbarBtn"
          onClick={handleLoginOut}
        >
          <p>{cookie ? "LOG OUT" : "LOGIN"}</p>
        </Link>
      </div>
    </div>
  );
};

export default SliderNavBar;
