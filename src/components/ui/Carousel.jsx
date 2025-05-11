import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDeviceType } from "../../hooks/useDeviceType";
import tshirts from "../../assets/client/images/tshirt-cat.jpg";
import shorts from "../../assets/client/images/shorts-cat.jpg";
import accessories from "../../assets/client/images/accessory-cat.jpg";
import hoodies from "../../assets/client/images/hoodies-cat.jpg";
import pants from "../../assets/client/images/pants-cat.jpg";

import "swiper/css";
import CategoryCard from "../../pages/Home/components/CategoryCard";

const categories = [
  { name: "T-Shirts", image: tshirts },
  { name: "Bottoms", image: shorts },
  { name: "Women", image: pants },
  { name: "Accessories", image: accessories },
  { name: "Hoodies & Sweaters", image: hoodies },
];
const PrevBtn = ({ setLeftPadding }) => {
  const swiper = useSwiper();
  const handlePrev = () => {
    return swiper.slidePrev();
  };
  const btnRef = React.useRef();
  React.useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      setLeftPadding(width / 2);
    }
  }, []);
  return (
    <button
      ref={btnRef}
      onClick={handlePrev}
      className="absolute cursor-pointer  top-1/2 -translate-y-1/2 z-10 p-2 left-0 bg-gray-900 text-white flex items-center justify-center"
    >
      <ChevronLeft />
    </button>
  );
};
const NextBtn = () => {
  const swiper = useSwiper();
  const handleNext = () => {
    swiper.slideNext();
  };
  const [whiteLayerWidth, setWhiteLayerWidth] = React.useState(0);
  const btnRef = React.useRef();

  React.useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      setWhiteLayerWidth(width / 2);
    }
  }, []);
  return (
    <div
      style={{
        width: whiteLayerWidth,
      }}
      className="h-full w-2 absolute top-0 z-10 right-0 bg-white"
    >
      <button
        ref={btnRef}
        onClick={handleNext}
        className="absolute  right-0 top-1/2 cursor-pointer -translate-y-1/2  p-2 bg-gray-900 text-white flex items-center justify-center"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
export default function Carousel() {
  const { width } = useDeviceType();
  const [leftPadding, setLeftPadding] = React.useState(0);

  return (
    <div className="flex justify-center">
      <Swiper
        className=" w-[95%] lg:w-full  my-4 relative "
        spaceBetween={8}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{
          paddingLeft: width < 1000 ? leftPadding : 12,
          paddingRight: width < 1000 ? 0 : 12,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 2,
          },
          700: {
            slidesPerView: 3,
          },
          850: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
        }}
      >
        {categories.map((item, index) => (
          <SwiperSlide
            className="flex-shrink-0 w-full"
            key={index}
            style={{
              width: "100%",
              paddingRight: index + 1 === 6 ? leftPadding : 0,
            }}
          >
            <CategoryCard categoryImage={item.image} categoryName={item.name} />
          </SwiperSlide>
        ))}
        {width >= 1000 ? null : (
          <>
            <PrevBtn setLeftPadding={setLeftPadding} />
            <NextBtn />
          </>
        )}
      </Swiper>
    </div>
  );
}
