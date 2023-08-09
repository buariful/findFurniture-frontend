import React from "react";
import { useSelector } from "react-redux";
import AdOrders from "../component/order/AdOrders";
import UserOrder from "../component/order/UserOrder";

const Order = () => {
  const userRole = useSelector((state) => state?.user?.data?.role);

  return userRole === "admin" ? <AdOrders /> : <UserOrder />;
};

export default Order;
