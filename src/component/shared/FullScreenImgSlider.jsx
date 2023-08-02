import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "./FullScreenImgSlider.css";
import {
  ArrowLeftCircleIcon as ArrowLeft,
  ArrowRightCircleIcon as ArrowRight,
} from "@heroicons/react/24/outline";
import Modal from "../../utils/Modal";

const FullScreenImgSlider = ({ state, setState, data, key }) => {
  const prodDetailsModalSlider = useRef();
  return (
    <>
      <Modal
        key={key}
        isModalOpen={state}
        setModal={setState}
        size="xxl"
        bgTransparent={true}
      >
        <div className="w-full relative">
          <Swiper
            navigation={true}
            loop={true}
            onBeforeInit={(swiper) => (prodDetailsModalSlider.current = swiper)}
            className="productSlider"
          >
            {data?.map((img) => {
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
    </>
  );
};

export default FullScreenImgSlider;
