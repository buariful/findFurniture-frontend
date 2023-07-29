import React from "react";
import CheckoutLft from "../component/checkout/CheckoutLft";
import CheckoutRgt from "../component/checkout/CheckoutRgt";
import { useState } from "react";

const Checkout = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    mblNumber: "",
  });
  const [address, setAddress] = useState({
    division: "",
    district: "",
    upazila: "",
    area: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    cost: null,
    time: 0,
  });

  const data = {
    personalInfo,
    setPersonalInfo,
    address,
    setAddress,
    shippingInfo,
    setShippingInfo,
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6 w-11/12 mx-auto">
        <div className="col-span-12 md:col-span-8">
          <CheckoutLft props={data} />
        </div>
        <div className="col-span-12 md:col-span-4 relative">
          <CheckoutRgt props={data} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
