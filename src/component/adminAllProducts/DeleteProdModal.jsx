import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

const DeleteProdModal = ({ product, isModalOpen, handleModalOpen }) => {
  return (
    <div>
      <Dialog open={isModalOpen} handler={handleModalOpen} className="py-10">
        <DialogHeader className="justify-center">
          <span className="font-normal">Are you sure want to delete </span>{" "}
          <span className="text-red-500 capitalize ml-2">{product?.name}?</span>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center justify-center gap-5">
            <img
              src={product?.thumbImg?.url}
              alt={product?.name}
              className="w-[200px] rounded"
            />
            <div>
              <p className="text-sm capitalize">
                Stock: <span className="font-semibold"> 22</span>
              </p>
              <p className="text-sm capitalize">
                Code:
                <span className="font-semibold">{product?.productCode}</span>
              </p>
              <p className="text-sm capitalize">
                price: <span className="font-semibold">{product?.price}</span>
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
