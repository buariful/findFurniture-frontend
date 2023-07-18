import React, { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "./productBasic.css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowsPointingOutIcon,
  ArrowLeftCircleIcon as ArrowLeft,
  ArrowRightCircleIcon as ArrowRight,
} from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@material-tailwind/react";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Modal from "../../utils/Modal";

export default function ProductBasics({ data }) {
  const productDetailsSlider = useRef();
  const prodDetailsModalSlider = useRef();
  const [isProdImgModalOpen, setProdImgModal] = useState(false);

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
            {data?.images?.map((img) => {
              return (
                <SwiperSlide key={img.url}>
                  <img src={img.url} alt="" />
                </SwiperSlide>
              );
            })}{" "}
          </Swiper>

          <ArrowLeftCircleIcon
            className="w-8 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-50 text-white "
            onClick={() => productDetailsSlider.current.slidePrev()}
          />
          <ArrowRightCircleIcon
            className="w-8 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-50 text-white "
            onClick={() => productDetailsSlider.current.slideNext()}
          />

          <button
            className="absolute bottom-0 right-0 z-20 bg-[#e1effc34] hover:bg-[#e8f4feb4] text-black p-2 rounded shadow"
            onClick={() => setProdImgModal(true)}
          >
            <ArrowsPointingOutIcon className="w-6" />
          </button>

          <Modal
            key="ProductBasic"
            isModalOpen={isProdImgModalOpen}
            setModal={setProdImgModal}
            size="xxl"
            bgTransparent={true}
          >
            <div className="w-full relative">
              <Swiper
                navigation={true}
                loop={true}
                onBeforeInit={(swiper) =>
                  (prodDetailsModalSlider.current = swiper)
                }
                className="productSlider"
              >
                {data?.images?.map((img) => {
                  return (
                    <SwiperSlide key={img.url}>
                      <img
                        src={img.url}
                        alt=""
                        className="max-w-2xl mx-auto max-h-[70vh] mt-10"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <ArrowLeft
                className="w-10 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-50 text-white "
                onClick={() => prodDetailsModalSlider.current.slidePrev()}
              />
              <ArrowRight
                className="w-10 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-50 text-white "
                onClick={() => prodDetailsModalSlider.current.slideNext()}
              />
            </div>
          </Modal>
        </div>

        <div className="text-start flex flex-row md:flex-col gap-8 ">
          <div className="border-0 md:border-b md:border-b-blue-gray pb-2">
            <h3 className="font-semibold mb-1 md:mb-3 text-xl text-gray-900 capitalize">
              {data?.name}
            </h3>
            <p className="capitalize text-sm">
              <span className="font-semibold capitalize">Category:</span>{" "}
              {data?.category}
            </p>
            <p className=" text-sm">
              <span className="font-semibold">Code:</span> {data?.productCode}
            </p>
            <p className="capitalize text-sm">
              <span className="font-semibold">Brand:</span> RFL
            </p>
          </div>

          <div className=" md:py-3">
            <div className="flex items-end gap-2 mb-1 md:mb-3">
              <h2 className="text-gray-900 font-bold text-xl md:text-3xl">
                Tk {data?.discount ? data?.sellPrice : data?.price}
              </h2>
              {data?.discount && (
                <>
                  <h4 className="line-through text-gray-500">
                    Tk {data?.price}
                  </h4>
                  <p className="text-blue-500 font-bold hidden md:inline-block">
                    {data?.discount}% OFF
                  </p>
                </>
              )}
            </div>
            <p className="text-blue-500 font-bold block md:hidden">
              {data?.discount}% OFF
            </p>

            <div className="flex flex-col md:flex-row mb-2 items-start md:items-end md:gap-3">
              <ReactStars
                count={5}
                onChange={(e) => console.log(e)}
                size={25}
                activeColor="#ffd700"
                edit={false}
                isHalf={true}
                value={data?.avg_rating}
              />
              <p className="text-gray-500">(15 Reviews)</p>
            </div>

            <ButtonGroup size="sm" className="mt-2">
              <Button className="text-sm font-normal px-3 py-1">-</Button>
              <Button
                className="text-[11px] font-normal px-3 py-1 text-black bg-white border cursor-default"
                variant="text"
              >
                1
              </Button>
              <Button className="text-sm font-normal px-3 py-1">+</Button>
            </ButtonGroup>

            <Button className="mt-5">Add to cart</Button>
          </div>
        </div>
      </div>
    </>
  );
}
