import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { LoaderBig } from "../../utils/Loader";
import { AlertError } from "../../utils/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilter,
  setCategories,
} from "../../features/searchFilter/searchFilterSlice";

const CategorySlider = () => {
  const { isLoading, data, error } = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLocation = (name) => {
    dispatch(resetFilter());
    dispatch(setCategories(name));
    navigate("/category-product");
  };

  let categorySlides;
  if (isLoading) {
    categorySlides = (
      <div className="grid place-items-center py-2">
        <LoaderBig />
      </div>
    );
  }
  if (data) {
    categorySlides = data?.map((d) => {
      return (
        <SwiperSlide key={d._id}>
          <div
            className="group cursor-pointer"
            onClick={() => handleLocation(d.name)}
          >
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
        <AlertError text={error} />
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
