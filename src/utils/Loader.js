import React from "react";

export const LoaderBig = () => {
  return (
    <div>
      <div className="flex items-center justify-center absolute top-0 left-0 bg-[#efefefa1] w-full h-screen z-50">
        {/* <div className="w-24 h-24 border-t-4 border-b-4 border-blue-400 rounded-full animate-spin"></div> */}
        <div className="relative w-20 h-20 items-center flex justify-center text-gray-600 text-[11px]">
          <span className=" border-t-4 border-b-4 border-blue-400 rounded-full w-full h-full absolute top-0 left-0 animate-spin"></span>
          Loading
        </div>
      </div>
    </div>
  );
};
export const LoaderSmall = () => {
  return (
    <div className="relative w-14 h-14 items-center flex justify-center text-gray-600 text-[10px]">
      <span className=" border-t-4 border-b-4 border-blue-400 rounded-full w-full h-full absolute top-0 left-0 animate-spin"></span>
      Loading
    </div>
  );
};
