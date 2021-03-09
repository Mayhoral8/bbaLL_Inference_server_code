import styled from "styled-components";

export const LeaderPageDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  @media(min-width: 1200px) {
    grid-template-columns: ${({ summary }) => summary ? "1fr" : "2fr 1fr"};
    grid-gap: 2rem;
  }
`;

export const LeaderMainDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  .summary-bar-graph{
    width: 100%;
    overflow-x: auto;
  }
`;

export const LeaderSideDiv = styled.div`
  display: ${({ mobile }) => mobile ? 'flex' : 'none'};
  flex-direction: column;
  width: 100%;
  @media(min-width: 968px) {
    display: ${({ mobile }) => mobile ? 'none' : 'flex'}; 
  }
`

export const Title = styled.h1`
  ${(props) => {
    return `font-size: ${100 / props.titleLength}vw;`;
  }}
  display: flex;
  justify-content: center;
  font-weight: 550;
  margin-top: 1vh;
  color: #534a91;
  user-select: none;
`;

export const MobileFilterDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  @media(min-width:996px) {
    display: none;
  }
`

export const LeaderAvgTotButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`