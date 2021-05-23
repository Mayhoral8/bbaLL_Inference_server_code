import styled from "styled-components";

export const OutsideContainer = styled.div`
  // @media (min-width: 834px) {
  //   position: relative;
  //   left: -2.7rem;
  // }

  position: relative;
  left: -2.7rem;

  @media (max-width: 1400px) {
    margin: 2rem 0rem 2rem 0rem;
  }

  margin-left: 0rem;
  margin-top: 0rem;
  margin-bottom: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .left-arrow {
    transform: rotate(180deg);
    padding: 0.1rem;
  }
  .right-arrow {
    padding: 0.1rem;
  }
`;
export const CardContainer = styled.div`
  background: white;

  border: solid gray 1px;
  display: inline-block;
  flex-direction: column;

  @media (max-width: 834px) {
    min-width: 280px;
  }
  @media (min-width: 900px) {
    min-width: 400px;
  }
  @media (min-width: 1440px) {
    min-width: 470px;
  }

  max-width: 470px;
  max-height: 500px;

  width: 100%;
  border-radius: 5px;
  padding: 1rem;

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

    //background: #c4c4c4;

    @media (max-width: 834px) {
      padding: 0.25rem;
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;

    border-radius: 5px;
    //color: #e0e0e0;
    color: #2e2e2e;
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
    max-width: 100%;
    max-height: 100%;
    border-radius: 50px;
    //border: solid black 2px;
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
