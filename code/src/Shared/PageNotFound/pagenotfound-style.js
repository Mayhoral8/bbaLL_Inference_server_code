import styled from "styled-components";

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh);
  width: 100%;
  margin-top: 2rem;

  @media(min-width: 996px) {
    flex-direction: row;
    min-height: 70vh;
  }
`

export const ErrorImage = styled.div`
  display: flex;
  order: 1;

  @media(min-width: 996px) {
    order: 2;
  }
`

export const ErrorMessage = styled.div`
  text-align: center;
  order: 2;
  h1 {
    font-size: 5rem;
    text-shadow: 4px 3px 0px #7A7A7A;
    color: #353058;
  }
  h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 2rem;
  }
  a {
    text-decoration: none;
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  } 
   @media(min-width: 996px) {
    text-align: left;
    margin-right: 5rem;
    order: 1;
  }
`