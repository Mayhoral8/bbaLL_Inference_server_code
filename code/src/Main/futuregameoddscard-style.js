import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  background: linear-gradient(to right, #e9e9e9 50%, #c4c4c4 50%);
  margin: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  height: 200px;
  min-width: 250px;
  flex-direction: column;
  justify-content: center;

  img {
    margin: 0rem;
    position: relative;
    z-index: 99;
  }

  .logo-1 {
    z-index: 0;
    width: 40%;
    top: -10px;
  }

  .logo-2 {
    z-index: 0;
    width: 40%;
    top: -10px;
  }

  .vs-text {
    font-size: 3rem;
    color: white;
    font-family: Roboto;
    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));
    -webkit-text-stroke: 0.5px gray;
    position: relative;
    top: 5px;
  }

  .team-names {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    justify-content: space-evenly;
    position: relative;
    top: -15px;
    margin-top: 1rem;
    font-family: Roboto;
    text-align: center;
  }

  .scores {
    display: flex;
    flex-direction: column;
  }

  .scores-row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
  }

  .game-date {
    background-color: white;
    margin-top: 1rem;
    max-width: 80%;
    font-size: 0.8rem;
    text-align: center;
    padding: 0.2rem;
    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));
    margin: 1rem auto 1rem auto;
  }
`;
