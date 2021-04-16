import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import GetPlayerImage from '../../../Individual/Components/GetPlayerImage';
import { TeamTitleWrapper } from './GameSummary-Styles';

const TeamTitle = ({ name, left, hide, customStyle }) => {
  return (
    <TeamTitleWrapper position={left} hide={hide} style={customStyle}>
      <div className='img-container'>
        <GetPlayerImage playerName={name.replace(/\s/g, "_")} isTeam={true} />
      </div>
      <h2>{name}</h2>
    </TeamTitleWrapper>
  );
}

export default TeamTitle;