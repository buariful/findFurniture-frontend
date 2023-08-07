import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductFormInfo from "../component/adminSingleProduct/ProductFormInfo";
import { useGetSingleProductQuery } from "../features/product/productApi";
import { LoaderFullScreen } from "../utils/Loader";
import AdProductBasics from "../component/adminSingleProduct/AdProductBasics";
import AdProdImages from "../component/adminSingleProduct/AdProdImages";

const AdminSingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data: product } = useGetSingleProductQuery(id);

  return isLoading ? (
    <LoaderFullScreen />
  ) : (
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
      <AdProductBasics data={product?.data} />
      <AdProdImages product={product} />

      <div className="w-11/12 mx-auto mt-6 mb-3">
        <h3 className="font-semibold text-xl text-start">
          Change Product Information
        </h3>
        <ProductFormInfo product={product} />
      </div>
    </>
  );
};

export default AdminSingleProduct;
