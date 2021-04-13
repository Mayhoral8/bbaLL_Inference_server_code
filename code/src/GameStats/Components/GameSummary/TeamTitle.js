import React from 'react'
import { useSelector } from 'react-redux';
import GetPlayerImage from '../../../Individual/Components/GetPlayerImage';
import { TeamTitleWrapper } from './GameSummary-Styles';

const TeamTitle = ({ name, left, hide, customStyle }) => {
  const isTeam = useSelector(state => state.sidebarReducer.isTeam);
  return (
    <TeamTitleWrapper position={left} hide={hide} style={customStyle}>
      <div className='img-container'>
        <GetPlayerImage playerName={name.replace(/\s/g, "_")} isTeam={isTeam} />
      </div>
      <h2>{name}</h2>
    </TeamTitleWrapper>
  );
}

export default TeamTitle;