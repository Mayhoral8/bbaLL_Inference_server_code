//TimeLineComponents Styled Component
import styled from "styled-components";
export const RailOuterStyle = styled.div`
  position: absolute;
  width: 110%;
  height: 8vh;
  border-radius: 7;
  cursor: pointer;
  transform: translate(-5%, -50%);
`;
export const RailDotted = styled.div`
  height: 0px;
  border: 1.5px dashed #b2adce;
`;

export const SliderBallDiv = styled.div`
  position: absolute;
  transform: translate(-50%, -40%);
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  user-select: none;
  ${(props) => {
    return `
      left: ${props.percent}%
    `;
  }}
`;
export const SliderBall = styled.img`
  max-height: 100%;
  max-width: 100%;
  transform: translate(0%, -10%);
`;
export const TickCircle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #544a91;
  border-radius: 5px;
  transform: translate(-45%, -60%);
  pointer-events: none;
  ${(props) => {
    return `
    left: ${props.percent}%
  `;
  }}
`;
export const TickNameDiv = styled.div`
  position: absolute;
  margin-top: 22px;

  font-weight: 525;
  text-align: center;
  user-select: none;
  ${(props) => {
    return `
    left: ${props.percent}%;
    margin-left: ${-(100 / props.count) / 2}%;
    width: ${100 / props.count}%;
  `;
  }}
  @media (min-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 1023px) {
    font-size: 2vw;
  }
`;
