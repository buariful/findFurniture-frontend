import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useGetAllCategoriesQuery } from "../../features/category/categoryApi";
import { LoaderBig } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";

const CategorySlider = () => {
  const { isLoading, data, error } = useGetAllCategoriesQuery();

  let categorySlides;
  if (isLoading) {
    categorySlides = (
      <div className="grid place-items-center py-2">
        <LoaderBig />
      </div>
    );
  }
  if (data) {
    categorySlides = data?.data?.map((d) => {
      return (
        <SwiperSlide key={d._id}>
          <div className="group ">
            <div className="grid place-items-center w-[110px] h-[110px] mx-auto rounded-full bg-[#E9E9E9]  ">
              <img
                src={d.picture[0].url}
                alt=""
                className="max-w-full rounded-full"
              />
            </div>

            <p className="font-semibold text-sm child group-hover:text-blue-500 capitalize">
              {d.name}
            </p>
          </div>
        </SwiperSlide>
      );
    });
  }

  if (error) {
    categorySlides = (
      <div className="py-2">
        <AlertError text={error.data.message} />
      </div>
    );
  }
  return (
    <div className="pt-3 pb-4 border-b border-b-gray-200 w-11/12 max-w-7xl mx-auto">
      <Swiper
        className="category_slider"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
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
        {categorySlides}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
