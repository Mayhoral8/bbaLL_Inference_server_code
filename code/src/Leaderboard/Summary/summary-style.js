import styled from "styled-components";

export const LeaderboardSummaryCanvas = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const LeaderboardSummaryBoxDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const LeaderboardSummaryPlotDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;

  @media(min-width: 768px) {
    grid-template-columns: repeat(2,1fr);
  }
  @media(min-width: 1400px) {
    grid-template-columns: repeat(3,1fr);
  }
`;
