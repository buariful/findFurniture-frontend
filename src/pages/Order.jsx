import React from "react";
import { CurrencyBangladeshiIcon } from "@heroicons/react/24/outline";

const Order = () => {
  return (
    <>
      {" "}
      <h2 className="inline-block text-3xl mt-16 mb-8 border-b-2 border-b-blue-500 font-bold">
        Your Orders
      </h2>
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        <table className="w-full text-sm  border">
          <thead className="text-xs uppercase bg-gray-50 ">
            <tr className="">
              <th
                scope="col"
                className="px-2 py-4 whitespace-nowrap text-sm"
              ></th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Product name
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Order Status
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Quantity
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Total Price
              </th>
              <th
                scope="col"
                className="px-2 py-4 whitespace-nowrap text-sm"
              ></th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b ">
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  Pending
                </span>
              </td>
              <td className="font-semibold px-2 py-4 text-gray-900 whitespace-nowrap">
                3
              </td>
              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  <CurrencyBangladeshiIcon className="w-5" />
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold"></td>
            </tr>
            <tr className="bg-white border-b ">
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  Pending
                </span>
              </td>
              <td className="font-semibold px-2 py-4 text-gray-900 whitespace-nowrap">
                3
              </td>
              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  <CurrencyBangladeshiIcon className="w-5" />
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold"></td>
            </tr>
            <tr className="bg-white border-b ">
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  Pending
                </span>
              </td>
              <td className="font-semibold px-2 py-4 text-gray-900 whitespace-nowrap">
                3
              </td>
              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  <CurrencyBangladeshiIcon className="w-5" />
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
