import React from "react";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({ isModalOpen, setModal, size, bgTransparent, children }) => {
  return (
    <>
      <Dialog
        open={isModalOpen}
        size={size || "sm"}
        className={`${bgTransparent && "bg-[#110f0fe7]"}`}
      >
        <DialogHeader
          className={`${
            bgTransparent
              ? "bg-[#000000ab] py-2 justify-center"
              : "pb-0 justify-end"
          }`}
        >
          <IconButton
            variant="text"
            className="text-gray-500 hover:text-red-500"
            onClick={() => setModal(false)}
          >
            <XCircleIcon className={`${bgTransparent ? "w-10" : "w-7"}`} />
          </IconButton>
        </DialogHeader>

        <DialogBody className="pt-0 pb-10">{children}</DialogBody>
      </Dialog>
    </>
  );
};

export default Modal;
