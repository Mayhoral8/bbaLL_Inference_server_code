import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0rem 0rem 2rem 0rem;
  min-width: 200px;
  width: 100%;
  background: white;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
  padding: 0rem 1rem 1rem 1rem;

  .title{
    @media (max-width: 865px) {
      font-size: 1rem;
    }
    font-size: 1.5rem;
  }
`