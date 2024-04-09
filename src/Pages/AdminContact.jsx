/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AdminContact = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  const [data, setData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const getContactData = async () => {
    const res = await fetch("/api/getcontactdata", {
      method: "GET",
    });

    const response = await res.json();
    setData(response);
    setIsDataFetched(true);
  };

  useEffect(() => {
    protectPath();
    getContactData();
  }, []);

  if (isDataFetched) {
    return (
      <div className="adminContactPage">
        {data.length === 0 ? (
          <p className="adminContactPageTitle">No messages to show</p>
        ) : (
          <p className="adminContactPageTitle">User messages</p>
        )}

        <div className="adminContactPageContainer">
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <div key={index} className="adminContactPageItems">
                  <p className="adminContactItemName">{item.name}</p>
                  <p className="adminContactItemEmail">{item.email}</p>
                  <p className="adminContactItemSubject">
                    Subject: {item.subject}
                  </p>
                  <p className="adminContactItemMessage">
                    Message: {item.message}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

export default AdminContact;
