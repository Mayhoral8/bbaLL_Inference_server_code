import React from "react";
import getYouTubeID from "get-youtube-id";
import {
  OverviewWrapper,
  StyledHighlightWrapper,
  Message,
  VideoResonsiveWrapper,
  VideoNotFoundContiner,
} from "./Overview-styles";
import { Suspense } from "react";
import Spinner from "../../../Shared/Spinner/loadingSpinner";

const Overview = ({ highlights, YoutubeHighlight, screenCapture, reference }) => {
  const highlightsText = highlights;
  const id = getYouTubeID(YoutubeHighlight);
  return (
    <>
      <OverviewWrapper ref = {reference} screenCapture = {screenCapture}>
        <Suspense fallback = {<Spinner/>}>
          {
            id === undefined  && !screenCapture ? (
                <StyledHighlightWrapper>
                  <VideoNotFoundContiner>
                    <Message>
                      <h1>OOPS!</h1>
                      <h2>Sorry, we can't find highlights for this game</h2>
                    </Message>
                  </VideoNotFoundContiner>
                </StyledHighlightWrapper>
              ) 
            : 
              !screenCapture ? (
                <VideoResonsiveWrapper>
                  <iframe
                    width="853"
                    height="440"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </VideoResonsiveWrapper>
              )
            :
              null
          }
        </Suspense>

        {highlightsText.length > 0 ? (
          <StyledHighlightWrapper screenCapture = {screenCapture}>
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
