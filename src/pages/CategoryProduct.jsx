import React from "react";
import ProductSection from "../component/home/ProductSection";
import { useSelector } from "react-redux";
import DashboardTitle from "../component/shared/DashboardTitle";

const CategoryProduct = () => {
  const category = useSelector((state) => state.filter.categories[0]);

  return (
    <>
      <div className="py-5">
        <DashboardTitle text={category} />
      </div>

      <ProductSection />
    </>
  );
};

export default CategoryProduct;
