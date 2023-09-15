import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isNotLogin = useSelector((state) => state.auth.token === "");

  if (isNotLogin) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
