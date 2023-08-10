import React, { useState } from "react";
import { EyeIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import FullScreenImgSlider from "../shared/FullScreenImgSlider";
import { Button, Spinner } from "@material-tailwind/react";
import {
  useAddProdImageMutation,
  useDeleteProdImageMutation,
} from "../../features/product/productApi";
import { ToastError, ToastSuccess } from "../../utils/Toast";
import { LoaderSmall } from "../../utils/Loader";

const AdProdImages = ({ product, refetch }) => {
  const [addProdImage, { isLoading }] = useAddProdImageMutation();
  const [deleteProdImage, { isLoading: imgDltLoading }] =
    useDeleteProdImageMutation();
  const [isFullScreenSliderOpen, setFullScreenSlider] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [dltImagePublicId, setDltImagePublicId] = useState("");

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

  const removeImg = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const updatedImages = [...prevSelectedImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image.file);
    });

    addProdImage({ data: formData, id: product?.data?._id })
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        refetch();
        e.target.reset();
        setSelectedImages("");
      })
      .catch((err) => ToastError(err?.data?.message));
  };

  const handleImgDelete = (publicId) => {
    setDltImagePublicId(publicId);
    const bodyData = {
      id: product?.data?._id,
      data: { publicIdStr: publicId },
    };
    deleteProdImage(bodyData)
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        refetch();
      })
      .catch((err) => ToastError(err?.data?.message));
  };

  return (
    <>
      <div className="w-11/12 mx-auto mt-6 mb-3">
        {/* ---------- the images that are using ------ */}
        <h3 className="font-semibold text-xl text-start">Product Images</h3>
        <div className="flex items-center flex-wrap gap-8">
          {console.log(
            "product image",
            product?.data?.images.find(
              (f) => f.publicId === "findFurniture/omtee8paw4zfmac7nr7d"
            )
          )}
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
                  onClick={() => handleImgDelete(img.publicId)}
                />
              </div>
              {imgDltLoading && dltImagePublicId === img.publicId && (
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
                    onClick={() => removeImg(index)}
                  >
                    <XMarkIcon className="w-4" strokeWidth={2} />
                  </span>
                </div>
              ))}
            </div>
          )}
          <form
            className="flex justify-center items-end gap-6"
            onSubmit={handleImageUpload}
          >
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
            <Button type="submit" disabled={selectedImages.length < 1}>
              {isLoading ? <Spinner className="w-5" /> : <span>upload</span>}
            </Button>
          </form>
        </div>
      </div>

      <FullScreenImgSlider
        data={product?.data?.images}
        state={isFullScreenSliderOpen}
        setState={setFullScreenSlider}
      />
    </>
  );
};

export default AdProdImages;
