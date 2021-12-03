//TitleBox Styled Component
import styled from "styled-components";

export const TitleBoxDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;
`;

export const NetImgDiv = styled.div`
  margin-right: 1rem;
  user-select: none;
  display: flex;
  align-items: center;
  width: ${props => props.page === "leaderboard" ? '13%' : '10%'};
  img {
    width: 100%;
  }
`;

export const TitleBoxRightDiv = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: 550;
  margin-top: 1vh;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  color: #090979;
  user-select: none;
  @media(min-width: 768px) {
    font-size: 3rem;
    text-align: center;
  }
`;