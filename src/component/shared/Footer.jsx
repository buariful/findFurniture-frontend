import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-5 place-items-center">
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
              <Link
                className="flex items-center gap-2 hover:text-gray-300"
                to="/"
              >
                <img
                  src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                  alt=""
                  className="w-8 rounded-full"
                />
                <span className="">Shelf</span>
              </Link>
            </div>
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
