import styled from 'styled-components';
import backgroundImage from "../../../assets/images/court.jpg";

// Used in GameSummary.js
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
    background-image: linear-gradient(90deg, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%),url(${backgroundImage});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .colon {
    display: flex;
    margin: 0 0.5rem;
  }

  @media (min-width: 768px) {
    .single-summary {
      margin: 2rem 0;
    }
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

// Used in GameSummaryBanner.js
export const GameSummaryBannerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  padding: 3rem;
  color: var(--white);
  .image-container {
    width: 40px;
    height: 40px;
    margin: auto;
    margin-bottom: 0.5rem;
    img {
      width:100%;
      height: 100%;
    }
  }
  .team-name {
    font-size: 1.5rem;
    text-align: center;
    a{
      color: var(--white);
      text-decoration: none;
    }
  }
  .game-summary{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    font-size: 2.5rem;
  }
  .team {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  }
  @media(max-width: 768px) {
    padding: 1.5rem;
    .team-name {
      font-size: 1rem;
      text-align: left;
    }
    h2 {
      font-size: 2rem;
      text-align: left;
    }
    .image-container {
      margin: 0;
      margin-bottom: 0.5rem;
    }
    .team.away .image-container {
      margin-left: auto;
    }
    .team.away .team-name {
      text-align: right;
    }
  }
`;

// Used in GameSummaryTab.js
export const GameSummaryTabWrapper = styled.ul`
display: flex;
list-style: none;
width: 100%;
li {
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 800;
  display: flex;
  width: calc(100% / 4);
  justify-content: center;
  border: 1px solid silver;
  align-items: center;
  text-align: center;
}
li:not(:last-child) {
  border-right: 0;
}
.isActive {
  color: var(--main-blue);
  border-bottom: 3px solid var(--main-blue);
}
a {
  width: 100%;
  height: 100%;
  padding: 0.7rem;
}
@media (max-width: 600px) {
  li {
    font-size: 0.6rem;
  }
}
`;

// Used in QuarterlyTable.js
export const QuarterTableWrapper = styled.div`
  color: ${({ blackText }) => blackText ? 'var(--black)' : 'var(--white)'};
  padding: 0 0 2rem 0;
  font-size: 0.8rem;
  display: ${({ hide }) => hide ? 'none' : 'block'};
  table{
    border-collapse: collapse;
    margin: 0 auto;
  }
  thead {
    border-bottom: 1px solid silver;
  }
  td {
    padding: 0 0.5rem;
    text-align: center;
  }
  th {
    width: 30px;
  }
  @media(min-width:768px) {
    padding: 0 4rem;
    display: block;
    font-size: 1rem;
  }
`;

// Used in TeamTitle.js
export const TeamTitleWrapper = styled.div`
display: flex;
align-items: center;

.img-container {
  width: 50px;
  height: 50px;
  margin-right: ${({ position }) => position ? 0 : 1}rem;
  margin-left: ${({ position }) => position ? 1 : 0}rem;
  order: ${({ position }) => position ? 2 : 1};
  img {
    width: 100%;
    height: 100%;
  }
}

h2 {
  letter-spacing: 0.5px;
  order: ${({ position }) => position ? 1 : 2}
}

@media(max-width: 768px) {
  margin-left: ${({ hide }) => hide ? '0' : '1rem'};
  h2 {
    display: ${({ hide }) => hide ? 'none' : 'block'};
    font-size: 1.2rem;
  }
}
`