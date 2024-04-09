/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const AdminOrders = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  // to store orders data
  const [orders, setOrders] = useState();
  const [isDataFetched, setIsDataFetched] = useState(false);

  // to get all orders details
  const getOrders = async () => {
    const res = await fetch("/api/getOrders", {
      method: "GET",
    });

    const response = await res.json();
    setOrders(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    getOrders();
  }, []);

  // for approval of order
  const approveOrder = async (id) => {
    const res = await fetch(`/api/approveorder/${id}`, {
      method: "PATCH",
    });

    if (res.status === 200) {
      toast.success(
        "Order's payment has been approved. An Email has been sent to the customer"
      );
      getOrders();
    } else {
      toast.error("Something went wrong!");
    }
  };

  // for processing order
  const processOrder = async (id) => {
    const res = await fetch(`/api/processorder/${id}`, {
      method: "PATCH",
    });

    if (res.status === 200) {
      toast.success("Order's status updated to processing");
      getOrders();
    } else {
      toast.error("Something went wrong!");
    }
  };

  // for shipping order
  const shipOrder = async (id) => {
    const res = await fetch(`/api/shippedorder/${id}`, {
      method: "PATCH",
    });

    if (res.status === 200) {
      toast.success("Order's status updated to shipped");
      getOrders();
    } else {
      toast.error("Something went wrong!");
    }
  };

  // for delivering order
  const delivereOrder = async (id) => {
    const res = await fetch(`/api/deliverorder/${id}`, {
      method: "PATCH",
    });

    if (res.status === 200) {
      toast.success("Order's status updated to delivered");
      getOrders();
    } else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    protectPath();
  }, []);

  if (isDataFetched) {
    return (
      <div className="adminOrderPage">
        <ToastContainer />
        <p className="adminOrderPageTitle">Orders</p>
        <div className="adminOrderPageCategoryContainer">
          <p className="adminOrderPageSubtitle">Customer's orders</p>
          {orders.map((order, index) => {
            return (
              <div key={index} className="adminOrderItems">
                <p className="adminOrderUserName">
                  {`${order.fname} ${order.lname}`}
                </p>
                <p className="AdminPageOrderInfo">{order.email}</p>
                <p className="AdminPageOrderInfo">{order.gender}</p>
                <p className="AdminPageOrderInfo">{order.address1}</p>
                {order.address2 && (
                  <p className="AdminPageOrderInfo">{order.address2}</p>
                )}
                <p className="AdminPageOrderInfo">{order.city}</p>
                <p className="AdminPageOrderInfo">{order.phone}</p>

                <div className="adminPageOrderCartItemsContainer">
                  {order.cart.products.map((product) => {
                    return (
                      <div className="adminPageCartItems">
                        <img src={product.images[0]} alt="product" />
                        <p>{product.name}</p>
                      </div>
                    );
                  })}
                </div>
                <a
                  className="paymentProofImageLink"
                  href={order.paymentProofImage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to see payment proof
                </a>

                <p className="adminOrderTotalAmount">
                  Total Order Amount: Rs. {order.amount}
                </p>

                <div className="adminOrderContainerBtns">
                  <button
                    onClick={() => {
                      approveOrder(order._id);
                    }}
                  >
                    {order.approved ? "Payment Approved" : "Approve Payment"}
                  </button>
                  <button
                    onClick={() => {
                      processOrder(order._id);
                    }}
                  >
                    {order.processing ? "Processed" : "Process"}
                  </button>
                  <button
                    onClick={() => {
                      shipOrder(order._id);
                    }}
                  >
                    {order.shipped ? "Shipped" : "Ship"}
                  </button>
                  <button
                    onClick={() => {
                      delivereOrder(order._id);
                    }}
                  >
                    {order.delivered ? "Delivered" : "Deliver"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default AdminOrders;
