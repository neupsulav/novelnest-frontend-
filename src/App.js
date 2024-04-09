import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import Admin from "./Pages/Admin";
import Cookies from "universal-cookie";
import Users from "./Pages/Users";
import AdminProducts from "./Pages/AdminProducts";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import AdminOrders from "./Pages/AdminOrders";
import AdminContact from "./Pages/AdminContact";

const App = () => {
  const [isAdmin, setIsAdmin] = useState();

  // admin verification function
  const adminVerification = async (cookie) => {
    const res = await fetch("/api/isadmin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
    });

    if (res.status === 202) {
      setIsAdmin(true);
    }
  };

  // adding admin verification
  useEffect(() => {
    // accessing the cookie
    const cookies = new Cookies();
    const cookie = cookies.get("jwttoken");

    if (cookie) {
      adminVerification(cookie);
    }
  }, []);

  return (
    <>
      {/* <GetInTouch /> */}
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/contactus" element={<AdminContact />} />
      </Routes>
    </>
  );
};

export default App;
