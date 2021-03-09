import React, { useState } from 'react'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import styled from 'styled-components';

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

const CarouselWrapper = styled.div`
  .slick-track {
    max-width: calc(1440px - 100px)!important;
    display: flex;
    width: 100% !important;
  }
  .slick-slide:hover {
    background: rgba(255, 255, 255, 1);
  }
  .slick-slide div:focus {
    outline: none;
  }
  .slick-prev{
    z-index: 1;
    height: 100%;
    width: 1rem;
    left: 0;
    background: silver;
  } 
  .slick-arrow{
    font-size: 1rem;
    color: #333;
    background: rgba(0,0,0,0.1);
    position: absolute;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    z-index: 2;
    &.left {
      left: 0.5rem;
    }
    &.right {
      right: 0.5rem;
    }
    &:hover {
      background: var(--main-purple);
      color: var(--white);
    }
    .fa-chevron-left, .fa-chevron-right {
      display: flex;
      align-items: center;
      height: 100%;
      margin: auto;
    }
  }
  .hide, .slick-disabled {
    display: none;
  }
  @media(max-width: 568px) {
    .slick-arrow {
      display: none;
    }
  }
`

export default Carousel;