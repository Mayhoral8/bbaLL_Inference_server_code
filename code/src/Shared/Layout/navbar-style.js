//Navbar Styled Component
import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  box-shadow: var(--box-shadow-2);
  background: var(--main-purple);
  z-index: 11;
  width: 100%;
  padding: 0 1rem;

  .navbar-left {
    display: flex;
  }

  @media (min-width: 996px) {
    width: 100%;
    padding: 0 2rem;
  }
`;

export const NavbarLogo = styled(Link)`
  width: 220px;
  display: flex;
  img {
    width: 220px;
    height: 50.994px;
  }
`;

export const NavList = styled.ul`
  display: none;
  list-style: none;
  margin-left: 2rem;
  @media (min-width: 996px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const NavListItem = styled.li`
  padding: 0 1.5rem 0 0;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  position: relative;

  a {
    text-decoration: none;
    user-select: none;
    position: relative;
    height: 100%;
    color: #cbbde2;
    display: flex;
    align-items: center;
  }

  a:after {
    content: "";
    display: none;
    border: 10px solid transparent;
    border-bottom-color: #e1e0e2;
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
  }

  a.active::after {
    display: block;
  }
`;
