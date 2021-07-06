import React, { useState, useEffect } from "react";

import { VideoResonsiveWrapper, Card } from "./memecard-style";
const MemeCard = ({ urls }) => {
  const [currentVid, setCurrentVid] = useState(0);

  const nextbuttonHandle = (event) => {
    if (currentVid < urls.length - 1) {
      setCurrentVid(currentVid + 1);
    } else {
      setCurrentVid(0);
    }
  };
  const prevbuttonHandle = (event) => {
    if (currentVid > 0) {
      setCurrentVid(currentVid - 1);
    } else {
      setCurrentVid(urls.length - 1);
    }
  };

  return (
    <Card>
      <div
        className="top"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button className="button prev" onClick={prevbuttonHandle}>
          <span>Previous</span>
        </button>
        <div
          className="title"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          NBA Clips
        </div>
        <button className="button next" onClick={nextbuttonHandle}>
          <span>Next</span>
        </button>
      </div>

      <div className="content">
        {urls.length === 0 ? (
          <div className="error-message">
            Videos are Unavailable at this time.
            <br />
            Try again later.
          </div>
        ) : (
          <VideoResonsiveWrapper>
            <iframe frameBorder="0" src={urls[currentVid]} />
          </VideoResonsiveWrapper>
        )}
      </div>
    </Card>
  );
};

export default MemeCard;
