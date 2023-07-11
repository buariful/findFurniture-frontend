import React, { useState } from "react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import DeleteProdModal from "./DeleteProdModal";
import { Link } from "react-router-dom";

const ProductsTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        <table className="w-full text-sm  border">
          <thead className="text-xs uppercase bg-gray-50 ">
            <tr className="">
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Picture
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Product name
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Pending Orders
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Stock
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Price
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Edit
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b ">
              <td className="px-2 py-1">
                <img
                  src={require("../../images/logo.png")}
                  alt=""
                  className="!w-[50px] block rounded"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  1056
                </span>
              </td>
              <td className="font-semibold px-2 py-4 text-gray-900 whitespace-nowrap">
                3
              </td>
              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold">
                <div className="flex justify-center items-center gap-1">
                  <Link to="/dashboard/admin/product/555">
                    <IconButton
                      variant="text"
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <PencilSquareIcon className="w-5 text-green-600" />
                    </IconButton>
                  </Link>
                  <span className="text-gray-500">/</span>
                  <IconButton
                    variant="text"
                    className="bg-red-50 hover:bg-red-100"
                    onClick={handleModalOpen}
                  >
                    <TrashIcon className="w-5 text-red-500" />
                  </IconButton>
                </div>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <td className="px-2 py-1">
                <img
                  src={require("../../images/logo.png")}
                  alt=""
                  className="!w-[50px] block rounded"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <span className="text-green-600 font-semibold text-cetner bg-green-50 py-1 px-3 rounded-full">
                  1056
                </span>
              </td>
              <td className="font-semibold px-2 py-4 text-gray-900 whitespace-nowrap">
                3
              </td>
              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold">
                <div className="flex justify-center items-center gap-1">
                  <Link to="/dashboard/admin/product/555">
                    <IconButton
                      variant="text"
                      className="bg-green-50 hover:bg-green-100"
                    >
                      <PencilSquareIcon className="w-5 text-green-600" />
                    </IconButton>
                  </Link>
                  <span className="text-gray-500">/</span>
                  <IconButton
                    variant="text"
                    className="bg-red-50 hover:bg-red-100"
                    onClick={handleModalOpen}
                  >
                    <TrashIcon className="w-5 text-red-500" />
                  </IconButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DeleteProdModal
        handleModalOpen={handleModalOpen}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default ProductsTable;
