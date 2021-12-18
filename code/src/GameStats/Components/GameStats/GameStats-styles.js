import styled from "styled-components";

// Used in GameStatsTable.js
export const GameSummaryTableWrapper = styled.div`
  list-style: none;
  border-bottom: 1px solid silver;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  .bar-graph-container {
    display: grid;
    grid-template-columns: 1fr 250px 1fr;
    ul {
      margin: 2rem 0;
    }
    li {
      text-transform: capitalize;
      height: 2.69rem;
      align-items: center;
      justify-content: center;
      text-align: center;
      white-space: pre-line;
      display: grid;
      grid-template-columns: 60px 1fr 60px;
    }
    span:first-child {
      text-align: left;
    }
    span:last-child {
      text-align: right;
    }
    span {
      font-weight: bold;
    }
    .highlight {
      color: var(--accent);
    }
  }
  @media (max-width: 768px) {
    padding: 0 1rem;
    .bar-graph-container {
      grid-template-columns: 1fr;
      ul {
        margin: 1rem 0;
      }
      li {
        height: 1.7rem;
        font-size: 0.9rem;
      }
    }
    .versus {
      margin: 0 4.5rem;
      padding: 0.5rem;
      position: relative;
      font-size: 1rem;
    }
    .versus:before,
    .versus:after {
      width: 2rem;
    }
  }
`;

// Used in StatsBarPlots
export const PlotContainer = styled.div`
  margin-top: 2rem;
  @media (max-width: 768px) {
    display: none;
  }
`;



