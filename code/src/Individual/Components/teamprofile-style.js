import styled from "styled-components";
import { Link } from "react-router-dom";
export const TeamProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const TeamProfileTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 2rem;
  color: var(--main-purple);
  font-weight: 550;
  .team-name-container {
    display: flex;
    align-items: center;
  }
  .team-name {
    text-align: left;
  }
  .img-container {
    margin-right: 1rem;
    margin-top: 1rem;
    width: 100px;
    img {
      width: 100%;
    }
  }
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  @media (min-width: 996px) {
    flex-direction: row;
    align-items: center;
    .team-name-container {
      margin: 2rem 0;
    }
  }
`;

export const TeamFaceAndRadarRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

export const TeamPlayerImageDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 1rem;
  text-align: center;
  margin: 2rem 0;
`;

export const TeamPlayerImage = styled.div`
  width: 100%;
`;

export const TeamYearDropdown = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  align-self: center;
  width: 100%;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const TeamPlayerDivLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: var(--black);
  .img-container {
    display: flex;
    margin-bottom: 1rem;
    width: 120px;
    height: 150px;
    img {
      width: 100%;
    }
  }
`;

export const TeamStatWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 786px) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1rem;
    width: 100%;
    margin-top: 1rem;
  }
`;
