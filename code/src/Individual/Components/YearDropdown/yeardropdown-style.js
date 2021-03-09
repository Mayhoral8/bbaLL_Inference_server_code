import styled from "styled-components";

export const DropdownListItem = styled.li`
  text-align: center;
  padding-right: 2rem;
  width: 100%;
  &:hover {
    background-color: lightblue;
  }
  @media (min-width: 768px) {
    padding-right: 0;
  }
`;
export const DropdownList = styled.ul`
  background-color: white;
  position: absolute;
  top: 2.5rem;
  max-height: 25vh;
  list-style: none;
  overflow-x: none;
  overflow-y: auto;
  padding: 0 0.5rem;
  z-index: 2;
  font-size: 2rem;
  width: 100%;
  @media (min-width: 768px) {
    top: 4rem;
    font-size: 3rem;
    padding: 0;
    width: inherit;
  }
`;
