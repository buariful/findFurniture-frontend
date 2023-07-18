import React from "react";
import ProductBasic from "../component/productDetails/ProductBasic";
import ProdTab from "../component/productDetails/ProdTab";
import RelatedProd from "../component/productDetails/RelatedProd";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../features/product/productApi";
import { LoaderFullScreen } from "../utils/Loader";

const ProductDetails = () => {
  let { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);

  return isLoading ? (
    <LoaderFullScreen />
  ) : (
    <div className="w-11/12 mx-auto py-14">
      <div className="mb-14">
        <ProductBasic data={data?.data} />
      </div>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <ProdTab data={data?.data} />
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <RelatedProd />
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
