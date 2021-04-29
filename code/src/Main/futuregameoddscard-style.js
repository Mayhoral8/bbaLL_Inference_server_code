import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  background: linear-gradient(to right, #e9e9e9 50%, #c4c4c4 50%);

  @media screen and (max-width: 834px) {
    margin: 0.5rem;
  }
  margin: 1rem;
  height: 175px;
  min-width: 225px;
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
    top: 5px;
  }

  .logo-2 {
    z-index: 0;
    width: 40%;
    top: 5px;
  }

  .vs-text {
    font-size: 2rem;
    color: white;
    font-family: Roboto;
    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));
    -webkit-text-stroke: 0.5px gray;
    position: relative;
    top: 25px;
  }

  .team-names {
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    position: relative;
    top: 0px;
    margin-top: 0.5rem;
    font-family: Roboto;
    text-align: center;
  }

  .team-name1 {
    color: ${(props) => props.homeColour};
    width: 50%;
  }

  .team-name2 {
    color: ${(props) => props.awayColour};
    width: 50%;
  }
  .scores {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .scores-col {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 0.25rem;
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    margin-bottom: 0.25rem;
    font-size: 0.8rem;
  }

  .game-date {
    background-color: white;
    margin-top: 1rem;
    max-width: 80%;
    font-size: 0.8rem;
    text-align: center;
    padding: 0.5rem;
    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));
    margin: 0.5rem auto 0.5rem auto;
  }
`;
