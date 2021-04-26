import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  background: linear-gradient(to right, #e9e9e9 50%, #c4c4c4 50%);
  margin: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  height: 200px;

  flex-direction: column;
  justify-content: center;

  img {
    margin: 0rem;
    position: relative;
    z-index: 99;
  }

  .logo-1 {
    width: 40%;
    top: -10px;
  }

  .logo-2 {
    width: 40%;
    top: -10px;
  }

  .vs-text {
    font-size: 4.5rem;
    color: white;
    font-family: Roboto;
    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));
    -webkit-text-stroke: 0.5px gray;
    position: relative;
    top: -10px;
  }

  .team-names {
    display: flex;
    flex-direction: row;
    font-size: 0.9rem;
    justify-content: space-around;
    position: relative;
    top: -15px;
    margin-top: 1rem;
    font-family: Roboto;
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
