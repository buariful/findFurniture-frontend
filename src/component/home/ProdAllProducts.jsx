import { Card, CardBody, CardHeader, Rating } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  StarIcon as UnratedIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as RatedIcon } from "@heroicons/react/24/solid";
import { useGetAllProductsMutation } from "../../features/product/productApi";
import { useSelector } from "react-redux";

const ProdAllProducts = () => {
  const [getAllProducts] = useGetAllProductsMutation();
  const filterData = useSelector((state) => state.filter);
  const { brands, categories, colors, discount, keyword } = filterData;

  useEffect(() => {
    const params = new URLSearchParams();
    if (colors.length > 0) {
      params.set("colors", colors.join(","));
    }
    if (categories.length > 0) {
      params.set("categories", categories.join(","));
    }
    if (brands.length > 0) {
      params.set("brands", brands.join(","));
    }
    if (discount !== null) {
      params.set("discount", discount);
    }
    if (keyword) {
      params.set("keyword", keyword);
    }
    let queryParams;
    if (params.size > 0) {
      queryParams = `/?${decodeURIComponent(params.toString())}`;
    } else {
      queryParams = "/";
    }

    getAllProducts(queryParams)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [brands, categories, colors, discount, keyword, getAllProducts]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
      <Card className="border border-[#eee] shadow-none hover:shadow-md hover:border-gray-300 duration-300">
        <CardHeader shadow={false} floated={false} className="m-2">
          <Link to="/">
            {" "}
            <img
              src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
              className="w-full object-cover max-h-[260px]"
              alt=""
            />
          </Link>
        </CardHeader>
        <CardBody className="py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="font-medium text-gray-700 hover:text-blue-500 duration-300"
            >
              Apple AirPods
            </Link>
            <HeartIcon className="w-5 text-black cursor-pointer" />
          </div>

          <div className="text-start">
            <Rating
              value={3}
              readonly
              ratedIcon={<RatedIcon className="h-4 w-4" />}
              unratedIcon={<UnratedIcon className="h-4 w-4" />}
            />

            <h3 className="font-semibold text-blue-400 text-lg">Tk 56000</h3>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProdAllProducts;
