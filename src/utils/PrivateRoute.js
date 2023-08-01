import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastError } from "./Toast";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.data.role);
  const location = useLocation().pathname;
  if (user) {
    return <Outlet />;
  } else {
    localStorage.setItem("path", location);
    ToastError("Please login first", "privateRoute_unAuthorized");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
