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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 0.5rem;
  margin: 0.5rem;
  color: var(--black);
  ${(props) => {
    let buttonColour;
    if (props.isActive) {
      buttonColour = `
      color: white;
      background: var(--main-purple);    
      `;
    }
    return buttonColour;
  }}
`;
