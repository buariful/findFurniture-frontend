import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
  XMarkIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { Button, Drawer, IconButton } from "@material-tailwind/react";

const SideBarDrawer = ({ isSideBarOpen, setSiteBarOpen }) => {
  const location = useLocation();
  return (
    <>
      <Drawer
        open={isSideBarOpen}
        className="bg-[#1C2434] text-start text-white p-4"
      >
        <div className="bg-[#c0c9dd] p-2 rounded mb-8 flex items-center justify-between">
          <Link to="/home">
            <img
              src={require("../../images/logo.png")}
              alt=""
              className="w-28"
            />
          </Link>

          <IconButton
            variant="text"
            className="text-black"
            onClick={() => setSiteBarOpen(false)}
          >
            <XMarkIcon className="w-5" />
          </IconButton>
        </div>

        <h4 className="text-gray-600 text-lg font-semibold block mb-3 border-b border-b-gray-600">
          Menu
        </h4>

        <ul>
          <li>
            <Link
              onClick={() => setSiteBarOpen(false)}
              to="/dashboard"
              className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                location.pathname === "/dashboard" && "bg-[#333a48]"
              }`}
            >
              <CurrencyDollarIcon className="w-5" />
              <span>Orders</span>
            </Link>
          </li>
          <div>
            {/* user menu */}
            <li>
              <Link
                onClick={() => setSiteBarOpen(false)}
                to="/dashboard/review"
                className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                  location.pathname === "/dashboard/review" && "bg-[#333a48]"
                }`}
              >
                <ChatBubbleLeftIcon className="w-5" />
                <span>My reviews</span>
              </Link>
            </li>

            <li>
              <Link
                onClick={() => setSiteBarOpen(false)}
                to="/dashboard/profile"
                className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                  location.pathname === "/dashboard/profile" && "bg-[#333a48]"
                }`}
              >
                <UserCircleIcon className="w-5" />
                <span>Profile</span>
              </Link>
            </li>
          </div>
          {/* admin menu */}
          <div>
            <li>
              <Link
                onClick={() => setSiteBarOpen(false)}
                to="/dashboard/admin/overview"
                className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                  location.pathname === "/dashboard/admin/overview" &&
                  "bg-[#333a48]"
                }`}
              >
                <ChartPieIcon className="w-5" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setSiteBarOpen(false)}
                to="/dashboard/admin/all-products"
                className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                  location.pathname === "/dashboard/admin/all-products" &&
                  "bg-[#333a48]"
                }`}
              >
                <ListBulletIcon className="w-5" />
                <span>All Products</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setSiteBarOpen(false)}
                to="/dashboard/admin/product/new"
                className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                  location.pathname === "/dashboard/admin/product/new" &&
                  "bg-[#333a48]"
                }`}
              >
                <SquaresPlusIcon className="w-5" />
                <span>Create Product</span>
              </Link>
            </li>
          </div>
        </ul>

        <div className="text-center mt-6">
          <Button variant="gradient" className="p-0">
            <Link to="/" className="flex items-center gap-1 rounded px-6 py-3">
              <HomeIcon className="w-5" />
              <span>Go to Home</span>
            </Link>
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default SideBarDrawer;
