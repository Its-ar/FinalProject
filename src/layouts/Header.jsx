import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { children } = props;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // dispatch(resetData());
    setIsLoggedIn(true);
    navigate("/login");
  };

  const handleLogout = () => {
    
    setIsLoggedIn(false);
    navigate("/");
  };
  // const [sideBar, setSideBar] = useState(false);

  return (
    <div className="top-0 bg-blue-300 w-full h-16">
      <nav className=" px-4 py-2 flex flex-wrap items-center justify-between">
        <div className="flex items-center cursor-pointer w-full md:w-auto gap-3">
          {children}
          <h1 onClick={() => navigate("/")} className="text-2xl font-bold">
            Coffe Shop
          </h1>
        </div>
        {isLoggedIn ? (
          // If logged in, show "Logout" button
          <h1 onClick={handleLogout} className="text-2xl font-bold cursor-pointer ml-4">
            Logout
          </h1>
        ) : (
          // If not logged in, show "Login" button
          <h1 onClick={handleLogin} className="text-2xl font-bold cursor-pointer ml-4">
            Login
          </h1>
        )}
        {/* <h1 onClick={() => navigate("/login")} className="text-2xl font-bold cursor-pointer ml-4">Login</h1> */}
      </nav>
    </div>
  );
}