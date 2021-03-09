import styled from "styled-components";

export const GraphInfoWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin: ${({ nomargin }) => nomargin ? '0' : '0.5rem 0 0 0.5rem'};
  color: #534a91;
  cursor: pointer;
  text-align: left;

  &::after,
  &::before {
    --scale: 0;
    --tooltip-color: rgba(0,0,0,0.25);
    --arrow-size: 10px;
    
    position: absolute;
    top: 50%;
    left: 1.5rem;
    line-height: 1.5;
    background: rgba(255,255,255, 0.95);
    transform: translateX(var(--translate-x, 0)) translateY(-50%) scale(var(--scale));
    z-index: 10;
    box-shadow: 10px 25px 50px -12px rgba(0, 0, 0, 0.25);
    transition: 0.15s transform;
    transform-origin: left center;
  } 

  &::before {
    --translate-x: var(--arrow-size);
    content: attr(data-tooltip);
    width: 20rem;
    padding: 1rem;
    border-radius: 0.3rem;
    white-space: pre-wrap;
  }
  @media(max-width: 768px) {
    &::after,
    &::before {
      transform: translateX(var(--translate-x, 0)) translateY(-40%) scale(var(--scale));
    } 
    &::before {
      width: 270px;
    }
  }
 
  &:hover::before,
  &:hover::after {
    --scale: 1;
  }

  &::after {
    --translate-x: calc(-1 * var(--arrow-size));
    content: '';
    border: var(--arrow-size) solid transparent;
    border-right-color: var(--tooltip-color);
    transform-origin: right center;
    box-shadow: none;
    background: none;
  }
`