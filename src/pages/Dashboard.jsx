import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import SideBar from "../component/dashboard/SideBar";
import SideBarDrawer from "../component/dashboard/SideBarDrawer";

const Dashboard = () => {
  const [isSideBarOpen, setSiteBarOpen] = useState(false);
  const user = useSelector((state) => state.user?.data);
  return (
    <div className="grid grid-cols-12 w-full mx-auto min-h-screen">
      {/* ============ sidbar============ */}
      <div className="hidden lg:block lg:col-span-3 xl:col-span-2 bg-[#1C2434] text-white p-5 text-start">
        <SideBar />
      </div>
      <SideBarDrawer
        isSideBarOpen={isSideBarOpen}
        setSiteBarOpen={setSiteBarOpen}
      />

      {/* ============ main contents ============ */}
      <div className="col-span-12 lg:col-span-9 xl:col-span-10">
        <div className="bg-[#eee] flex justify-center items-center gap-2 py-3">
          <img
            src={user?.avatar?.url || user?.avatar?.default}
            alt=""
            className="w-10 rounded-full"
          />
          <span className="capitalize">{user?.name}</span>
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
