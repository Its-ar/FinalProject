import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const { children } = props;
  const navigate = useNavigate();

  return (
    <div className="bg-blue-300">
      <nav className="container mx-auto flex flex-wrap:flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          {children}
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer m-3">
            Coffee Shop
          </h1>
        </div>
        <div className="flex items-center mt-4 md:mt-0 items-center justify between">
          <input
            type="search"
            className="rounded p-2 h-8 w-full md:w-64 "
            placeholder="Search Product..."
          />
          <button className="rounded p-2 h-8 bg-white flex items-center ml-2">
            <i className="fa fa-search text-xl"></i>
          </button>
          <h1 className="text-2xl font-bold cursor-pointer ml-4">Login</h1>
        </div>
      </nav>
    </div>
  );
}
