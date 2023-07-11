import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

const DeleteProdModal = ({ isModalOpen, handleModalOpen }) => {
  return (
    <div>
      <Dialog open={isModalOpen} handler={handleModalOpen} className="py-10">
        <DialogHeader className="justify-center">
          Are you sure want to delete product name?
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center justify-center gap-2">
            <img
              src={require("../../images/logo.png")}
              alt=""
              className="w-[200px]"
            />
            <div>
              <p className="text-sm capitalize">
                <span className="font-semibold">Name:</span> product
              </p>
              <p className="text-sm capitalize">
                <span className="font-semibold">Code:</span> product
              </p>
              <p className="text-sm capitalize">
                <span className="font-semibold">price:</span> product
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-5">
            <Button variant="gradient" onClick={handleModalOpen}>
              <span>Cancel</span>
            </Button>
            <Button color="red" onClick={handleModalOpen} className="mr-1">
              <span>Delete</span>
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default DeleteProdModal;
