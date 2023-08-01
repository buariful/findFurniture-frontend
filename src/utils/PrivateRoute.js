import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ToastError } from "./Toast";

const PrivateRoute = ({ admin }) => {
  const userRole = useSelector((state) => state.user.data.role);
  const location = useLocation().pathname;

  if (userRole) {
    if (admin && userRole.toLowerCase() === "admin") {
      return <Outlet />;
    }
    if (admin && userRole.toLowerCase() !== "admin") {
      localStorage.setItem("path", location);
      ToastError("You are not the admin");
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  } else {
    localStorage.setItem("path", location);
    ToastError("Please login first", "privateRoute_unAuthorized");
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
