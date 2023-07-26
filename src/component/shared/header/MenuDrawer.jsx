import {
  Drawer,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { DevicePhoneMobileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ToastSuccess } from "../../../utils/Toast";
import { useLogOutMutation } from "../../../features/user/userApi";
import { resetUser } from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";

const MenuDrawer = ({ drawerOpen, setDrawerOpen, data }) => {
  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
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

        {data.name && (
          <div className="flex items-center justify-center mb-1">
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
          </div>
        )}
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
          {data.name ? (
            <li className="mb-4 border-b border-b-blue-gray cursor-pointer">
              <span
                onClick={() => {
                  setDrawerOpen(false);
                  logOut()
                    .unwrap()
                    .then((res) => {
                      ToastSuccess(res?.message);
                      dispatch(resetUser());
                    })
                    .catch(() => {});
                }}
              >
                Logout
              </span>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </Drawer>
    </div>
  );
};

export default MenuDrawer;
