import React, { useState } from "react";
import {
  CurrencyBangladeshiIcon,
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@material-tailwind/react";
import ReviewModal from "../component/review/ReviewModal";
import ReviewCard from "../component/review/ReviewCard";
import DashboardTitle from "../component/shared/DashboardTitle";

const Review = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const handleOpen = () => setReviewModal(!reviewModal);
  return (
    <div className="w-11/12 mx-auto">
      <div className="mt-16 mb-8">
        <DashboardTitle text="product I've purchased" />
      </div>
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
                Total Price
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Review
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b ">
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded mx-auto"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>

              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  <CurrencyBangladeshiIcon className="w-5" />
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold">
                <Button
                  className="flex items-center mx-auto p-2 text-[10px] gap-2"
                  onClick={handleOpen}
                >
                  <PencilSquareIcon className="w-4" />
                  Add a review
                </Button>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="w-[50px] rounded mx-auto"
                />
              </td>
              <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 17"
              </td>

              <td className="px-2 py-4 text-blue-600 font-bold ">
                <div className="flex justify-center items-center font">
                  <CurrencyBangladeshiIcon className="w-5" />
                  5000
                </div>
              </td>
              <td className="px-2 py-4 font-semibold">
                <Button
                  className="flex items-center mx-auto p-2 text-[10px] gap-2"
                  variant="outlined"
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="w-4" />
                  My review
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ReviewModal handleOpen={handleOpen} isModalOpen={reviewModal} />

      <div className="mt-16 mb-8">
        <DashboardTitle text="my all reviews" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-16 gap-5">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default Review;
