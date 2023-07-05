import React from "react";
import ProdFilter from "./ProdFilter";
import ProdAllProducts from "./ProdAllProducts";
import Pagination from "./Pagination";
// import { useGetAllProductsMutation } from "../../features/product/productApi";
const ProductSection = () => {
  // const [getAllProducts] = useGetAllProductsMutation();

  return (
    <div className="py-5 w-11/12 max-w-7xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-12 xl:col-span-3 border-b xl:border-r border-[#eee] pb-3 xl:pb-0 xl:pr-3 ">
        <ProdFilter />
      </div>
      <div className="col-span-12 xl:col-span-9 ">
        <ProdAllProducts />
        <Pagination />
      </div>
    </div>
  );
};

export default ProductSection;
