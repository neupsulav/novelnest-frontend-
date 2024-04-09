/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";

const Users = () => {
  // to store all the users data
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  // to fetch all the users with their data
  const fetchUsers = async () => {
    const res = await fetch("/api/users", {
      method: "GET",
    });

    const response = await res.json();
    setUsers(response);
  };

  useEffect(() => {
    protectPath();
    fetchUsers();
  }, []);

  // to delete user
  const deleteUser = async (id) => {
    const res = await fetch(`/api/removeuser/${id}`, {
      method: "DELETE",
    });

    if (res.status === 401) {
      toast.error("Invalid user ID");
    } else if (res.status === 400) {
      toast.error("Process request failed");
    } else if (res.status === 200) {
      toast.success("User removed");
      fetchUsers();
    } else {
      toast.error("Something went wrong");
    }
  };

  // to change admin rights of a user
  const changeAdminRights = async (id) => {
    const res = await fetch(`/api/changeadmin/${id}`, {
      method: "PATCH",
    });

    if (res.status === 401) {
      toast.error("Invalid user ID");
    } else if (res.status === 200) {
      toast.success("User's admin privilege changed");
      fetchUsers();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="usersPage">
      <ToastContainer />
      <div className="usersContainer">
        {users.map((user) => {
          return (
            <div key={user._id} className="eachUser">
              <div className="userData">
                <p className="usersName">{user.name}</p>
                <p className="usersUserName">{user.username}</p>
                <p className="usersEmail">{user.email}</p>
                <p className="isVerifiedUser">
                  {user.isVerified ? "Verified user" : "Unverified user"}
                </p>
              </div>
              <div className="userOptions">
                <button
                  className="makeUserAdminBtn"
                  onClick={() => {
                    changeAdminRights(user._id);
                  }}
                >
                  {user.isAdmin ? "Remove Admin" : "Make Admin"}
                </button>
                <button
                  className="deleteUserBtn"
                  onClick={() => {
                    deleteUser(user._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
