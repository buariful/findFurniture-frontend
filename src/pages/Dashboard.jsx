import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftIcon,
  Bars3Icon,
  XMarkIcon,
  ListBulletIcon,
  SquaresPlusIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import { Button, Drawer, IconButton } from "@material-tailwind/react";

const Dashboard = () => {
  const [isSideBarOpen, setSiteBarOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="grid grid-cols-12 w-full mx-auto min-h-screen">
      {/* ============ sidbar============ */}
      <div className="hidden lg:block lg:col-span-3 xl:col-span-2 bg-[#1C2434] text-white p-5 text-start">
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
      </div>

      <Drawer
        open={isSideBarOpen}
        className="bg-[#1C2434] text-start text-white p-4"
      >
        <div className="bg-[#c0c9dd] p-2 rounded mb-8 flex items-center justify-between">
          <Link to="/home">
            <img src={require("../images/logo.png")} alt="" className="w-28" />
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

      {/* ============ main contents ============ */}
      <div className="col-span-12 lg:col-span-9 xl:col-span-10">
        <div className="bg-[#eee] flex justify-center items-center gap-2 py-3">
          <img
            src={require("../images/logo.png")}
            alt=""
            className="w-16 rounded-full"
          />
          <span className="capitalize">Person name</span>
          <IconButton
            variant="text"
            className="text-black block lg:hidden"
            onClick={() => setSiteBarOpen(true)}
          >
            <Bars3Icon className="w-6" strokeWidth={2} />
          </IconButton>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
