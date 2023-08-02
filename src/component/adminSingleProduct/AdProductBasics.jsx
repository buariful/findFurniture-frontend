import React from "react";
import DashboardTitle from "../shared/DashboardTitle";

const AdProductBasics = ({ data }) => {
  return (
    <>
      <div className="mt-10 mb-5">
        <DashboardTitle text="Product details" />
      </div>

      <div className="max-w-3xl w-11/12 mx-auto text-start grid grid-cols-2 gap-5 border-b border-b-blue-gray pb-5">
        <div className="mx-auto">
          <p className="capitalize">
            <span className="font-semibold">Name: </span> {data?.name}
          </p>
          <p className="capitalize">
            <span className="font-semibold ">Product code: </span>{" "}
            {data?.productCode}
          </p>
          <p className="capitalize">
            <span className="font-semibold"> Price: </span> {data?.price}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Sell Price: </span>
            {data?.sellPrice}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Discount: </span>
            {data?.discount ? data?.discount : 0} %
          </p>
        </div>

        <div className="mx-auto">
          <p className="capitalize">
            <span className="font-semibold">Brand:</span>
            {data?.brand}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Category:</span>
            {data?.category}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Avalable Colors: </span>
            {data?.colors?.map((c) => c)}
          </p>
        </div>
      </div>
    </>
  );
};

export default AdProductBasics;
