import styled from "styled-components"
import backgroundImage from "../../assets/images/court.jpg";
export const GamePageContainer = styled.div`
    margin-top: 63.992px;
    height: calc(100vh - 63.992px);
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
`

export const OverviewContainer = styled.div`
    width: 80%;
`

export const GameStatsContainer = styled.div`
    width: 50%;
`

export const BoxScoreContainer = styled.div`

`

export const GameSummaryWrapper = styled.div`
  width: auto;

  .single-summary {
    margin: 0;
    width: 100%;
    background: var(--white);
  }
  .game-summary-content {
    border: 1px solid silver;
    border-top: 0;
    padding: 2rem 0;
  }
  .top-section {
    background-image: linear-gradient(
        to right,
        rgba(56, 40, 81, 0.95) 50%,
        rgba(56, 40, 81, 0.3)
      ),
      url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .colon {
    display: flex;
    margin: 0 0.5rem;
  }

  @media (min-width: 768px) {
    .mobile-quarterly-container {
      display: none;
    }
    .game-summary-content {
      padding: 2rem;
    }
    .colon {
      display: none;
    }
  }
`;