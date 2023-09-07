import React, { useState } from "react";

export default function Header(props) {
  const { children } = props;
  // const [sideBar, setSideBar] = useState(false);

  return (
    <div className="bg-blue-300 w-full h-16">
      <nav className=" p-3 flex items-center justify-between">
        <div className="flex gap-5 items-center cursor-pointer">
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
          <h1 className="text-2xl font-bold">Coffe Shop</h1>
        </div>
        <div className="flex items-center">
          <input
            type="search"
            className="rounded rounded-r-none p-2 h-8 w-64"
            placeholder="Search Product..."
          />
          <button className="rounded rounded-l-none p-2 h-8 bg-white  flex items-center">
            <i className="fa fa-search text-xl"></i>
          </button>
        </div>
        <h1 className="text-2xl font-bold cursor-pointer">Login</h1>
      </nav>
    </div>
  );
}
