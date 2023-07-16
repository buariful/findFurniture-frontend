import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardTitle from "../component/shared/DashboardTitle";
import ProductFormInfo from "../component/adminSingleProduct/ProductFormInfo";
import { useGetSingleProductMutation } from "../features/product/productApi";
import { useEffect } from "react";
import { useState } from "react";
import { LoaderFullScreen } from "../utils/Loader";

const AdminSingleProduct = () => {
  const navigate = useNavigate();
  const [getSingleProduct, { isLoading }] = useGetSingleProductMutation();

  const [error, setError] = useState("");
  const [product, setProduct] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(id)
      .unwrap()
      .then((res) => setProduct(res?.data))
      .catch(() => {
        setError("Product not found");
      });
  }, [id, getSingleProduct, setProduct]);

  return (
    <>
      <div className="bg-blue-50 py-2">
        <Button
          variant="outlined"
          className="flex items-center gap-1 ml-2 text-black px-4 py-2"
          onClick={() => navigate("/dashboard/admin/all-products")}
        >
          <ArrowLeftIcon className="w-5" />
          <span>Back</span>
        </Button>
      </div>

      <div className="mt-10 mb-5">
        <DashboardTitle text="Product details" />
      </div>

      <div className="max-w-3xl w-11/12 mx-auto text-start grid grid-cols-2 gap-5 border-b border-b-blue-gray pb-5">
        <div className="mx-auto">
          <p className="capitalize">
            <span className="font-semibold">Name: </span> {product?.name}
          </p>
          <p className="capitalize">
            <span className="font-semibold ">Product code: </span>{" "}
            {product?.productCode}
          </p>
          <p className="capitalize">
            <span className="font-semibold"> Price: </span> {product?.price}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Sell Price: </span>
            {product?.sellPrice}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Discount: </span>
            {product?.discount ? product?.discount : 0} %
          </p>
        </div>

        <div className="mx-auto">
          <p className="capitalize">
            <span className="font-semibold">Brand:</span>
            {product?.brand}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Category:</span>
            {product?.category}
          </p>
          <p className="capitalize">
            <span className="font-semibold">Avalable Colors: </span>
            {product?.colors?.map((c) => c)}
          </p>
        </div>
      </div>

      <div className="w-11/12 mx-auto mt-6 mb-3">
        <h3 className="font-semibold text-xl text-start">Product Images</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {product?.images?.map((img) => (
            <div className="grid place-items-center">
              <img src={img.url} alt="" className="mb-2" />

              <Button className="capitalize">Set Thumbnail</Button>
            </div>
          ))}
        </div>
        <div className=" mt-6 mb-3">
          <h3 className="font-semibold text-xl text-start">
            Change Product Information
          </h3>
          <ProductFormInfo product={product} />
        </div>
      </div>
    </>
  );
};

export default AdminSingleProduct;
