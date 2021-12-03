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
  box-shadow: var(--aqua-box-shadow);
  background: linear-gradient(to right,#362daa,#0d93f6,#36afca);
  padding: 1rem;
  margin: 0.5rem;
  color: #ffff;
  ${(props) => {
    let buttonColour;
    if (props.isActive) {
      buttonColour = `
      color: var(--black);
      background: #ffff;    
      `;
    }
    return buttonColour;
  }}
`;
