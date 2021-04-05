import React from "react";
import styled from "styled-components";

const Overview = ({
  highlights,
}) => {
  const highlightsText = highlights;

  return (
    <>
      {highlightsText.length > 0 ? (
        <StyledHighlightWrapper>
          <h3>Highlights</h3>
          <ul>
            {highlightsText.map((text, i) => (
              <li key={i}>{text}</li>
            ))}
          </ul>
        </StyledHighlightWrapper>
      ) : null}
    </>
  );
};

const StyledHighlightWrapper = styled.div`
  border-bottom: 1px solid silver;
  margin-bottom: 2rem;
  h3 {
    color: var(--lighter-black);
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin-right: 0.5rem;
    }
  }
  ul {
    list-style-type: square;
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    padding-bottom: 1rem;
  }
  li {
    padding: 3px 0;
  }
  @media (max-width: 568px) {
    ul {
      margin-left: 2.5rem;
    }
  }
`;

export default Overview;
