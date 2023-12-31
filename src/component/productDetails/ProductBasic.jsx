import React, { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import ReactStars from "react-stars";
import FullScreenImgSlider from "../shared/FullScreenImgSlider";
import {
  useAddProdToCartMutation,
  useUpdateProdOfCartMutation,
} from "../../features/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { ToastError, ToastSuccess } from "../../utils/Toast";
import { addToCart } from "../../features/user/userSlice";

export default function ProductBasics({ data }) {
  const productDetailsSlider = useRef();
  const [addProdToCart, { isLoading }] = useAddProdToCartMutation();
  const [updateProdOfCart, { isLoading: crtQntLoad }] =
    useUpdateProdOfCartMutation();
  const [isProdImgModalOpen, setProdImgModal] = useState(false);
  const [prodQuantity, setProdQuantity] = useState(1);
  const cartItem = useSelector((state) => state.user?.data?.cartItem);
  const dispatch = useDispatch();

  const isProdExist_inCart = cartItem.find(
    (item) => item?.product?._id === data?.data?._id
  );
  const handleAddCart = (prod) => {
    addProdToCart({ productId: prod?._id, quantity: prodQuantity })
      .unwrap()
      .then((res) => {
        dispatch(addToCart(res?.data));
        ToastSuccess(res?.message);
      })
      .catch((err) => ToastError(err?.data?.message));
  };
  const updateCartProuctQuantity = (isAdd) => {
    if (isProdExist_inCart) {
      const quantity = isAdd
        ? isProdExist_inCart.quantity + 1
        : isProdExist_inCart.quantity - 1;
      updateProdOfCart({ productId: data?.data?._id, quantity })
        .unwrap()
        .catch(() => {});
    } else {
      const quantity = isAdd ? prodQuantity + 1 : prodQuantity - 1;
      setProdQuantity(quantity);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10 ">
        <div className="relative max-w-[220px] sm:max-w-[300px] lg:max-w-[400px]">
          <Swiper
            navigation={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay]}
            onBeforeInit={(swiper) => (productDetailsSlider.current = swiper)}
            className="productSlider"
          >
            {data?.data?.images?.map((img) => {
              return (
                <SwiperSlide key={img.url}>
                  <img src={img.url} alt="" />
                </SwiperSlide>
              );
            })}{" "}
          </Swiper>

          <ArrowLeftCircleIcon
            className="w-8 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-50 text-blue-100 hover:text-blue-500 duration-300 "
            onClick={() => productDetailsSlider.current.slidePrev()}
          />
          <ArrowRightCircleIcon
            className="w-8 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-50 text-blue-100 hover:text-blue-500 duration-300 "
            onClick={() => productDetailsSlider.current.slideNext()}
          />

          <button
            className="absolute bottom-0 right-0 z-20 bg-[#e1effc34] hover:bg-[#e8f4feb4] text-black p-2 rounded shadow"
            onClick={() => setProdImgModal(true)}
          >
            <ArrowsPointingOutIcon className="w-6" />
          </button>
          <FullScreenImgSlider
            data={data?.data?.images}
            state={isProdImgModalOpen}
            setState={setProdImgModal}
          />
        </div>

        <div className="text-start flex flex-row md:flex-col gap-8 ">
          <div className="border-0 md:border-b md:border-b-blue-gray pb-2">
            <h3 className="font-semibold mb-1 md:mb-3 text-xl text-gray-900 capitalize">
              {data?.data?.name}
            </h3>
            <p className="capitalize text-sm">
              <span className="font-semibold capitalize">Category:</span>{" "}
              {data?.data?.category}
            </p>
            <p className=" text-sm">
              <span className="font-semibold">Code:</span>{" "}
              {data?.data?.productCode}
            </p>
            <p className="capitalize text-sm">
              <span className="font-semibold">Brand:</span>{" "}
              <span className="uppercase">{data?.data?.brand}</span>
            </p>
            <p className="capitalize text-sm">
              <span className="font-semibold">Stock:</span>
              <span
                className={`inline-block ml-1 rounded-md font-semibold ${
                  data?.data?.stock === 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {data?.data?.stock}
              </span>
            </p>
          </div>

          <div className=" md:py-3">
            <div className="flex items-end gap-2 mb-1 md:mb-3">
              <h2 className="text-gray-900 font-bold text-xl md:text-3xl">
                Tk {data?.data?.sellPrice || data?.data?.price}
              </h2>
              {data?.data?.sellPrice && (
                <>
                  <h4 className="line-through text-gray-500">
                    Tk {data?.data?.price}
                  </h4>
                  <p className="text-blue-500 font-bold hidden md:inline-block">
                    {data?.data?.discount}% OFF
                  </p>
                </>
              )}
            </div>
            {data?.data?.sellPrice && (
              <p className="text-blue-500 font-bold block md:hidden">
                {data?.data?.discount}% OFF
              </p>
            )}

            <div className="flex flex-col md:flex-row mb-2 items-cemter md:items-end md:gap-3">
              <div className="flex items-center gap-2">
                <ReactStars
                  count={5}
                  size={20}
                  value={data?.data?.avg_rating}
                  color2={"#FF9933"}
                  half={true}
                  edit={false}
                />
                <span className="text-sm text-blue-gray-500">
                  ({data?.data?.avg_rating.toFixed(1)})
                </span>
              </div>

              <p className="text-gray-500">
                {data?.data?.totalReviews}{" "}
                {data?.data?.totalReviews > 1 ? "Reviews" : "Review"}
              </p>
            </div>

            <ButtonGroup size="sm" className="mt-2">
              <Button
                className="text-sm font-normal px-3 py-1"
                disabled={
                  (!isProdExist_inCart && prodQuantity === 1) ||
                  isProdExist_inCart?.quantity === 1 ||
                  crtQntLoad ||
                  isLoading
                }
                onClick={() => updateCartProuctQuantity(false)}
              >
                -
              </Button>
              <Button
                className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                variant="text"
              >
                {" "}
                {crtQntLoad ? (
                  <Spinner className="w-3" />
                ) : isProdExist_inCart ? (
                  isProdExist_inCart?.quantity
                ) : (
                  prodQuantity
                )}
              </Button>
              <Button
                className="text-sm font-normal px-3 py-1"
                disabled={
                  data?.data?.stock ===
                    (isProdExist_inCart?.quantity || prodQuantity) || crtQntLoad
                }
                onClick={() => updateCartProuctQuantity(true)}
              >
                +
              </Button>
            </ButtonGroup>

            {isProdExist_inCart ? (
              <Button className="mt-5" disabled variant="outlined">
                Selected
              </Button>
            ) : (
              <Button
                className="mt-5"
                onClick={() => handleAddCart(data?.data)}
              >
                {isLoading ? <Spinner className="w-4" /> : "Add to cart"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
