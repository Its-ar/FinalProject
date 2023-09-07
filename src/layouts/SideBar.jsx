import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div>
      {/* SideBar */}
      <div className="bg-blue-300 h-full w-28">
        <nav className="p-3 flex flex-col justify-center items-center ">
          <div className="flex flex-col items-center cursor-pointer " onClick={() => navigate("/")}>
            <i className="fa fa-home text-xl"></i>
            <h2 className="font-bold text-md mb-6 ">Home</h2>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/list")}>
            <i className="fa fa-list-ul text-xl"></i>
            <h2 className="font-bold text-sm mb-6 ">List Product</h2>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate("/history")}>
            <i className="fa fa-history text-xl"></i>
            <h2 className="font-bold text-sm mb-6  text-center">History Transaction</h2>
          </div>
        </nav>
      </div>
    </div>
  );
}
