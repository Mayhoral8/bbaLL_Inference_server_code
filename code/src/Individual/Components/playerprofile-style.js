import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProfileRow = styled.div`
  display: grid;
  grid-gap: 1rem;
  flex-direction: column;
  justify-content: center;
  > div:first-child {
    margin-right: 2rem;
  }
  > div:last-child {
    text-align: center;
  }
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ProfileImgTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export const PlayerDropdown = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;
export const BasicInfoDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;

  .player__img-name {
    display: flex;
    align-items: center;
    background: rgba(83, 74, 145, 0.5);
    border-right: 1px solid #eee;
  }
  .img-container {
    display: flex;
    max-width: 220px;
    height: 260px;
  }
    img{
      width: 100%;
    }
  }
  .player__name {
    display: block;
    margin: 0 2rem;
  }
  .player__name p {
    color: var(--light-grey);
  }
  .player__name .team-link {
    color: var(--white);
    text-decoration: none;
    margin-top: 0.5rem;
    &:hover {
      text-decoration: underline;
    }
  }
  .player__name h1 {
    font-size: 4rem;
    line-height: 1;
    color: var(--white);
<<<<<<< HEAD
    font-family: "Oswald", sans-serif;
=======
    font-family: "Roboto Condensed", sans-serif;
>>>>>>> ad7e89a53c3333149982cf248052e622ee564690
  }

  .player__name p {
    margin-top: 1rem;
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  .player__info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
  }
  .player__info .info-container {
    padding: 1rem;
  }
  .player__info h3 {
    font-size: 2rem;
    color: var(--lighter-black);
<<<<<<< HEAD
    font-family: "Oswald", sans-serif;
=======
    font-family: "Roboto Condensed", sans-serif;
>>>>>>> ad7e89a53c3333149982cf248052e622ee564690
  }
  .player__info p {
    font-size: 1rem;
    text-transform: uppercase;
    color: #888;
  }
  @media (max-width: 1200px) {
    .player__info h3 {
      font-size: 1.7rem;
    }
  }
  @media (max-width: 996px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
    .player__info {
      flex-wrap: wrap;
      > div {
        flex-basis: 50%;
      }
    }
    .player__info h3 {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
    .player__name h1 {
      font-size: 2rem;
    }
    .player__info .info-container {
      padding: 1rem;
    }
    .player__info {
      padding: 1rem 0;
    }
    .player__name {
      margin: 0 1rem;
    }
    .player__name p {
      font-size: 1rem;
    }
  }
`;

export const PlayerStatWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;
