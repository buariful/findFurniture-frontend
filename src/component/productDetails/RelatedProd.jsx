import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const RelatedProd = () => {
  return (
    <div>
      <h3 className="font-semibold text-start pb-2 border-b border-b-blue-600 mb-4">
        Related Products
      </h3>

      <div className="flex gap-3 items-center mb-4">
        <img
          src="https://res.cloudinary.com/dygolqxi7/image/upload/v1689409810/findFurniture/po3hmp17xxc90soep6lq.jpg"
          alt=""
          className="w-[100px] rounded"
        />

        <div className="text-start">
          <p className="capitalize text-md mb-1 font-semibold">Product name</p>
          <p className="text-blue-500 font-semibold">Tk 555</p>
          <Link to="/product/dddd">
            <Button size="sm">Details</Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-3 items-center mb-4">
        <img
          src="https://res.cloudinary.com/dygolqxi7/image/upload/v1689409810/findFurniture/po3hmp17xxc90soep6lq.jpg"
          alt=""
          className="w-[100px] rounded"
        />

        <div className="text-start">
          <p className="capitalize text-md mb-1 font-semibold">Product name</p>
          <p className="text-blue-500 font-semibold">Tk 555</p>
          <Link to="/product/dddd">
            <Button size="sm">Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedProd;
