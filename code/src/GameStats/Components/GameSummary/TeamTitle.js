import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import GetPlayerImage from '../../../Individual/Components/GetPlayerImage';

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

const TeamTitleWrapper = styled.div`
  display: flex;
  align-items: center;

  .img-container {
    width: 50px;
    height: 50px;
    margin-right: ${({ position }) => position ? 0 : 1}rem;
    margin-left: ${({ position }) => position ? 1 : 0}rem;
    order: ${({ position }) => position ? 2 : 1};
    img {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    letter-spacing: 0.5px;
    order: ${({ position }) => position ? 1 : 2}
  }

  @media(max-width: 768px) {
    margin-left: ${({ hide }) => hide ? '0' : '1rem'};
    h2 {
      display: ${({ hide }) => hide ? 'none' : 'block'};
      font-size: 1.2rem;
    }
  }
`

export default TeamTitle;