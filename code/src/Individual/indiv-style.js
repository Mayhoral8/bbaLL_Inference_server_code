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
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 3rem;
  position: relative;
  margin-top: 2.5rem;
  z-index: 1;
`;

export const Footer = styled.div`
  grid-row: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: 2rem;
  background: none;
  border-radius: 8px;
  border: 4px solid white;
  font-family: Open Sans;
  font-weight: 300;
  font-size: 14px;
`;
export const TitleDiv = styled.div`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 350px;
`;
