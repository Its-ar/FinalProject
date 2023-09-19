import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthData } from "../Store/AuthSlice";

export default function Header(props) {
  const { children } = props;
  const navigate = useNavigate();
  // const [sideBar, setSideBar] = useState(false);
  const dispatch = useDispatch();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    dispatch(resetAuthData());
    navigate("/");
  };

  const handleToggleLogoutMenu = () => {
    setShowLogoutMenu((prevShowLogoutMenu) => !prevShowLogoutMenu);
  };
  const isLoggedIn = useSelector((state) => state.auth.token !== "");

  return (
    <div className="top-0 bg-blue-300 w-full h-16">
      <nav className=" px-4 py-2 flex md:flex-wrap items-center justify-between">
        <div className="flex items-center cursor-pointer w-full md:w-auto gap-3">
          {children}
          <h1 onClick={() => navigate("/")} className="text-2xl font-bold">
            Coffe Shop
          </h1>
        </div>
        {isLoggedIn ? (
          <div className="relative font-semibold text-xl">
            <div onClick={handleToggleLogoutMenu} className="font-semibold text-xl px-4 py-1 rounded-md text-black hover:text-white transition hover:bg-gray-800 duration-200 ease-in cursor-pointer">
              {storedUser.username}
            </div>
            {showLogoutMenu && (
              <div className="absolute top-8 right-0 bg-white shadow-md py-2 px-4 rounded-md">
                <div onClick={handleLogout} className="cursor-pointer">
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div onClick={() => navigate("/login")} className="font-semibold text-xl px-4 py-1 rounded-md text-black hover:text-white transition hover:bg-gray-800 duration-200 ease-in">
            Login
          </div>
        )}
      </nav>
    </div>
  );
}
