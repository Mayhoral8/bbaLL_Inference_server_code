//ButtonBox Styled Component
import styled from "styled-components";

export const ButtonBoxDiv = styled.div`
  display: ${({ hide }) => hide ? "none" : "flex"};
  flex-direction: column;
  user-select: none;
  padding: 1rem;
  > div {
    padding: 5px;
    margin: 0 1rem;
  }
  @media(min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media(min-width:996px) {
    display: flex;
    justify-content: center;
  }
`;

export const Button = styled.button`
  border-radius: 5px;
  box-shadow: 0px 1px 6px rgb(9 9 121 / 70%);
  padding: 0.5rem;
  margin: 0.5rem;
  color: var(--black);
  ${(props) => {
    let buttonColour;
    if (props.isActive) {
      buttonColour = `
      color: white;
      background: #090979;    
      `;
    }
    return buttonColour;
  }}
`;
