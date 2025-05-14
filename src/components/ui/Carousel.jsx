import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDeviceType } from "../../hooks/useDeviceType";
import "swiper/css";
import { cn } from "../../admin/utils/clsx";

const PrevBtn = ({ onClick }) => {
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      btnRef.current.style.left = `${-width / 2}px`;
    }
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className="absolute cursor-pointer top-1/2 -translate-y-1/2 z-10 p-2  bg-gray-900 text-white flex items-center justify-center"
    >
      <ChevronLeft />
    </button>
  );
};

const NextBtn = ({ onClick }) => {
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      btnRef.current.style.right = `${-width / 2}px`;
    }
  }, []);
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className="absolute  top-1/2 z-10 cursor-pointer -translate-y-1/2 p-2 bg-gray-900 text-white flex items-center justify-center"
    >
      <ChevronRight />
    </button>
  );
};

export default function Carousel({
  items = [],
  spaceBetween = 8,
  breakpoints = null,
  renderItem,
  className = "",
}) {
  const [sliderController, setSliderController] = useState(null);
  const { width } = useDeviceType();
  if (breakpoints === null) {
    breakpoints = {
      0: { slidesPerView: 1 },
      500: { slidesPerView: 2 },
      700: { slidesPerView: 3 },
      850: { slidesPerView: 4 },
      1000: { slidesPerView: 5 },
    };
  }
  const ScrollNext = () => {
    sliderController.slideNext();
  };
  const ScrollPrev = () => {
    sliderController.slidePrev();
  };

  return (
    <div
      className={cn(
        `flex justify-center relative w-[280px] min-[500px]:w-[90%] mx-auto`,
        className
      )}
    >
      <Swiper
        className={`my-4`}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        onSwiper={setSliderController}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            className="flex-shrink-0"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
      {width < 1000 && (
        <>
          <PrevBtn onClick={ScrollPrev} />
          <NextBtn onClick={ScrollNext} />
        </>
      )}
    </div>
  );
}
