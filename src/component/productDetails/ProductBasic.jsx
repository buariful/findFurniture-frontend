import React, { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "./productBasic.css";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { Button, ButtonGroup } from "@material-tailwind/react";
import ReactStars from "react-rating-stars-component";

export default function ProductBasics() {
  const productDetailsSlider = useRef();
  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <div className="relative md:max-w-[350px] lg:max-w-[450px]">
          <Swiper
            navigation={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay]}
            onBeforeInit={(swiper) => (productDetailsSlider.current = swiper)}
            className="productSlider"
          >
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-1.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-2.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-3.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://swiperjs.com/demos/images/nature-4.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>

          <ArrowLeftCircleIcon
            className="w-8 cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-50 text-white "
            onClick={() => productDetailsSlider.current.slidePrev()}
          />
          <ArrowRightCircleIcon
            className="w-8 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-50 text-white "
            onClick={() => productDetailsSlider.current.slideNext()}
          />

          <button className="absolute bottom-0 right-0 z-20 bg-[#e1effc34] hover:bg-[#e8f4feb4] text-black p-2 rounded shadow">
            <ArrowsPointingOutIcon className="w-6" />
          </button>
        </div>

        <div className="text-start">
          <div className="border-b border-b-blue-gray pb-2">
            <h3 className="font-semibold mb-3 text-2xl text-gray-900">
              Product Name
            </h3>
            <p className="capitalize">
              <span className="font-semibold">Category:</span> ddd
            </p>
            <p className="capitalize">
              <span className="font-semibold">Code:</span> 5dfsdfsd
            </p>
            <p className="capitalize">
              <span className="font-semibold">Brand:</span> RFL
            </p>
          </div>

          <div className="py-3">
            <div className="flex items-end gap-2 mb-3">
              <h2 className="text-gray-900 font-bold text-3xl">Tk 782 </h2>
              <h4 className="line-through text-gray-500">Tk 100</h4>
              <p className="text-blue-500 font-bold">5% OFF</p>
            </div>

            <div className="flex gap-3 mb-2 items-end">
              <ReactStars
                count={5}
                onChange={(e) => console.log(e)}
                size={25}
                activeColor="#ffd700"
                isHalf={true}
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
