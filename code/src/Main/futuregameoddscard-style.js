import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  background: linear-gradient(to right, #e9e9e9 50%, #a3a3a3 50%);

  @media screen and (max-width: 834px) {
    margin: 0.5rem;
  }
  margin: 1rem;
  height: 175px;
  min-width: 240px;
  max-width: 270px;

  flex-direction: column;
  justify-content: center;

  .team-names {
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    position: relative;
    top: 0px;
    margin-top: 0.5rem;
    font-family: Roboto;
    text-align: center;
    // -webkit-text-stroke-width: 5px;
    // -webkit-text-stroke-color: black;
    text-shadow: 1px 1px 1px #949494;
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
    @media screen and (max-width: 834px) {
      font-size: 0.8rem;
    }
    font-size: 0.9rem;
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