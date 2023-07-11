import React from "react";

const DashboardTitle = ({ text }) => {
  return (
    <h2 className="inline-block text-3xl border-b-2 border-b-blue-500 font-bold pb-1 capitalize">
      {text}
    </h2>
  );
};

export default DashboardTitle;
