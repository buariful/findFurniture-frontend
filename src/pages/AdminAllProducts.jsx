import React, { useState } from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import ProductsTable from "../component/adminAllProducts/ProductsTable";
import { useGetAllProductsMutation } from "../features/product/productApi";
import { LoaderBig } from "../utils/Loader";
import { useEffect } from "react";
import Pagination from "../component/shared/Pagination";

const AdminAllProducts = () => {
  const [getAllProducts, { isLoading, data }] = useGetAllProductsMutation();
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [totalProducts, setTotalProducts] = useState("");

  const handlePaginationAction = (pageNumber) => {
    setActivePageNumber(pageNumber);
  };

  let pageData;
  if (isLoading) {
    pageData = (
      <div className="flex justify-center mb-14">
        <LoaderBig />
      </div>
    );
  }
  if (data) {
    pageData = (
      <div className="mb-12">
        <ProductsTable data={data?.data} />
        <Pagination
          handlePaginationAction={handlePaginationAction}
          activePageNumber={activePageNumber}
          totalProducts={totalProducts}
          limit={2}
        />
      </div>
    );
  }

  useEffect(() => {
    const params = new URLSearchParams();

    if (activePageNumber !== 1) {
      params.set("page", activePageNumber);
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
  }, [getAllProducts, activePageNumber]);

  return (
    <>
      <div className="mt-16 mb-8">
        <DashboardTitle text="all products" />
      </div>

      {pageData}
    </>
  );
};

export default AdminAllProducts;
