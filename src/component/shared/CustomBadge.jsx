import React from "react";

export const CustomBadge = ({ text }) => {
  return (
    <span className="absolute min-w-[20px] min-h-[20px] rounded-full py-1 px-1 text-[10px] font-medium content-[''] leading-none grid place-items-center -top-[80%] -right-[2%] translate-x-2/4 translate-y-2/4 bg-blue-500 text-white ">
      {text}
    </span>
  );
};
