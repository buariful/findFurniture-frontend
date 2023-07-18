import { Card, CardBody, CardHeader, Rating } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  StarIcon as UnratedIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";

const ProdAllProducts = ({ data }) => {
  const products = data.map((d) => {
    return (
      <Card
        className="border border-[#eee] shadow-none hover:shadow-md hover:border-gray-300 duration-300"
        key={d?._id}
      >
        <CardHeader shadow={false} floated={false} className="m-2">
          <Link to={`/product/${d?._id}`}>
            {" "}
            <img
              src={d?.images[0]?.url}
              className="w-full object-cover max-h-[260px]"
              alt=""
            />
          </Link>
        </CardHeader>
        <CardBody className="py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              to={`/product/${d?._id}`}
              className="font-medium text-gray-700 capitalize hover:text-blue-500 duration-300"
            >
              {d?.name}
            </Link>
            <HeartIcon className="w-5 text-black cursor-pointer" />
          </div>

          <div className="text-start">
            <Rating
              value={Math.ceil(d?.avg_rating)}
              readonly
              ratedIcon={<RatedIcon className="h-4 w-4" />}
              unratedIcon={<UnratedIcon className="h-4 w-4" />}
            />

            <h3 className="font-semibold text-blue-400 text-lg">
              Tk {d?.price}
            </h3>
          </div>
        </CardBody>
      </Card>
    );
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
      {products}
    </div>
  );
};

export default ProdAllProducts;
