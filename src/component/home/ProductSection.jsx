import React from "react";
import ProdFilter from "./ProdFilter";
import ProdAllProducts from "./ProdAllProducts";
import Pagination from "./Pagination";

const ProductSection = () => {
  return (
    <div className="py-5 w-11/12 max-w-7xl mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-3 hidden xl:block border-r pr-3 border-r-[#eee]">
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
