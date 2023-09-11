import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { children } = props;
  const navigate = useNavigate();
  // const [sideBar, setSideBar] = useState(false);

  return (
    <div className="top-0 bg-blue-300 w-full h-16">
      <nav className=" px-4 py-2 flex flex-wrap items-center justify-between">
        <div className="flex items-center cursor-pointer w-full md:w-auto">
          {children}
          {/* {sideBar ? (
            <i
              className="	fa fa-close text-xl"
              onClick={() => setSideBar(false)}
            ></i>
          ) : (
            <i
              className="fa fa-bars text-xl"
              onClick={() => setSideBar(true)}
            ></i>
          )} */}
          <h1 onClick={() => navigate("/")} className="text-2xl font-bold">
            Coffe Shop
          </h1>
        </div>
        <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
          <input type="search" className="rounded p-2 h-8 w-full md:w-64" placeholder="Search Product..." />
          <button className="rounded p-2 h-8 bg-white flex items-center ml-2">
            <i className="fa fa-search text-xl"></i>
          </button>
        </div>
        <h1 className="text-2xl font-bold cursor-pointer ml-4">Login</h1>
      </nav>
    </div>
  );
}
