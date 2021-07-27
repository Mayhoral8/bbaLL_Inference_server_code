import styled from "styled-components";

const media = {
  deskLLG: `@media(max-width: 1350px)`,
  deskLG: `@media(max-width: 1100px)`,
  deskMD: `@media(max-width: 930px)`,
  tabletLG: `@media(max-width: 1024px)`,
  tablet: `@media(max-width: 768px)`,
  phone: `@media(max-width: 550px)`,
}

export const FutureGameListBox = styled.div`
  background-color: white;
  margin-top: 0rem;
  margin-left: 3rem;
  height: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 0.25rem;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
  height: 1043px;
  scrollbar-width: thin; /* "auto" or "thin" */

  @media (max-width: 1400px) {
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;
    margin-left: 0rem;
  }
`;

export const FutureGameListRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
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
  .styledButton{
    color: white;
    background-color: #552A9F;
    border-radius: 5px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    padding: 15px 80px;
    ${media.tablet}{
      padding: 15px 40px;
    }
  }
`

export const TeamRankingsContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 6fr;

  @media (max-width: 1400px) {
    margin: 0rem 0rem 0rem 0rem;
  }
  margin: 3rem 0rem 0rem 0rem;
  background-color: white;

  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;

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
  // scrollbarColor: "#8783A8 #9693ab" /* scroll thumb and track */,
`;

export const MainPageContainer = styled.div`
  @media (max-width: 1400px) {
    flex-direction: column;
  }

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  max-width: 1640px;
  justify-content: center;

  @media screen and (min-width: 996px) {
    margin: 4rem auto 0rem auto;
  }
  margin: 2.2rem auto 0rem auto;
`;

export const RowContainer = styled.div`
  @media (max-width: 643px) {
    flex-direction: column;
  }
  display: flex;
  flex-direction: row;
`;
