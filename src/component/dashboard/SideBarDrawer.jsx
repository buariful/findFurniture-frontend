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
  ArrowRightOnRectangleIcon,
  TagIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const SideBarDrawer = ({ isSideBarOpen, setSiteBarOpen, logoutAction }) => {
  const userRole = useSelector((state) => state.user?.data?.role).toLowerCase();
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
        <ul onClick={() => setSiteBarOpen(false)}>
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

          {/* user menu */}
          {userRole === "user" && (
            <div>
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
            </div>
          )}

          {/* admin menu */}
          {userRole === "admin" && (
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
              <li>
                <Link
                  to="/dashboard/admin/users"
                  className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                    location.pathname === "/dashboard/admin/users" &&
                    "bg-[#333a48]"
                  }`}
                >
                  <UserCircleIcon className="w-5" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/category"
                  className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                    location.pathname === "/dashboard/admin/category" &&
                    "bg-[#333a48]"
                  }`}
                >
                  <TagIcon className="w-5" />
                  <span>Category</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admin/brand"
                  className={`px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded ${
                    location.pathname === "/dashboard/admin/brand" &&
                    "bg-[#333a48]"
                  }`}
                >
                  <CubeIcon className="w-5" />
                  <span>Brand</span>
                </Link>
              </li>
            </div>
          )}
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

          <li>
            <p
              className="px-2 py-3 hover:bg-[#333a48] duration-300 flex items-center gap-1 rounded cursor-pointer"
              onClick={logoutAction}
            >
              <ArrowRightOnRectangleIcon className="w-5" />
              <span>Log out</span>
            </p>
          </li>
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
