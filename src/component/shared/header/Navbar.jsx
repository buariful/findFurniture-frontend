import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UserIcon,
  DevicePhoneMobileIcon,
  ShoppingCartIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setKeyword,
  setPage,
} from "../../../features/searchFilter/searchFilterSlice";
import { useLogOutMutation } from "../../../features/user/userApi";
import { ToastError, ToastSuccess } from "../../../utils/Toast";
import { resetUser } from "../../../features/user/userSlice";
import { CustomBadge } from "../CustomBadge";

const Navbar = ({ setDrawerOpen, setCartDrawer }) => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const location = useLocation();
  const { data } = useSelector((state) => state.user);
  const [logOut] = useLogOutMutation();
  const user = useSelector((state) => state.user?.data);
  const { cartItem, wishList } = user;

  return (
    <header className="relative">
      {/* ------------------- header Top ------------------- */}
      <div className="bg-[#F5F6F8] py-2 hidden md:block">
        <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-700">Welcome to Find-Furniture</p>
          <div className="text-sm text-gray-700 flex gap-2 font-semibold">
            {data?.name ? (
              <Menu>
                <MenuHandler>
                  <div className="flex justify-end items-center gap-1 font-semibold capitalize text-sm cursor-pointer ">
                    <img
                      src={
                        data?.avatar?.url
                          ? data?.avatar?.url
                          : data?.avatar?.default
                      }
                      className="w-7 rounded-full"
                      alt=""
                    />
                    <span>{data?.name}</span>
                  </div>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    <Link to="/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logOut()
                        .unwrap()
                        .then((res) => {
                          ToastSuccess(res?.message);
                          dispatch(resetUser());
                        })
                        .catch(() => {});
                    }}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                {" "}
                <Link to="/register" className="flex hover:text-blue-500">
                  <UserIcon className="w-4 h-4" /> Sign up
                </Link>
                <span>|</span>
                <Link to="/login" className="hover:text-blue-500">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ------------------- Nav bar ------------------- */}
      <div className="bg-white shadow-md sticky left-0 w-full top-0 z-50">
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
              naviagate("/home");
            }}
          >
            <div className="relative hidden md:flex mx-auto w-[20rem] max-w-[24rem] ">
              <Input
                type="text"
                label="Search"
                name="search"
                className="pr-20"
                onChange={(e) => {
                  if (
                    location.pathname === "/" ||
                    location.pathname === "/home"
                  ) {
                    dispatch(setPage(1));
                    dispatch(setKeyword(e.target.value));
                  }
                }}
              />
              <Button
                size="sm"
                type="submit"
                className="!absolute right-1 top-1 rounded"
              >
                <MagnifyingGlassIcon className="w-4 h-4 " />
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

            <div className="flex items-center gap-3">
              <Link to="/wishlist" className="hover:text-blue-500 relative">
                {" "}
                <Tooltip content="Wishlist">
                  <HeartIcon className="w-7 h-7" />
                </Tooltip>
                {wishList?.length > 0 && (
                  <CustomBadge text={wishList?.length} />
                )}
              </Link>
              <button
                onClick={() => {
                  if (user.name) {
                    setCartDrawer(true);
                  } else {
                    ToastError("Please Login First");
                  }
                }}
                className="hover:text-blue-500 relative"
              >
                {" "}
                <Tooltip content="Cart">
                  <ShoppingCartIcon className="w-7 h-7" />
                </Tooltip>
                {cartItem?.length > 0 && (
                  <CustomBadge text={cartItem?.length} />
                )}
              </button>
            </div>
          </div>

          {/* small screen */}
          <div className="md:hidden">
            <div className="flex items-center gap-5">
              <Link
                to="/wishlist"
                className="hover:text-blue-500 flex items-center gap-1 relative"
              >
                {" "}
                <HeartIcon className="w-5 h-5" />
                <span>Wishlist</span>
                {wishList?.length > 0 && (
                  <CustomBadge text={wishList?.length} />
                )}
              </Link>
              <button
                className="hover:text-blue-500 flex items-center gap-1 pl-2 border-l border-l-gray-500 relative"
                onClick={() => {
                  if (user.name) {
                    setCartDrawer(true);
                  } else {
                    ToastError("Please Login First");
                  }
                }}
              >
                {" "}
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Cart</span>
                {cartItem?.length > 0 && (
                  <CustomBadge text={cartItem?.length} />
                )}
              </button>
            </div>
          </div>

          <div className="block md:hidden">
            <Bars3Icon
              onClick={() => setDrawerOpen(true)}
              className="w-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
