import React, { useState } from "react";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Modal from "../../utils/Modal.js";
import { useDeleteProductMutation } from "../../features/product/productApi.js";
import { ToastError, ToastSuccess } from "../../utils/Toast.js";
import { LoaderFullScreen } from "../../utils/Loader.js";
import { AlertError } from "../../utils/Alert.js";

const ProductsTable = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [singleProduct, setSingleProduct] = useState("");
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();

  const tableData = data.map((d) => (
    <tr
      className={`border-b ${
        d?.stock <= 0 ? "bg-red-100" : "bg-white"
      }  capitalize`}
      key={d._id}
    >
      <td className="px-2 py-1">
        <img
          src={d?.images[0]?.url}
          alt=""
          className="!w-[50px] block rounded"
        />
      </td>
      <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap capitalize hover:text-blue-600 duration-300">
        <Link to={`/dashboard/admin/product/${d._id}`}>{d?.name}</Link>
      </td>
      <td className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
        {d?.category}
      </td>
      <td className="font-semibold px-2 py-4 text-gray-900 whitespace-nowrap">
        {d?.stock}
      </td>
      <td className="px-2 py-4 text-blue-600 font-bold ">
        <div className="flex justify-center items-center font">
          {d.sellPrice || d?.price}
        </div>
      </td>
      <td className="px-2 py-4 font-semibold">
        <div className="flex justify-center items-center gap-1">
          <Link to={`/dashboard/admin/product/${d._id}`}>
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
            onClick={() => {
              setModalOpen(true);
              setSingleProduct(d);
            }}
          >
            <TrashIcon className="w-5 text-red-500" />
          </IconButton>
        </div>
      </td>
    </tr>
  ));

  const handleDeleteProduct = (productId) => {
    setModalOpen(false);
    deleteProduct(productId)
      .unwrap()
      .then(() => ToastSuccess("Product Deleted Successfully"))
      .catch(() => ToastError("Product can not be deleted"));
  };

  return (
    <>
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        {error && <AlertError text={error?.data?.message} />}
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
                Category
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

          <tbody>{tableData}</tbody>
        </table>
      </div>
      {singleProduct && (
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
      )}
      {/* <DeleteProdModal
        product={singleProduct}
        handleModalOpen={handleModalOpen}
        isModalOpen={isModalOpen}
      /> */}
      {isLoading && <LoaderFullScreen />}
    </>
  );
};

export default ProductsTable;
