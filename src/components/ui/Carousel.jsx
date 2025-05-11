import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDeviceType } from "../../hooks/useDeviceType";
import "swiper/css";

const PrevBtn = ({ setLeftPadding }) => {
  const swiper = useSwiper();
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      setLeftPadding(width / 2);
    }
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => swiper.slidePrev()}
      className="absolute cursor-pointer top-1/2 -translate-y-1/2 z-10 p-2 left-0 bg-gray-900 text-white flex items-center justify-center"
    >
      <ChevronLeft />
    </button>
  );
};

const NextBtn = () => {
  const swiper = useSwiper();
  const [whiteLayerWidth, setWhiteLayerWidth] = useState(0);
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      setWhiteLayerWidth(width / 2);
    }
  }, []);

  return (
    <div
      style={{ width: whiteLayerWidth }}
      className="h-full w-2 absolute top-0 z-10 right-0 bg-white"
    >
      <button
        ref={btnRef}
        onClick={() => swiper.slideNext()}
        className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 p-2 bg-gray-900 text-white flex items-center justify-center"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default function Carousel({
  items = [],
  spaceBetween = 8,
  breakpoints = null,
  renderItem,
  className = "",
}) {
  const { width } = useDeviceType();
  const [leftPadding, setLeftPadding] = useState(0);
  if (breakpoints === null) {
    breakpoints = {
      0: { slidesPerView: 1 },
      500: { slidesPerView: 2 },
      700: { slidesPerView: 3 },
      850: { slidesPerView: 4 },
      1000: { slidesPerView: 5 },
    };
  }

  return (
    <div className="flex justify-center">
      <Swiper
        className={`${className} my-4 relative`}
        spaceBetween={spaceBetween}
        style={{
          paddingLeft: width < 1000 ? leftPadding : 12,
          paddingRight: width < 1000 ? 0 : 12,
        }}
        breakpoints={breakpoints}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex-shrink-0    "
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingRight: index === items.length - 1 ? leftPadding : 0,
            }}
          >
            {renderItem(item, index)}
          </SwiperSlide>
        ))}

        {width < 1000 && (
          <>
            <PrevBtn setLeftPadding={setLeftPadding} />
            <NextBtn />
          </>
        )}
      </Swiper>
    </div>
  );
}
