import styled from "styled-components";
export const RightBoxWrapper = styled.div`
  display: ${({ mobile }) => mobile ? 'none' : 'flex'};
  width: 100%;
  @media(min-width:996px) {
    display: ${({ mobile }) => mobile? 'flex' : 'none'};
  }
`
export const TableDiv = styled.div`
  user-select: none;
  margin: 0.8rem;
  h3 {
    text-align: center;
    margin: 2rem 0;
    color: var(--black);
    text-transform: uppercase;
  }
  @media(min-width:768px) {
    margin: 1.5rem;
  }
`;

export const TopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3,1fr);
  align-items: center;
  grid-gap: 0.5rem;
  margin: 0 0.8rem;
  a {
    text-align:center; 
  }
  .img-container {
    width: 70%;
    margin: auto;
    img {
      width: 100%;
    }
  }
  @media(min-width:768px) {
    margin: 0 1.5rem;
  }
`