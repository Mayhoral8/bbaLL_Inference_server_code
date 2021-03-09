import React from 'react';
import ContentLoader from "react-content-loader";

const Loader = ({ page }) => {
  let width, height;
  if (page.includes('/leaderboard')) {
    width = 80;
    height = 80;
  } else if (page.includes('/team')) {
    width = 150;
    height = 160;
  } else {
    width = 27;
    height = 27;
  }

  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="0" ry="0" width={`${width}`} height={`${height}`} />
    </ContentLoader>
  )
}

export default Loader;