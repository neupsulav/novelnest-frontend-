import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "react-toastify/dist/ReactToastify.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = (props) => {
  // for cookies
  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  // to get pathname from url
  // const location = useLocation();
  // const { pathname } = location;

  // to handle logout operation
  const handleLoginOut = () => {
    if (cookie) {
      cookies.remove("jwttoken", { path: "/" });
      window.location.reload();
    }
  };

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="navbar">
      <RxHamburgerMenu
        className="hamburgerIcon"
        onClick={() => {
          setSidebarExpanded(!sidebarExpanded);
        }}
      />
      <div className="navbarContainer">
        <Link to="/">
          <div className="navbarLogo"></div>
        </Link>

        <div className="navbarAddress"></div>

        <div className="navbarBtns">
          {props.isAdmin && (
            <Link to="/admin" className="contactUsBtn navbarBtn">
              <p>Admin</p>
            </Link>
          )}

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

          <Link to="/cart">
            {cookie && <FiShoppingCart className="cartIconNavbar" />}
          </Link>
        </div>
      </div>

      {/* for slider navbar */}
      <div
        className={
          sidebarExpanded ? "sliderNavbar sliderNavbarShow" : "sliderNavbar"
        }
      >
        <RxCross1
          className="crossIcon"
          onClick={() => {
            setSidebarExpanded(!sidebarExpanded);
          }}
        />

        <div className="sideBavbarBtns">
          {props.isAdmin && (
            <Link to="/admin" className="contactUsBtn navbarBtn">
              <p>Admin</p>
            </Link>
          )}

          <Link to="/contactus" className="contactUsBtn navbarBtn">
            <p>CONTACT US</p>
          </Link>

          <Link to="/cart" className="contactUsBtn navbarBtn">
            <p>Cart</p>
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
      {/* end of slider navbar */}
    </div>
  );
};

export default Navbar;
