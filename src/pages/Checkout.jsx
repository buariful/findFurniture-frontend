import React from "react";
import CheckoutLft from "../component/checkout/CheckoutLft";
import CheckoutRgt from "../component/checkout/CheckoutRgt";

const Checkout = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6 w-11/12 mx-auto">
        <div className="col-span-12 md:col-span-8">
          <CheckoutLft />
        </div>
        <div className="col-span-12 md:col-span-4 relative">
          <CheckoutRgt />
        </div>
      </div>
    </>
  );
};

export default Checkout;
