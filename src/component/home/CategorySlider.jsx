import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { Autoplay } from "swiper";

const CategorySlider = () => {
  return (
    <div className="pt-3 pb-4 border-b border-b-gray-200 w-11/12 max-w-7xl mx-auto">
      <Swiper
        className="category_slider"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        rewind={true}
        slidesPerView="auto"
        spaceBetween={30}
        breakpoints={{
          567: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="group cursor-pointer">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src="https://res.cloudinary.com/dygolqxi7/image/upload/v1688135012/FindFurniture/shelf_ixv0qw.jpg"
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500">
              Shelf
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CategorySlider;
