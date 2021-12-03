import styled from "styled-components";

export const MobileMenu = styled.div`
  display: block;

  @media (min-width: 996px) {
    display: none;
  }
`;

export const HamburgerButton = styled.button`
  z-index: 10;
  position: relative;
  text-transform: none;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;

  @media (min-width: 996px) {
    display: none;
  }
`;

export const NavMenuBtn = styled.div`
  .line1 {
    transform: ${({ menuOpen }) =>
      menuOpen && "rotate(-45deg) translate(-5px, 6px)"};
  }
  .line2 {
    opacity: ${({ menuOpen }) => menuOpen && "0"};
  }
  .line3 {
    transform: ${({ menuOpen }) =>
      menuOpen && "rotate(45deg) translate(-5px, -6px)"};
  }
  > div {
    width: 25px;
    height: 3px;
    background-color: var(--faint-purple);
    margin: 5px;
    transition: transform 0.3s ease;
    border-radius: 1rem;
  }

  @media (min-width: 996px) {
    display: none;
  } ;
`;

export const MobileNavbarOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 8;
  transform: translate(${(props) => (props.menuOpen ? 0 : 100)}vw);
  visibility: ${(props) => (props.menuOpen ? "visibile" : "hidden")};
`;

export const MobileNavbarDiv = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: min(85vw, 450px);
  height: 100vh;
  outline: none;
  background: var(--black);
  color: var(--faint-purple);
  z-index: 9;
  transition: 0.2s linear;
  transform: translate(${(props) => (props.menuOpen ? 0 : 100)}vw);
  visibility: ${(props) => (props.menuOpen ? "visibile" : "hidden")};
  .logo-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 220px;
    height: 4rem;
    img {
      width: 100%;
    }
  }

  ul {
    padding-top: 1rem;
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--faint-purple);

    li {
      margin: 0 0 0 1rem;
    }

    a {
      font-size: 1.1rem;
      display: block;
      text-decoration: none;
      color: var(--faint-purple);
      width: 100%;
      padding: 1rem 1rem 1rem 2rem;
      &.active {
        background: var(--main-blue);

        border-radius: 2rem 0 0 2rem;
      }
    }
  }
  @media (min-width: 996px) {
    display: none;
  }
`;

export const MobileMenuButtons = styled.div`
  display: flex;
  align-items: center;
  .search-btn {
    margin-right: 1rem;
    font-size: 1.3rem;
    color: var(--faint-purple);
    cursor: pointer;
  }
`;

export const MobileSearch = styled.div`
  position: absolute;
  left: 0;
  top: 4rem;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem 1rem;
  transition: 0.2s linear;
  transform: translateY(${(props) => (props.searchOpen ? 0 : -5)}rem);
  visibility: ${(props) => (props.searchOpen ? "visibile" : "hidden")};
`;
