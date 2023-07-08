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
import { useDispatch } from "react-redux";
import {
  setKeyword,
  setPage,
} from "../../../features/searchFilter/searchFilterSlice";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setCartDrawer] = useState(false);
  const dispatch = useDispatch();

  return (
    <header>
      {/* ------------------- header Top ------------------- */}
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

      {/* ------------------- Nav bar ------------------- */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/home">
            <img
              src={require("../../../images/logo.png")}
              alt=""
              className="max-w-[160px] w-[120px] md:w-[160px]"
            />
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setPage(1));
              dispatch(setKeyword(e.target.search.value));
            }}
          >
            <div className="relative hidden md:flex mx-auto w-[20rem] max-w-[24rem] ">
              <Input
                type="text"
                label="Search"
                name="search"
                className="pr-20"
              />
              <Button
                size="sm"
                type="submit"
                className="!absolute right-1 top-1 rounded"
              >
                <MagnifyingGlassIcon className="w-4 h-4" />
              </Button>
            </div>
          </form>

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
              <button
                onClick={() => setCartDrawer(true)}
                className="hover:text-blue-500"
              >
                {" "}
                <Tooltip content="Cart">
                  <ShoppingCartIcon className="w-5 h-5" />
                </Tooltip>
              </button>
            </div>
          </div>

          {/* small screen */}
          <div className="md:hidden">
            <div className="flex items-center gap-3">
              <Link
                to="/wishlist"
                className="hover:text-blue-500 flex items-center gap-1"
              >
                {" "}
                <HeartIcon className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
              <button
                className="hover:text-blue-500 flex items-center gap-1 pl-2 border-l border-l-gray-500"
                onClick={() => setCartDrawer(true)}
              >
                {" "}
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Cart</span>
              </button>
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
              <div className="mb-2 flex items-center justify-between border-b border-b-blue-gray">
                <Link to="/home">
                  <img
                    src={require("../../../images/logo.png")}
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

              <div className="flex items-center justify-center mb-8">
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

              <ul className="text-start px-6">
                <li className="mb-4 border-b border-b-blue-gray">
                  <Link to="/" onClick={() => setDrawerOpen(false)}>
                    Home
                  </Link>
                </li>
                <li className="mb-4 border-b border-b-blue-gray">
                  <Link to="/wishlist" onClick={() => setDrawerOpen(false)}>
                    Wishlist
                  </Link>
                </li>
                <li className="mb-4 border-b border-b-blue-gray">
                  <Link to="/login" onClick={() => setDrawerOpen(false)}>
                    Sign In
                  </Link>
                </li>
                <li className="mb-4 border-b border-b-blue-gray">
                  <Link to="/register" onClick={() => setDrawerOpen(false)}>
                    Sign Up
                  </Link>
                </li>
              </ul>
            </Drawer>
          </div>

          {/* cartDrawer */}
          <CartDrawer setState={setCartDrawer} state={isCartDrawerOpen} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
