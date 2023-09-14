import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { children } = props;
  const navigate = useNavigate();
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
        <h1 className="text-2xl font-bold cursor-pointer ml-4">Login</h1>
      </nav>
    </div>
  );
}
