import React, { useState } from "react";
import {
  CurrencyBangladeshiIcon,
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import ReactStars from "react-rating-stars-component";

import { Button, Textarea } from "@material-tailwind/react";
import ReviewModal from "../component/review/ReviewModal";
import ReviewCard from "../component/review/ReviewCard";
import DashboardTitle from "../component/shared/DashboardTitle";
import Modal from "../utils/Modal";

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
      <Modal isModalOpen={reviewModal} setModal={setReviewModal}>
        <div className="flex justify-center items-center gap-5 border-b border-b-blue-gray px-6 pb-2 text-gray-700 w-[380px] mx-auto">
          <img
            src={require("../images/logo.png")}
            alt=""
            className="w-[100px]"
          />
          <div>
            <p className="text-base font-semibold">Product Name</p>
            <p>5000 tk</p>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <ReactStars
              count={5}
              onChange={(e) => console.log(e)}
              size={30}
              activeColor="#ffd700"
              isHalf={true}
            />
            <span className=" bg-blue-500 text-white py-1 px-3 inline-block rounded text-[12px]">
              5
            </span>
          </div>

          <Textarea label="Review" />
        </div>
        <div className="flex justify-center">
          <Button>Submit</Button>
          <Button>Update</Button>
        </div>
      </Modal>

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
