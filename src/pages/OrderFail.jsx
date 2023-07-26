import React from "react";
import { AlertError } from "../utils/Alert";
import { ToastError } from "../utils/Toast";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const OrderFail = () => {
  const { trans_id } = useParams();
  const id = useRef();
  useEffect(() => {
    if (id.current !== trans_id) {
      ToastError("An error occure");
      id.current = trans_id;
    }
  }, [trans_id, id]);
  return (
    <div className="w-11/12 max-w-2xl mx-auto py-10">
      <AlertError text="Order failed. Please try again." />
    </div>
  );
};

export default OrderFail;
