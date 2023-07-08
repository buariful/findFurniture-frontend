import { Button } from "@material-tailwind/react";
import React from "react";

const CheckoutRgt = () => {
  return (
    <div className="shadow px-5 py-10 rounded-lg bg-[#e4ebf5c9] mb-16 md:fixed md:top-1/2 md:-translate-y-1/2">
      <h2 className="text-xl font-semibold my-3 inline-block">Your Order</h2>

      <div className="py-2 border-b border-b-gray  flex justify-end gap-3">
        <h4 className="">Total product cost:</h4>
        <h4 className="font-semibold ">Tk 50000</h4>
      </div>

      <div className="py-2 border-b border-black  flex justify-end gap-3">
        <div>
          <h4 className="">Shipping cost:</h4>

          <span className="text-red-400 text-sm">
            (Product will be deleverd within 2-3 days)
          </span>
        </div>
        <h4 className="font-semibold ">Tk 50000</h4>
      </div>

      <div className="py-2 flex justify-end gap-3 text-lg">
        <h4 className="font-semibold">Total cost:</h4>
        <h4 className="font-bold text-blue-600 ">Tk 50000</h4>
      </div>
      <div className="text-center mt-6">
        <Button type="submit">Order</Button>
      </div>
    </div>
  );
};

export default CheckoutRgt;
