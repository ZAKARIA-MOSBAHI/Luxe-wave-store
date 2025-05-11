import React from "react";
import Slider from "react-slick";
import CategoryCard from "../../pages/Home/components/CategoryCard";
import { ArrowLeft } from "lucide-react";

function CarouselNext({ className, onClick }) {
  return (
    <div
      className={
        "flex items-center justify-center p-4 bg-black absolute top-1/2 left-0 -translate-y-1/2 "
      }
      style={{ display: "block", background: "red" }}
      onClick={onClick}
    >
      <ArrowLeft fill="white" />
    </div>
  );
}

function CarouselPrev({ className, onClick }) {
  return (
    <div
      className={className}
      style={{ display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

function Carousel({ array }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <CarouselNext />,
    prevArrow: <CarouselPrev />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container px-4">
      <Slider {...settings}>
        {array.map((item, ind) => (
          <CategoryCard
            key={ind}
            categoryImage={item.image}
            categoryName={item.name}
          />
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
