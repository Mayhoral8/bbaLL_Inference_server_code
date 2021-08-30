import styled from "styled-components";

export const MainContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fffefa;
  height: auto;
  height: ${({ menuOpen }) => menuOpen && "100vh"};
  overflow-y: ${({ menuOpen }) => menuOpen && "hidden"};
`;