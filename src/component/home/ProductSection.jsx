import React, { useEffect, useState } from "react";
import ProdFilter from "./ProdFilter";
import ProdAllProducts from "./ProdAllProducts";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsMutation } from "../../features/product/productApi";
import { LoaderFullScreen } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";
import { setPage } from "../../features/searchFilter/searchFilterSlice";
import Pagination from "../shared/Pagination";

const ProductSection = () => {
  const [getAllProducts, { isLoading, error, data }] =
    useGetAllProductsMutation();
  const filterData = useSelector((state) => state.filter);
  const {
    brands,
    categories,
    colors,
    discount,
    keyword,
    selectedPage,
    highPrice,
    lowPrice,
  } = filterData;
  const [totalProducts, setTotalProducts] = useState("");
  const [activePageNumber, setActivePageNumber] = useState(1);
  const dispatch = useDispatch();

  const handlePaginationAction = (pageNumber) => {
    dispatch(setPage(pageNumber));
    setActivePageNumber(pageNumber);
  };
  useEffect(() => {
    const params = new URLSearchParams();
    if (colors?.length > 0) {
      params.set("colors", colors.join(","));
    }
    if (categories?.length > 0) {
      params.set("categories", categories.join(","));
    }
    if (brands?.length > 0) {
      params.set("brands", brands.join(","));
    }
    if (discount !== null) {
      params.set("discount", discount);
    }
    if (keyword) {
      params.set("keyword", keyword);
    }
    if (selectedPage !== 1) {
      params.set("page", selectedPage);
    }
    // if (highPrice !== 40000) {
    //   params.set("highPrice", highPrice);
    // }
    // if (lowPrice !== 0) {
    //   params.set("lowPrice", lowPrice);
    // }
    params.set("lowPrice", lowPrice);
    params.set("highPrice", highPrice);

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
  }, [
    brands,
    categories,
    colors,
    discount,
    keyword,
    selectedPage,
    lowPrice,
    highPrice,
    dispatch,
    getAllProducts,
  ]);

  return (
    <div className="py-5 w-11/12 max-w-7xl mx-auto grid grid-cols-12 gap-8 relative">
      <div className="col-span-12 xl:col-span-3 border-b xl:border-r border-[#eee] pb-3 xl:pb-0 xl:pr-3 ">
        <ProdFilter />
      </div>
      <div className="col-span-12 xl:col-span-9 ">
        {keyword && (
          <div className="pb-1 inline-block border-b border-b-blue-500 mb-5">
            <h4 className="font-bold">SEARCH "{keyword}"</h4>
            <p className="text-sm">Total {data?.totalResults} products found</p>
          </div>
        )}

        {data && <ProdAllProducts data={data?.data} />}
        {error && (
          <AlertError
            text={
              error?.data?.message ? error?.data?.message : "No product found"
            }
          />
        )}
        {data?.totalResults > 4 && (
          <Pagination
            handlePaginationAction={handlePaginationAction}
            totalProducts={totalProducts}
            activePageNumber={activePageNumber}
            limit={10}
          />
        )}
        {isLoading && <LoaderFullScreen />}
      </div>
    </div>
  );
};

export default ProductSection;
