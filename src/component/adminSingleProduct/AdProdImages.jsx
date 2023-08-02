import React, { useState } from "react";
import { EyeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LoaderSmall } from "../../utils/Loader";
import FullScreenImgSlider from "../shared/FullScreenImgSlider";
import { Button } from "@material-tailwind/react";

const AdProdImages = ({ product, isLoading }) => {
  const [isFullScreenSliderOpen, setFullScreenSlider] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files);
    const selectedImagesArray = files.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
    }));
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...selectedImagesArray,
    ]);
  };

  const handleImageDelete = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  return (
    <>
      <div className="w-11/12 mx-auto mt-6 mb-3">
        {/* ---------- the images that are using ------ */}
        <h3 className="font-semibold text-xl text-start">Product Images</h3>
        <div className="flex items-center flex-wrap gap-8">
          {product?.data?.images?.map((img) => (
            <div key={img?.url} className="relative">
              <img
                src={img.url}
                alt=""
                className="w-[200px] h-[180px] object-cover"
              />
              <div className="p-2 bg-blue-gray-50 flex justify-between">
                <EyeIcon
                  className="w-4 cursor-pointer hover:text-blue-700"
                  strokeWidth={2}
                  onClick={() => setFullScreenSlider(true)}
                />
                <TrashIcon
                  className="w-4 cursor-pointer hover:text-red-700"
                  strokeWidth={2}
                />
              </div>
              {isLoading && (
                <div className="absolute top-0 left-0 h-full w-full bg-[#efefefa1] grid place-items-center">
                  <LoaderSmall />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border border-black p-5 rounded my-10">
          {/* ------------ add more images ------------- */}
          {selectedImages.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-5 mt-2 mb-5">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[130px] w-[150px] bg-[#eee] rounded grid place-items-center"
                >
                  <img
                    src={image.previewURL}
                    alt={`Preview ${index}`}
                    className="max-h-[130px] object-cover"
                  />
                  <span
                    className="inline-block p-1 absolute top-0 right-0 bg-red-50 hover:bg-red-200 text-black rounded cursor-pointer"
                    onClick={() => handleImageDelete(index)}
                  >
                    <XMarkIcon className="w-4" strokeWidth={2} />
                  </span>
                </div>
              ))}
            </div>
          )}
          <form className="flex justify-center items-end gap-6">
            <div>
              {" "}
              <label
                className="block mb-2 font-medium text-gray-900"
                htmlFor="file_input_admin"
              >
                Upload More Images Of The Proudct
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 focus:border-blue-700 rounded-lg cursor-pointer bg-gray-50 py-2 px-1"
                id="file_input_admin"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
              />
            </div>
            <Button disabled={selectedImages.length < 1}>Upload</Button>
          </form>
        </div>
      </div>

      <FullScreenImgSlider
        data={product?.data?.images}
        state={isFullScreenSliderOpen}
        setState={setFullScreenSlider}
        key={product?._id}
      />
    </>
  );
};

export default AdProdImages;
