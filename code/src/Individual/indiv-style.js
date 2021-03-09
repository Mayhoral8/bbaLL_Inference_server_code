import styled from "styled-components";

export const ContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1vh 6vw;
`;

export const IndivPageDiv = styled.div`
  padding: 0;
`;

export const CareerTableDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  height: calc(100% - 3rem);
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  color: var(--lighter-black);
  grid-gap: 1px;
  background: #eee;
  .single-data-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--white);
    padding: 1rem 0;
  }
  .single-data {
    font-family: "Roboto Condensed", sans-serif;
  }

  .table-label {
    font-size: 0.9rem;
    color: #888;
    font-weight: 300;
  }
`;

export const PlotDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;
