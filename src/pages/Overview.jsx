import React from "react";
import { Card, CardBody } from "@material-tailwind/react";
import {
  GiftIcon,
  UsersIcon,
  ArrowTrendingDownIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

const Overview = () => {
  return (
    <div className="w-11/12 mx-auto mt-10">
      <div className="flex justify-center items-center flex-wrap gap-5">
        <Card className="bg-[#ffe2da] text-deep-orange-500  px-10">
          <CardBody>
            <div className="flex items-center gap-2">
              <GiftIcon className="w-5" strokeWidth={2} /> Total Orders
            </div>
            <span className="font-bold text-lg">105</span>
          </CardBody>
        </Card>
        <Card className="bg-[#f0fff0] text-green-600 px-10">
          <CardBody>
            <div className="flex items-center gap-2">
              <CircleStackIcon className="w-5" strokeWidth={2} /> Total Products
            </div>
            <span className="font-bold text-lg">105</span>
          </CardBody>
        </Card>
        <Card className="bg-[#fff1f2] text-red-600 px-10">
          <CardBody>
            <div className="flex items-center gap-2">
              <ArrowTrendingDownIcon className="w-5" strokeWidth={2} /> Out Of
              Stock Products
            </div>
            <span className="font-bold text-lg">105</span>
          </CardBody>
        </Card>
        <Card className="bg-[#e5f3ff] text-blue-600 px-10">
          <CardBody>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5" strokeWidth={2} /> Total Users
            </div>
            <span className="font-bold text-lg">105</span>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
