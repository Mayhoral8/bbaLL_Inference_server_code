import styled from "styled-components";

export const OutsideContainer = styled.div`
  @media (min-width: 834px) {
    position: relative;
    left: -2.7rem;
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
  min-width: 470px;
  max-height: 500px;

  border-radius: 5px;
  padding: 1rem;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
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
    width: 35%;
  }
  .select {
    font-size: 0.9rem;
  }

  .player-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background: #c4c4c4;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 5px;

    max-height: 75px;
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
  }

  .player-name {
    display: flex;
    justify-content: center; // horizontal align
    align-items: center; //vertical align;

    margin-left: 0.5rem;

    font-family: Roboto;
    font-weight: 100;
    font-size: 1.1rem;
  }

  .value {
    display: flex;
    white-space: nowrap;
    flex-direction: row;
    justify-content: center; // horizontal align
    align-items: center; //vertical align;
    font-family: Roboto Condensed;
    font-weight: 900;
    font-size: 2.5rem;
  }

  .unit {
    font-size: 1rem;
  }
`;
