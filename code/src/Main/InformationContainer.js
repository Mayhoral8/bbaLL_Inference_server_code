import React from "react"
import { TitleWrapper,          
         EachColumn,
         CustomizeTable,
         Wrapper } from "./InformationContainer-Style";
import { avoidColourSets } from "../Shared/Functions/gameStatsFunctions";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";

const Information = ({matchFact, gameInfo}) => {
  let awayTeam = gameInfo['Away Team'];
  let homeTeam = gameInfo['Home Team'];
  let AwayWinRate = (parseFloat(matchFact['Away_WinRate']) * 100).toFixed(2);
  let HomeWinRate = (parseFloat(matchFact['Home_WinRate']) * 100).toFixed(2);
  let AFD = (parseFloat(matchFact['AFD']) * 100).toFixed(2);
  let HFA = (parseFloat(matchFact['HFA']) * 100).toFixed(2);
  let expSpread = parseFloat(matchFact['Exp_Spread']).toFixed(2);
  let expTotalScore = parseFloat(matchFact['Exp_Total_Score']).toFixed(1);
  let expSpreadHF = parseFloat(matchFact['Exp_Spread_HF']).toFixed(2);
  let totalScoreHF = parseFloat(matchFact["Total_Score_HF"]).toFixed(1);

  const teamColours = avoidColourSets(
    // formats team names for function call
    homeTeam.replaceAll(" ", "").toUpperCase(),
    awayTeam.replaceAll(" ", "").toUpperCase()
  );
  console.log(teamColours.colourOne)
  return(
    <Wrapper>
      <TitleWrapper 
        homeTeamColor = {teamColours.colourOne} 
        awayTeamColor = {teamColours.colourTwo}>
        <div className='awayTeam'>
            <div>
              <div className='img-container-side'>
                <GetPlayerImage playerName={awayTeam.replace(/ /g, "_").replace(".", ",")} isTeam={true}/>
              </div>
            </div>
          <div>
            <p style={{paddingTop: '5px'}}>{awayTeam}</p>
          </div>
        </div>
        <div className='homeTeam'>
          <div>
            <p style={{paddingTop: '5px'}}>{homeTeam}</p>
          </div>
          <div>
            <div className='img-container-side'>
              <GetPlayerImage playerName={homeTeam.replace(/ /g, "_").replace(".", ",")} isTeam={true}/>
            </div>
          </div>
        </div>
      </TitleWrapper>

      <div style={{display: 'grid', gridTemplateColumns: '3fr 2fr 2fr', width: '80%', margin: '0 auto 0 auto'}}>
        <p></p>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>PHX(Away)</p>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>MIL(Home)</p>
      </div>
      <CustomizeTable>
        <EachColumn>
          <p style={{fontWeight: 'bold'}}>Win Rate</p>
          <p style={{textAlign: 'center'}}>{AwayWinRate}%</p>
          <p style={{textAlign: 'center'}}>{HomeWinRate}%</p>
        </EachColumn>
        <EachColumn>
          <p style={{fontWeight: 'bold'}}>Away Field Disadvantage | Home Field Advantage</p>
          <p style={{textAlign: 'center'}}>{AFD}%</p>
          <p style={{textAlign: 'center'}}>{HFA}%</p>
        </EachColumn>
      </CustomizeTable>
      <div style={{display: 'grid', gridTemplateColumns: '3fr 2fr 2fr', width: '80%', margin: '0 auto 0 auto', paddingTop: '30px'}}>
        <p></p>
        <p style={{fontWeight: 'bold', textAlign: 'center'}}>Total Match</p>
        <p style={{fontWeight: 'bold', textAlign: 'center'}}>Match @MIL</p>
      </div>
      <CustomizeTable>
        <EachColumn>
          <p style={{fontWeight: 'bold'}}>PHX vs MIL matches</p>
          <p style={{textAlign: 'center'}}>{matchFact['Num_Home_Lose_Away']}:{matchFact['Num_Home_Wins_Away']}</p>
          <p style={{textAlign: 'center'}}>{matchFact['Num_Home_Lose_Away_HF']}:{matchFact['Num_Home_Wins_Away_HF']}</p>
        </EachColumn>
        <EachColumn>
          <p style={{fontWeight: 'bold'}}>Expected Spread</p>
          <p style={{textAlign: 'center'}}>{expSpread}</p>
          <p style={{textAlign: 'center'}}>{expSpreadHF}</p>
        </EachColumn>
        <EachColumn>
          <p style={{fontWeight: 'bold'}}>Avg. Total Score</p>
          <p style={{textAlign: 'center'}}>{expTotalScore}</p>
          <p style={{textAlign: 'center'}}>{totalScoreHF}</p>
        </EachColumn>
      </CustomizeTable>
    </Wrapper>
  )
}

export default Information;