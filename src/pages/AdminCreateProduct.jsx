import React, { useState } from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody } from "@material-tailwind/react";
import ProductFormInfo from "../component/adminSingleProduct/ProductFormInfo";

const AdminCreateProduct = () => {
  const [images, setImages] = useState([]);

  console.log(Array.from(images));
  console.log(Array.from(images).map((img) => URL.createObjectURL(img)));

  let selectedImages;
  if (images.length > 0) {
    selectedImages = Array.from(images).map((img, i) => {
      return (
        <div
          key={i}
          className="relative h-[150px] w-[150px] bg-[#eee] rounded grid place-items-center"
        >
          <img
            src={img ? URL.createObjectURL(img) : ""}
            alt=""
            className="w-full h-[150px] object-cover"
          />
          <span className="inline-block p-1 absolute top-0 right-0 bg-red-50 hover:bg-red-200 text-black rounded cursor-pointer">
            <XMarkIcon className="w-4" strokeWidth={2} />
          </span>
        </div>
      );
    });
  }
  return (
    <>
      <div className="mt-12 mb-8">
        <DashboardTitle text="Add a product" />
      </div>

      <div className="w-11/12 max-w-4xl mx-auto mb-16">
        <Card>
          <CardBody>
            <form>
              <ProductFormInfo />

              <label
                className="block mb-2 font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload Images Of Proudct
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 focus:border-blue-700 rounded-lg cursor-pointer bg-gray-50 py-2 px-1"
                id="file_input"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />

              <div className="flex justify-center items-center gap-5 mt-10">
                {selectedImages}
              </div>

              <div className="mt-10 ">
                <Button variant="gradient" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AdminCreateProduct;
