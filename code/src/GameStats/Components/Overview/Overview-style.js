import styled from "styled-components";

export const OverviewWrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid silver;
  grid-gap: 1rem;
  @media (min-width: 996px) {
    grid-template-columns: 1.5fr 1fr;
  }
`

export const StyledHighlightWrapper = styled.div`
  border:0.5px solid #080A1E;
  box-shadow: 0 4px 2px 0px gray;
  padding-top: 1.5rem;
  h3 {
    border-bottom:0.5px solid #080A1E;
    margin-left: 2rem;
    margin-right: 2rem;
    color: var(--lighter-black);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: Popins;
    font-style: normal;
    font-weight: 600;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin-right: 0.5rem;
    }
  }
  ul {
    list-style-type: square;
    margin-left: 2.5rem;
    margin-right: 2rem;
    margin-top: 0.5rem;
    padding-bottom: 1rem;
    list-style-type: none;

  }
  ul > li {
    text-indent: -5px;
  }

  ul > li: before {
    content: "-           ";
    text-indent: -5px;
  }
  li {
    padding: 3px 0;
    font-family: Popins;
    font-style: normal;
    font-weight: 400;
  }
  @media (max-width: 568px) {
    ul {
      margin-left: 2.5rem;
    }
  }
`;

export const VideoResonsiveWrapper = styled.div`
  overflow:hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  border:0.5px solid #080A1E;
  box-shadow: 0 4px 2px 0px gray;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`

export const VideoNotFoundContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vw;

  @media(min-width: 996px) {
    flex-direction: row;
  }
`

export const Message = styled.div`

  h1 {
    font-size: 6vw;
    text-shadow: 4px 3px 0px #7A7A7A;
    color: #353058;
  }
  h2 {
    font-size: 4vw;
    color: #333;
    margin-bottom: 2rem;
  }
`
