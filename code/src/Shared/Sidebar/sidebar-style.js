//Sidebar Styled Component
import styled from "styled-components";

export const SidebarContainer = styled.div`
  @media (min-width: 996px) {
    margin-top: 4rem;
    position: fixed;
    width: 100%;
    height: 3rem;
    background: #e1e0e2;
    z-index: 4;
    padding: 0 2rem;
    display: flex;
  }
`;

export const List = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  padding-left: ${({ noMargin }) => noMargin ? '0' : '15rem'};
`;

export const ListItem = styled.li`
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${({ isActive }) => (isActive ? "4px" : "0")};
    background: linear-gradient(90deg, var(--main-blue), #8806ce);
    transition: 0.2s;
  }

  &:hover:before {
    height: 4px;
    background: linear-gradient(90deg, var(--main-blue), #8806ce);
  }

  a{
    height: 100%;
    align-items: center;
    display: flex;
    padding: 0 1rem;
    text-decoration: none;
    color: var(--lighter-black);
  }
`;
