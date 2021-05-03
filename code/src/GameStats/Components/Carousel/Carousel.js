import React, { useState } from 'react'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { CarouselWrapper } from "./Carousel-style";

const LeftArrow = ({ onClick, activeSlide }) => (
  <button
    className={`slick-arrow left ${activeSlide === 0 && 'hide'}`}
    disabled={activeSlide === 0}
    onClick={onClick}
  >
    <i className="fas fa-chevron-left"></i>
  </button>
);

const RightArrow = ({ onClick, numOfItems, activeSlide }) => {
  const disableButton = Math.floor(numOfItems / 6) <= activeSlide;
  return (
    <button
      className={`slick-arrow right ${disableButton && 'hide'}`}
      onClick={onClick}
      disabled={disableButton}
    >
      <i className="fas fa-chevron-right"></i>
    </button>
  )
};

const Carousel = ({ children, numOfItems }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const settings = {
    className: "variable-width center",
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    swipeToSlide: true,
    variableWidth: true,
    prevArrow: <LeftArrow activeSlide={activeSlide} />,
    nextArrow: <RightArrow activeSlide={activeSlide} numOfItems={numOfItems} />,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 1380,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };
  return (
    <CarouselWrapper activeSlide={activeSlide}>
      <Slider {...settings}>
        {children}
      </Slider>
    </CarouselWrapper>
  )
}

export default Carousel;