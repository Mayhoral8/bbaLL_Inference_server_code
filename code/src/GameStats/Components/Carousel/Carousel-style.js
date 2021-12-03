import styled from 'styled-components';

// Used in Carousel.js
export const CarouselWrapper = styled.div`
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
      background: var(--main-blue);
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
