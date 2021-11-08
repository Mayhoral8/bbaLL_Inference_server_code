import styled from "styled-components";

export const SubscribeWrapper = styled.div`
  width: 90%;
  color: var(--faint-purple);
  h2 {
    font-size: 2.5rem;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SubscribeContent = styled.div`
  p {
    line-height: 1.5;
    margin-top: 1.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    width: 90%;
  }
  input {
    padding: 1rem;
    border: none;
    margin: 0.3rem 0;
    background: ${({ error }) => (error ? "#f8d7da" : "#e9e8f4")};
    outline: none;
    color: #666;
    letter-spacing: 1px;
    font-size: 1.1rem;
  }
  button {
    border: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 1rem;
    margin-top: 0.5rem;
    cursor: pointer;
    background: var(--main-blue);
    color: #fff;
    outline: none;
    &:hover {
      background: #40396f;
    }
  }
  @media (max-width: 1024px) {
    form {
      width: 100%;
    }
  }
  @media (max-width: 769px) {
    form {
      width: 70%;
      margin: auto;
    }
  }
  @media(max-width: 568px) {
    form{
      width: 100%;
    }
  }
`;
