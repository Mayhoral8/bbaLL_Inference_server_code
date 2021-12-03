import styled from "styled-components";

const media = {
  deskLLG: `@media(max-width: 1350px)`,
  deskLG: `@media(max-width: 1100px)`,
  deskMD: `@media(max-width: 930px)`,
  tablet: `@media(max-width: 768px)`,
  phone: `@media(max-width: 550px)`,
  phoneMD: `@media(max-width: 440px)`,
};

export const BettingPageContainer = styled.div`
  width: 100%;
  min-height: 80vh;
  height: auto;
  padding: 0px 10px;
  margin-top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${media.deskLLG} {
    height: auto;
  }
`;

export const BettingPageSpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: rgb(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContentC = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

export const ContentW = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const ContentHeader = styled.div`
  padding: 10px 0px;
  text-align: center;
  font-family: Roboto;
  .information {
    padding: 20px 60px;
    font-size: 24px;
  }
`;

export const BettingSectionColumn = styled.div`
  width: 64%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${media.deskLLG} {
    width: 81%;
  }
  ${media.deskLG} {
    width: 100%;
  }
  .instruction {
    padding: 20px 40px 0px;
    font-size: 24px;
    font-family: Roboto;
    height: auto;
  }
`;

export const BettingSectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 103px);
  overflow-y: auto;
  box-shadow: 0px 0px 5px rgb(57 32 79 / 25%);
  border-radius: 5px;
`;

export const BettingPointsAndTeamsContainer = styled.div`
  border-radius: 5px;
`;

export const BettingPointsAndTeamsWrapper = styled.div``;

export const RowC = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  margin: 10px 0px;
  ${media.tablet} {
    padding: 0px 10px;
  }
`;

export const Section1 = styled.div`
  max-width: 18%;
  min-width: 129px;
  display: flex;
  align-items: center;
  color: #757575;
  ${media.phoneMD} {
    min-width: 100px;
  }
`;

export const Section2 = styled.div`
  width: 82%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TeamNameContainer = styled.div``;

export const TeamName = styled.div`
  font-weight: 600;
  color: #333333;
  text-align: center;
  margin: 7px 0px;
  ${media.phoneMD} {
    font-size: 14px;
  }
`;

export const VS = styled.div`
  text-align: center;
  ${media.phoneMD} {
    font-size: 12px;
  }
`;

export const PointsBoxColumn = styled.div`
  display: flex;
  justify-content: center;
  width: 33.33%;
  ${media.deskMD} {
    flex-direction: column;
    align-items: center;
  }
`;
export const DateC = styled.div`
  color: #757575;
  margin-top: 5px;
`;

export const CommonChild = styled.li`
  list-style-type: none;
  font-weight: 100;
  font-size: 11px;
  color: #333333;
`;

export const BetPointsSummaryColumn = styled.div`
  width: 18%;
  background: #090979;
  border: 0.5px solid rgba(57, 32, 79, 0.25);
  box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
  border-radius: 5px;
  margin-left: 10px;
  padding: 10px;
  ${media.deskLLG} {
    width: 100%;
    margin-left: 0px;
    margin-top: 30px;
    flex-direction: row;
  }
`;

export const BetSubmitPointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ${media.deskLLG} {
    width: 100%;
    margin-left: 0px;
    flex-direction: row;
    overflow-x: auto;
  }
`;

export const OverviewHeader = styled.h3`
  padding: 5px;
  font-size: 22px;
  text-align: center;
  color: white;
  ${media.deskLLG} {
    width: 100%;
    text-align: center;
    padding: 5px;
  }
`;

export const SubmitPointsBtn = styled.div`
  background: #7500de;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  font-weight: 900;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  &:hover {
    transition: 0.3s;
    background: #dbdbdb;
  }
`;

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const PopupWrapper = styled.div`
  width: 500px;
  background: #ffff;
`;

export const UserStatsAndRankColumn = styled.div`
  width: 16%;
  margin-right: 10px;
  ${media.deskLLG} {
    width: 18%;
  }
  ${media.deskLG} {
    width: 100%;
  }
`;

export const UserStatsRankWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.deskLG} {
    flex-direction: row;
    margin-bottom: 50px;
  }
`;

export const LoginModalContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: rgb(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const LoginLogoutBtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border: 0.5px solid rgba(57, 32, 79, 0.25);
  box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
  border-radius: 5px;
  cursor: pointer;
  ${media.deskLG} {
    display: none;
  }
`;

export const AuthBtn = styled.img`
  height: 50px;
  width: 50px;
  cursor: pointer;
`;
