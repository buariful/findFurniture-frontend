import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Drawer,
  IconButton,
  Input,
  Tooltip,
} from "@material-tailwind/react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* header Top */}
      <div className="bg-[#F5F6F8] py-2">
        <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-700">Welcome to Find-Furniture</p>

          <div className="text-sm text-gray-700 flex gap-2 font-semibold">
            <Link to="/register" className="flex hover:text-blue-500">
              <UserIcon className="w-4 h-4" /> Sign up
            </Link>
            <span>|</span>
            <Link to="/login" className="hover:text-blue-500">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/home">
            <img
              src={require("../../images/logo.png")}
              alt=""
              className="max-w-[160px] w-[120px] md:w-[160px]"
            />
          </Link>

          <div className="relative hidden md:flex w-3/6 mx-auto max-w-[24rem] ">
            <Input
              type="text"
              label="Search"
              // value={email}
              // onChange={onChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              // color={email ? "blue" : "blue-gray"}
              // disabled={!email}
              className="!absolute right-1 top-1 rounded"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center justify-end gap-2">
            <div className="flex items-center">
              <DevicePhoneMobileIcon className="w-5 h-5" />
              <div>
                <a
                  href="mailto:example@email.com"
                  className="text-gray-800 hover:text-blue-500 text-sm inline-block"
                >
                  Email
                </a>{" "}
                <span className="text-gray-500 mx-1">or</span>
                <a
                  href="tel:123456789"
                  className="text-gray-800 hover:text-blue-500 text-sm inline-block"
                >
                  Phone
                </a>
              </div>
            </div>
            <span className="text-gray-500 text-sm">|</span>

            <div className="flex items-center gap-1">
              <Link to="/home" className="hover:text-blue-500">
                {" "}
                <Tooltip content="Wishlist">
                  <HeartIcon className="w-5 h-5" />
                </Tooltip>
              </Link>
              <Link to="/home" className="hover:text-blue-500">
                {" "}
                <Tooltip content="Cart">
                  <ShoppingCartIcon className="w-5 h-5" />
                </Tooltip>
              </Link>
            </div>
          </div>

          <div className="block md:hidden">
            <Bars3Icon
              onClick={() => setDrawerOpen(true)}
              className="w-5 cursor-pointer"
            />
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              className="p-4 shadow-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <Link to="/home">
                  <img
                    src={require("../../images/logo.png")}
                    alt=""
                    className="max-w-[160px] w-[120px] md:w-[160px]"
                  />
                </Link>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  onClick={() => setDrawerOpen(false)}
                >
                  <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                </IconButton>
              </div>

              <div className="relative flex w-11/12 mx-auto mb-3 max-w-[24rem] ">
                <Input
                  type="text"
                  label="Search"
                  // value={email}
                  // onChange={onChange}
                  className="pr-20"
                />
                <Button
                  size="sm"
                  // color={email ? "blue" : "blue-gray"}
                  // disabled={!email}
                  className="!absolute right-1 top-1 rounded"
                >
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <DevicePhoneMobileIcon className="w-5 h-5" />
                <div>
                  <a
                    href="mailto:example@email.com"
                    className="text-gray-800 hover:text-blue-500 text-sm inline-block"
                  >
                    Email
                  </a>{" "}
                  <span className="text-gray-500 mx-1">or</span>
                  <a
                    href="tel:123456789"
                    className="text-gray-800 hover:text-blue-500 text-sm inline-block"
                  >
                    Phone
                  </a>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-2">
                <Link
                  to="/home"
                  className="hover:text-blue-500 flex items-center gap-1 text-sm"
                >
                  {" "}
                  <HeartIcon className="w-5 h-5" />
                  Wishlist
                </Link>
                <Link
                  to="/home"
                  className="hover:text-blue-500 flex items-center gap-1 text-sm"
                >
                  {" "}
                  <ShoppingCartIcon className="w-5 h-5" />
                  Cart
                </Link>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
