import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

const Dashboard = () => {
  return (
    // #333A48 menu hover color
    <div className="grid grid-cols-12 w-full mx-auto min-h-screen">
      <div className="col-span-2 bg-[#1C2434] text-white p-5 text-start">
        <div className="bg-[#c0c9dd] p-2 rounded mb-8">
          <Link to="/home">
            <img
              src={require("../images/logo.png")}
              alt=""
              className="w-[160px]"
            />
          </Link>
        </div>

        <h4 className="text-gray-600 text-lg font-semibold block mb-3 border-b border-b-gray-600">
          Menu
        </h4>

        <ul>
          <li>
            <Link
              to="/dashboard"
              className="px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded"
            >
              <CurrencyDollarIcon className="w-5" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/review"
              className="px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded"
            >
              <ChatBubbleLeftIcon className="w-5" />
              <span>My reviews</span>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/profile"
              className="px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded"
            >
              <UserCircleIcon className="w-5" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>

        <div className="text-center mt-6">
          <Button variant="gradient">
            <Link to="/" className="flex items-center gap-1 rounded">
              <HomeIcon className="w-5" />
              <span>Go to Home</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="col-span-10">
        <div className="bg-[#eee] flex justify-center items-center gap-2 py-3">
          <img
            src={require("../images/logo.png")}
            alt=""
            className="w-16 rounded-full"
          />
          <span className="capitalize">Person name</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
