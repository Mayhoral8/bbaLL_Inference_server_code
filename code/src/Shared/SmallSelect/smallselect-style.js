//Small Select Styled Component
import styled from "styled-components";

export const DropdownDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const DropButton = styled.div`
  background: var(--white);
  border: 1px solid var(--main-purple);
  color: var(--black);
  padding: 0 1rem;
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fa-inverse{
    color: var(--black);
  }
`;

export const DropList = styled.ul`
  list-style: none;
  width: 100%;
  position: absolute;
  top: 3rem;
  background: var(--white);
  z-index: 5;
  border: 1px solid #999;
  border-top: 0;
  display: ${({ dropped }) => dropped ? 'block' : 'none'};

`
export const DropListItem = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  &:hover {
    background: #eee;
  }
  a{
    padding: 0.8rem 1rem;
  }
`;