import React from "react";
import styled from "styled-components";
import getYouTubeID from 'get-youtube-id'; 


var id = getYouTubeID('https://www.youtube.com/watch?v=w7ejDZ8SWv8&t=1952s')

const Overview = ({
  highlights,
}) => {
  const highlightsText = highlights;

  return (
    <>
      <OverviewWrapper>
        <VideoResonsiveWrapper>
          <iframe 
            width='853'
            height='440'
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder='0'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </VideoResonsiveWrapper>

          {highlightsText.length > 0 ? (
            <StyledHighlightWrapper>
              <h3>TOP HIGHLIGHTS</h3>
              <ul>
                {highlightsText.map((text, i) => (
                  <li key={i}>{text}</li>
                ))}
              </ul>
            </StyledHighlightWrapper>
          ) : null}
      </OverviewWrapper>
    </>
  );
};

const VideoResonsiveWrapper = styled.div`
  overflow:hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  box-shadow: 0 4px 2px 0px gray;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`


const OverviewWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.5fr 1fr;
  margin-bottom: 2rem;
  padding: auto 1.5rem 1rem;
  border-bottom: 1px solid silver;
  grid-gap: 1rem;
`

const StyledHighlightWrapper = styled.div`
  border:1px solid #080A1E;
  box-shadow: 0 4px 2px 0px gray;
  h3 {
    padding-left: 40px;
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
    padding-left: 4rem;
    list-style-type: square;
    margin-left: 1.5rem;
    margin-top: 0.5rem;
    padding-bottom: 1rem;

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

export default Overview;
