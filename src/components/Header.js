// components/Header.js
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/reducers/userReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // Dispatch the action to reset the user state
    dispatch(actions.resetUser());
    // You may also perform additional logout logic here
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AppleRepair</h1>
        </div>
        <div>
          {user.id ? (
            <div className="flex items-center space-x-4">
              <p>{user.username}</p>
              <p>{user.role}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            // Render login or other auth-related components if user is not logged in
            <p>Not Logged In</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
