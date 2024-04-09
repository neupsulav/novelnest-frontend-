/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Admin = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  useEffect(() => {
    protectPath();
  }, []);

  return (
    <div className="adminPage">
      <div className="adminPageImageContainer">
        <p>Welcome to Admin Panel</p>
      </div>

      {/* admin access features */}
      <div className="adminActivitiesContainer">
        <h1>Admin activities</h1>
        <h6>As an admin you can access the following features</h6>

        <div className="adminActivities">
          <Link to="/admin/contactus" className="adminPageLinkTag">
            <div className="adminActivitiesItems">ContactUs</div>
          </Link>

          <Link to="/admin/products" className="adminPageLinkTag">
            <div className="adminActivitiesItems">Books</div>
          </Link>

          <Link to="/admin/orders" className="adminPageLinkTag">
            <div className="adminActivitiesItems">Orders</div>
          </Link>

          {/* <Link to="/admin/contactus" className="adminPageLinkTag">
            <div className="adminActivitiesItems">ContactUs</div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
