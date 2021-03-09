import styled from "styled-components";

export const SidebarSearchDiv = styled.div`
  max-width: 18rem;
  width: 100%;
  @media (max-width: 996px) {
    display: ${({ searchOpen }) => (searchOpen ? "flex" : "none")};
    justify-content: center;
    div:first-child {
      width: 100%;
    }
  }
`;