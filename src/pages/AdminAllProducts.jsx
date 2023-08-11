import React, { useState } from "react";
import ProductsTable from "../component/adminAllProducts/ProductsTable";
import { useGetAllProductsMutation } from "../features/product/productApi";
import { LoaderBig } from "../utils/Loader";
import { useEffect } from "react";
import Pagination from "../component/shared/Pagination";
import { useGetAllCategoriesQuery } from "../features/category/categoryApi";
import { useGetAllBrandsQuery } from "../features/brand/brandApi";
import FilterOption from "../component/adminAllProducts/FilterOption";

const AdminAllProducts = () => {
  const [getAllProducts, { isLoading, data }] = useGetAllProductsMutation();
  const { isLoading: ctgLoading, data: prodCategories } =
    useGetAllCategoriesQuery();
  const { isLoading: brnLoading, data: prodBrands } = useGetAllBrandsQuery();
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [filter, setFilter] = useState({
    brands: [],
    categories: [],
    search: "",
    stock: "",
  });
  const { brands, categories, search, stock } = filter;
  const limitProduct = 20;
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
          totalProducts={data?.totalResults}
          limit={limitProduct}
        />
      </div>
    );
  }

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", activePageNumber);
    params.set("limit", limitProduct);
    params.set("stock", stock);
    if (categories?.length > 0) {
      params.set("categories", categories.join(","));
    }
    if (brands?.length > 0) {
      params.set("brands", brands.join(","));
    }
    if (search) {
      params.set("keyword", search);
    }

    let queryParams;
    if (params.size > 0) {
      queryParams = `/?${decodeURIComponent(params.toString())}`;
    } else {
      queryParams = "/";
    }

    getAllProducts(queryParams)
      .unwrap()
      .then((res) => {})
      .catch((err) => {});
  }, [
    getAllProducts,
    activePageNumber,
    categories,
    categories.length,
    brands,
    brands.length,
    search,
    stock,
  ]);

  return (
    <>
      <FilterOption
        ctgLoading={ctgLoading}
        categories={prodCategories}
        brnLoading={brnLoading}
        brands={prodBrands}
        filter={filter}
        setFilter={setFilter}
      />
      {pageData}
    </>
  );
};

export default AdminAllProducts;
