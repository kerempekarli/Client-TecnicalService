// components/Header.js
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/reducers/userReducer";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // Dispatch the action to reset the user state
    dispatch(actions.resetUser());
    // You may also perform additional logout logic here
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex">
      <button onClick={() => router.back()} className="text-5xl ml-5 absolute items-center">
        &lt;
      </button>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
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
            <Link href="/login">
              <div className=" bg-green-500 px-10 rounded-md py-2 text-2xl my-2 text-white">
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
