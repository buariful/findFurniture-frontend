import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const RelatedProd = ({ data }) => {
  return (
    <div>
      <h3 className="font-semibold text-start pb-2 border-b border-b-blue-600 mb-4">
        Related Products
      </h3>

      {data.map((d) => (
        <div className="flex gap-3 items-center mb-4" key={d?._id}>
          <img src={d?.images[0]?.url} alt="" className="w-[100px] rounded" />

          <div className="text-start">
            <p className="capitalize text-md mb-1 font-semibold">{d?.name}</p>
            <p className="text-blue-500 font-semibold">
              Tk {d?.discount ? d?.sellPrice : d?.price}
            </p>
            <Link to={`/product/${d._id}`}>
              <Button size="sm">Details</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedProd;
