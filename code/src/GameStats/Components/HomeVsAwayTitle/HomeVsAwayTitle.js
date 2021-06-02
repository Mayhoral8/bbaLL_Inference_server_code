import React from 'react';
import TeamTitle from '../GameSummary/TeamTitle';
import { StyledHomeVsAwayTitle } from "./HomeVSAwayTitle-style";

const HomeVsAwayTitle = ({ home, away, center }) => {
  return (
    <StyledHomeVsAwayTitle center={center}>
      <div className='team-title'>
        <TeamTitle name={away} hide />
      </div>
      <div className='versus'>VS</div>
      <div className='team-title'>
        <TeamTitle name={home} left hide />
      </div>
    </StyledHomeVsAwayTitle>
  )
}
export default HomeVsAwayTitle;