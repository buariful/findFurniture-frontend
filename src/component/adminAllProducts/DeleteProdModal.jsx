import { Button } from "@material-tailwind/react";
import React from "react";
import Modal from "../../utils/Modal";
import { useDeleteProductMutation } from "../../features/product/productApi";
import { LoaderFullScreen } from "../../utils/Loader";
import { ToastError, ToastSuccess } from "../../utils/Toast";

const DeleteProdModal = ({ singleProduct, isModalOpen, setModalOpen }) => {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDeleteProduct = (productId) => {
    setModalOpen(false);
    deleteProduct(productId)
      .unwrap()
      .then(() => ToastSuccess("Product Deleted Successfully"))
      .catch(() => ToastError("Product can not be deleted"));
  };
  return (
    <>
      <Modal
        key="DeleteProdModal"
        isModalOpen={isModalOpen}
        setModal={setModalOpen}
      >
        <div className="flex justify-center items-center mb-3 font-bold text-xl">
          <span className="font-normal">Are you sure want to delete </span>{" "}
          <span className="text-red-500 capitalize ml-2">
            {singleProduct?.name}?
          </span>
        </div>
        <div className="flex items-center justify-center gap-5">
          <img
            src={singleProduct?.images[0]?.url}
            alt={singleProduct?.name}
            className="w-[200px] rounded"
          />
          <div>
            <p className="text-sm capitalize">
              Stock: <span className="font-semibold"> 22</span>
            </p>
            <p className="text-sm capitalize">
              Code:
              <span className="font-semibold">
                {singleProduct?.productCode}
              </span>
            </p>
            <p className="text-sm capitalize">
              price:{" "}
              <span className="font-semibold">{singleProduct?.price}</span>
            </p>
            {singleProduct?.sellPrice && (
              <p className="text-sm capitalize">
                SellPrice:{" "}
                <span className="font-semibold">
                  {singleProduct?.sellPrice}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-5">
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button
            color="red"
            onClick={() => handleDeleteProduct(singleProduct?._id)}
            className="mr-1"
          >
            Delete
          </Button>
        </div>
      </Modal>
      {isLoading && <LoaderFullScreen />}
    </>
  );
};

export default DeleteProdModal;
