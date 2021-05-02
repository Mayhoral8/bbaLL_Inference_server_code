import styled from "styled-components";

export const OutsideContainer = styled.div`
  margin-left: 3rem;
  margin-top: 3rem;
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
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap");

  background: white;

  border: solid gray 1px;
  display: inline-block;
  flex-direction: column;
  min-width: 400px;
  max-height: 450px;

  border-radius: 5px;
  padding: 1rem;

  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  .players {
    display: flex;
    flex-direction: column;
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
    justify-content: center; // horizontal align
    align-items: center; //vertical align;

    font-family: Roboto Condensed;
    font-weight: 900;
    font-size: 2.5rem;
  }
`;
