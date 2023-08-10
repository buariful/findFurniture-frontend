import React from "react";
import { useSelector } from "react-redux";
import AdmOrders from "../component/order/AdmOrders";
import UserOrder from "../component/order/UserOrder";

const Order = () => {
  const userRole = useSelector((state) => state?.user?.data?.role);

  return userRole === "admin" ? <AdmOrders /> : <UserOrder />;
};

export default Order;
