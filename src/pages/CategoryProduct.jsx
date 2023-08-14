import React from "react";
import ProductSection from "../component/home/ProductSection";
import { useDispatch, useSelector } from "react-redux";
import DashboardTitle from "../component/shared/DashboardTitle";
import { Breadcrumbs } from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { resetFilter } from "../features/searchFilter/searchFilterSlice";

const CategoryProduct = () => {
  const category = useSelector((state) => state.filter.categories[0]);
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <>
      <div className="py-5">
        <DashboardTitle text={category} />
      </div>
      {location === "/category-product" ? (
        <div className="w-11/12 mx-auto">
          <Breadcrumbs>
            <Link
              className="flex items-center gap-1 font-semibold"
              to="/"
              onClick={() => dispatch(resetFilter())}
            >
              <HomeIcon className="w-4" /> <span>Home</span>
            </Link>
            <p className="cursor-text capitalize hover:text-black">
              {category}
            </p>
          </Breadcrumbs>
        </div>
      ) : (
        ""
      )}

      <ProductSection />
    </>
  );
};

export default CategoryProduct;
