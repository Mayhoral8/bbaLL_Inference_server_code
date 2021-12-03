import styled from "styled-components";

const media = {
  deskLLG: `@media(max-width: 1350px)`,
  deskLG: `@media(max-width: 1100px)`,
  deskMD: `@media(max-width: 930px)`,
  tabletLG: `@media(max-width: 1024px)`,
  tablet: `@media(max-width: 768px)`,
  phone: `@media(max-width: 550px)`,
};

export const FutureGameListBox = styled.div`
  background-color: white;
  height: auto;
  max-height: 998px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  border-top: 1px solid rgb(0, 0, 0, 0.2);
  scrollbar-width: thin; /* "auto" or "thin" */

  @media (max-width: 1400px) {
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
  }
  @media (min-width: 1400px) {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
  }
`;

export const FutureGameListRow = styled.div`
  display: flex;
  padding: 0.5rem;
  @media (max-width: 1400px) {
    flex-direction: row;
  }
  @media (min-width: 1400px) {
    flex-direction: column;
  }
`;

export const PlayerRankingsPlaceholderTitle = styled.div`
  font-size: 1.5rem;
  padding: 1.5rem;
`;

export const PlayerRankingPlaceholderBox = styled.div`
  background: white;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
  height: 100%;
  width: 100%;
  margin: 0rem 3rem 3rem 0rem;
  min-width: 400px;
`;

export const TeamRankingsTitle = styled.div`
  font-size: 1.5rem;
`;

export const FutureGameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 1.5rem;
  @media (max-width: 1400px) {
    margin: 1rem 0rem 0rem 0rem;
  }
  margin: 1rem 0rem 1rem 0rem;
`;

export const BettingButton = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
  .styledButton {
    color: white;
    background-color: #65ae24;
    border-radius: 5px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    padding: 15px 80px;
    ${media.tablet} {
      padding: 15px 40px;
    }
  }
`;

export const TeamRankingsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: var(--aqua-box-shadow);
  padding: 1.5rem 0;
  @media (max-width: 730px) {
    flex-direction: column-reverse;
  }
`;

export const futureGameList = styled.div`
  background-color: white;
  margin-top: 0rem;
  margin-left: 3rem;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  overflow-y: scroll;
  position: relative;
  border: solid gray 1px;
  height: 885px;
  scrollbar-width: thin;
`;

export const MainPageContainer = styled.div`
height: 100%;
width: 100%;
padding 40px 20px;
  .wrapper {
    display: flex;
    @media (max-width: 1400px) {
      flex-direction: column-reverse;
    }
  }
  .futureGameListContainer{
    display: flex;
    flex-direction: column;
    margin-left: 20px; 
    box-shadow: var(--aqua-box-shadow);
    border-radius: 5px;
    @media (max-width: 1400px) {
      margin-left: 0px;
    }
  }
`;

export const PlayerRankingsMatchFacts = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1400px) {
    margin-top: 20px;
  }
  @media (max-width: 730px) {
    flex-direction: column;
  }
`;
