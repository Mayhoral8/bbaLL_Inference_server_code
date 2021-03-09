import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import GetPlayerImage from '../../../Individual/Components/GetPlayerImage';
import { breakTeamName } from '../../../Shared/Functions/breakTeamName';

const RecentEventsItem = ({ homeTeam, awayTeam, gameSummary, homeScore, awayScore, index, selectedGameIndex }) => {
  const isTeam = useSelector(state => state.sidebarReducer.isTeam);

  return (
    <RecentEventsItemWrapper gameSummary={gameSummary}>
      <div className={`${selectedGameIndex === index ? 'active' : 'inactive'} team-container`}>
        <div className='team away'>
          <div className='image-container'>
            <GetPlayerImage playerName={awayTeam.replace(/\s/g, "_")} isTeam={isTeam} />
          </div>
          <p className='team-name'>{breakTeamName(awayTeam).firstName}<br />{breakTeamName(awayTeam).lastName}</p>
          <p className='team-score'>{awayScore}</p>
        </div>

        <div className='team home'>
          <div className='image-container'>
            <GetPlayerImage playerName={homeTeam.replace(/\s/g, "_")} isTeam={isTeam} />
          </div>
          <p className='team-name'>{breakTeamName(homeTeam).firstName}<br />{breakTeamName(homeTeam).lastName}</p>
          <p className='team-score'>{homeScore}</p>
        </div>
      </div>

    </RecentEventsItemWrapper>
  )
}

const RecentEventsItemWrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  .image-container {
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
    img {
      width:100%;
      height: 100%;
    }
  }
  .active.team-container {
    border-bottom: 5px solid var(--main-purple);
  }
  .team-container {
    padding: 0.5rem 1rem;
    border-right: 1px solid silver;
    width: 200px;
  }
  .team {
    display: flex;
    font-size: 0.9rem;
    align-items: center;
    margin: 0.3rem auto;
  }
  .team-score {
    margin-left: auto;
  }
`

export default RecentEventsItem;