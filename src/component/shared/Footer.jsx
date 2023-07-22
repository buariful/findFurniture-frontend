import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  resetFilter,
  setCategories,
} from "../../features/searchFilter/searchFilterSlice";
import { LoaderSmall } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";

const Footer = () => {
  const { isLoading, data, error } = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let categories;
  if (data) {
    categories = (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 ">
        {data.map((d) => (
          <div
            key={d._id}
            className="flex items-center gap-2 hover:text-gray-300 duration-300 text-start cursor-pointer"
            onClick={() => {
              dispatch(resetFilter());
              dispatch(setCategories(d?.name));
              navigate("/category-product");
            }}
          >
            <img src={d?.picture[0]?.url} alt="" className="w-8 rounded-full" />
            <span className="capitalize">{d?.name}</span>
          </div>
        ))}
      </div>
    );
  }
  if (isLoading) {
    categories = (
      <div className="grid place-items-center">
        <LoaderSmall />
      </div>
    );
  }
  if (error) {
    categories = <AlertError text={error?.data?.message} />;
  }

  return (
    <footer className="bg-gradient-to-t from-[#0e94ff] to-[#004a85] py-10 ">
      <div className="w-11/12 max-w-7xl mx-auto mb-6">
        <Link>
          <img
            src={require("../../images/logo.png")}
            alt=""
            className="w-[150px] mx-auto"
          />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center mt-4">
          <p className="max-w-xl mx-auto text-white text-start md:border-r border-r-[#eee] md:p-5">
            FindFurniture - Your destination for stylish and affordable
            furniture. Transform your home with our curated collection of modern
            and classic designs.
          </p>

          <div className="md:p-5">
            <h4 className="font-semibold text-xl border-b border-b-white text-gray-100 mb-5 inline-block">
              Categories
            </h4>
            {categories}
          </div>
        </div>

        <p className="text-white mt-3">
          &#169; 2023 FindFurniture. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
