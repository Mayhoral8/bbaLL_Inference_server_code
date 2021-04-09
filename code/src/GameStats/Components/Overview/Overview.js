import React from "react";
import getYouTubeID from 'get-youtube-id'; 
import {OverviewWrapper, StyledHighlightWrapper, VideoResonsiveWrapper} from "./Overview-style"

const Overview = ({
  highlights,
  YoutubeHighlight,
}) => {
  const highlightsText = highlights;
  const id = getYouTubeID(YoutubeHighlight);
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

export default Overview;
