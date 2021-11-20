import styled from "styled-components";

export const OutsideContainer = styled.div`
  margin-left: 0rem;
  margin-top: 0rem;
  margin-bottom: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  .left-arrow {
    transform: rotate(180deg);
  }
`;
export const CardContainer = styled.div`
  background: white;
  max-width: 470px;
  max-height: 500px;
  width: 100%;
  border-radius: 5px;
  padding: 1rem 0.4rem;
  box-shadow: 0px 1px 6px rgba(9, 9, 121, 0.7);
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media (min-width: 835px) {
    min-width: 400px;
  }
  @media (min-width: 1440px) {
    min-width: 470px;
  }

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    @media (max-width: 834px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
  }
  .title {
    display: flex;
    align-items: center;
  }

  .players {
    display: flex;
    flex-direction: column;
  }

  .dropdown {
    margin: 0rem 0rem 0rem auto;
    @media (max-width: 834px) {
      width: 45%;
    }
    width: 35%;
  }
  .select {
    @media (max-width: 834px) {
      font-size: 0.7rem;
    }
    font-size: 0.9rem;
  }

  .player-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;
    color: #2e2e2e;

    @media (max-width: 834px) {
      padding: 0.25rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }
    @media (max-width: 834px) {
      max-height: 60px;
    }
    max-height: 85px;
  }

  .logo-box {
    display: flex;
    flex-direction: row;
    max-height: 100%;
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }

  .player-name {
    display: flex;
    justify-content: center; // horizontal align
    align-items: center; //vertical align;

    margin-left: 0.5rem;
    font-family: Roboto;
    font-weight: 100;
    @media (max-width: 834px) {
      font-size: 0.8rem;
    }
    font-size: 1.3rem;
  }

  .value {
    display: flex;
    white-space: nowrap;
    flex-direction: row;
    justify-content: center; // horizontal align
    align-items: center; //vertical align;
    font-family: Roboto Condensed;
    font-weight: 900;
    @media (max-width: 834px) {
      font-size: 1.5rem;
    }
    font-size: 2.5rem;
  }

  .unit {
    @media (max-width: 834px) {
      font-size: 0.7rem;
    }
    font-size: 1rem;
  }
`;
