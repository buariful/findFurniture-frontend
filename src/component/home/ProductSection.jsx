import React, { useEffect, useState } from "react";
import ProdFilter from "./ProdFilter";
import ProdAllProducts from "./ProdAllProducts";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import { useGetAllProductsMutation } from "../../features/product/productApi";
import { LoaderBig } from "../../utils/Loader";
const ProductSection = () => {
  const [getAllProducts, { isLoading, error, data }] =
    useGetAllProductsMutation();
  const filterData = useSelector((state) => state.filter);
  const { brands, categories, colors, discount, keyword } = filterData;
  const [totalProducts, setTotalProducts] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (colors.length > 0) {
      params.set("colors", colors.join(","));
    }
    if (categories.length > 0) {
      params.set("categories", categories.join(","));
    }
    if (brands.length > 0) {
      params.set("brands", brands.join(","));
    }
    if (discount !== null) {
      params.set("discount", discount);
    }
    if (keyword) {
      params.set("keyword", keyword);
    }
    let queryParams;
    if (params.size > 0) {
      queryParams = `/?${decodeURIComponent(params.toString())}`;
    } else {
      queryParams = "/";
    }

    getAllProducts(queryParams)
      .unwrap()
      .then((res) => {
        setTotalProducts(res?.totalResults);
      })
      .catch((err) => {});
  }, [brands, categories, colors, discount, keyword, getAllProducts]);

  return (
    <div className="py-5 w-11/12 max-w-7xl mx-auto grid grid-cols-12 gap-8 relative">
      <div className="col-span-12 xl:col-span-3 border-b xl:border-r border-[#eee] pb-3 xl:pb-0 xl:pr-3 ">
        <ProdFilter />
      </div>
      <div className="col-span-12 xl:col-span-9 ">
        <ProdAllProducts />

        {data?.totalResults && data?.totalResults > 4 && (
          <Pagination totalProducts={totalProducts} />
        )}
      </div>

      {isLoading && <LoaderBig />}
    </div>
  );
};

export default ProductSection;
