import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Textarea,
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import ReactStars from "react-rating-stars-component";

const ReviewModal = ({ handleOpen, isModalOpen }) => {
  return (
    <>
      <Dialog open={isModalOpen} handler={handleOpen}>
        <DialogHeader className="justify-end">
          <IconButton
            variant="text"
            className="text-black"
            onClick={handleOpen}
          >
            <XCircleIcon className="w-7" />
          </IconButton>
        </DialogHeader>

        <DialogBody>
          <div className="flex justify-center items-center gap-5 border-b border-b-blue-gray px-6 pb-2 text-gray-700 w-[380px] mx-auto">
            <img
              src={require("../../images/logo.png")}
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
        </DialogBody>

        <DialogFooter className="justify-center pb-8">
          <div className="flex justify-center">
            <Button>Submit</Button>
            <Button>Update</Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ReviewModal;
