import styled from "styled-components";
export const BoxScoreTableWrapper = styled.div`
  display: flex;
  margin: 1.5rem 0 0 0rem;
  user-select: none;
  max-height: 410px;
  
  .table-scroll {
    overflow-x: auto;
    overflow-y: auto;
    scrollbar-width: thin;
    position: relative;
    display: flex;
  }
  .table {
    font-family: "Roboto Condensed", sans-serif;
  }
  .table.name,
  .table.name .table-body {
    display: flex;
    flex-direction: column;

    @media (max-width: 834px) {
      min-width: 7.5rem;
    }
  }
  .table.name {
    border-right: 1px solid #eee;
  }
  .table-body {
    display: flex;
    flex-flow: row wrap;
  }
  .table-header {
    background: var(--main-blue);
    color: var(--white);
    text-transform: uppercase;
    font-size: 0.8rem;
    cursor: pointer;
    display: flex;
    width: 100%;
  }
  .table.data {
    width: 100%;

    
    @media (max-width: 834px) {
      min-width: 200px;
    }
    max-width: 1300px;
  }
  .table-row {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  .table-header .table-row {
    border-bottom: none;
  }
  .table.name .table-data {
    width: 100%;
  }
  .table.data .table-data {
    text-align: center;
    position: relative;
    width: 100%;
  }
  .table-data {
    padding: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    @media (max-width: 834px) {
      font-size: 0.7rem;
    }

    font-size: 0.9rem;
    a {
      text-decoration: none;
      color: var(--black);
      &:hover {
        font-weight: bold;
      }
    }
  }
  .table-row.team {
    background: ${({ bottomRowHeading }) =>
      bottomRowHeading ? "rgba(0, 0, 0, 0.05)" : ""};
  }
  .table-row.team .table-data {
    display: ${({ renderTeamData }) => (renderTeamData ? "block" : "none")};
  }

  .table-row .descending.table-data,
  .table-row .ascending.table-data {
    background: rgba(53, 48, 88, 0.05);
  }
  .top-value {
    color: var(--accent);
    font-weight: bold;
  }
  .fa-caret-down,
  .fa-caret-up {
    position: absolute;
    color: #7870b1;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.2rem;
  }
  .fa-caret-down {
    display: none;
  }
  .descending {
    .fa-caret-up {
      display: none;
    }
    .fa-caret-down {
      display: flex;
    }
  }

  @media (max-width: 1200px) {
    /* .table.data {
    width: 800px;
    overflow-x: auto;
  } */
  }
`;
