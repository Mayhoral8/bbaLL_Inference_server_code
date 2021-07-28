import React from "react"
import { TitleWrapper,          
         EachColumn,
         CustomizeTable,
         Wrapper,
         TableHeader } from "./InformationContainer-Style";
import { avoidColourSets } from "../Shared/Functions/gameStatsFunctions";
import GetPlayerImage from "../Individual/Components/GetPlayerImage";
import * as teamABB from '../constants/TeamABB';


const Information = ({matchFact, gameInfo}) => {
  let awayTeam = gameInfo['Away Team'];
  let homeTeam = gameInfo['Home Team'];
  let awayTeamABB = teamABB.TEAM2ABB[awayTeam];
  let homeTeamABB = teamABB.TEAM2ABB[homeTeam];

  let AwayWinRate = (parseFloat(matchFact['Away_WinRate']) * 100).toFixed(2);
  let HomeWinRate = (parseFloat(matchFact['Home_WinRate']) * 100).toFixed(2);
  let AFD = (parseFloat(matchFact['AFD']) * 100).toFixed(2);
  let HFA = (parseFloat(matchFact['HFA']) * 100).toFixed(2);
  let expSpread = parseFloat(matchFact['Exp_Spread']).toFixed(2);
  let expTotalScore = parseFloat(matchFact['Exp_Total_Score']).toFixed(1);
  let expSpreadHF = parseFloat(matchFact['Exp_Spread_HF']).toFixed(2);
  let totalScoreHF = parseFloat(matchFact["Total_Score_HF"]).toFixed(1);
  let numHomeLoseAway = matchFact['Num_Home_Lose_Away'];
  let numHomeWinAway = matchFact['Num_Home_Wins_Away'];
  let numHomeLoseAwayHF = matchFact['Num_Home_Lose_Away_HF'];
  let numHomeWinsAeayHF = matchFact['Num_Home_Wins_Away_HF'];

  const teamColours = avoidColourSets(
    // formats team names for function call
    homeTeam.replaceAll(" ", "").toUpperCase(),
    awayTeam.replaceAll(" ", "").toUpperCase()
  );
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
          </div>
          <div>
            <p style={{ paddingTop: "5px" }}>{awayTeam}</p>
          </div>
        </div>
        <div className="homeTeam">
          <div>
            <p style={{paddingTop: '5px', textAlign: 'right'}}>{homeTeam}</p>
          </div>
          <div>
            <div className="img-container-side">
              <GetPlayerImage
                playerName={homeTeam.replace(/ /g, "_").replace(".", ",")}
                isTeam={true}
              />
            </div>
          </div>
        </div>
      </TitleWrapper>

      <div className='tableHeader'>
        <p></p>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{awayTeamABB} (Away)</p>
        <p style={{textAlign: 'center', fontWeight: 'bold'}}>{homeTeamABB} (Home)</p>
      </div>
      <CustomizeTable>
        <EachColumn>
          <p style={{ fontWeight: "bold" }}>Win Rate</p>
          <p style={{ textAlign: "center" }}>{AwayWinRate}%</p>
          <p style={{ textAlign: "center" }}>{HomeWinRate}%</p>
        </EachColumn>
        <EachColumn>
          <p style={{ fontWeight: "bold" }}>
            Away Field Disadvantage & Home Field Advantage
          </p>
          <p style={{ textAlign: "center" }}>{AFD}%</p>
          <p style={{ textAlign: "center" }}>{HFA}%</p>
        </EachColumn>
      </CustomizeTable>
      <div className='tableHeader buttom'>
        <p></p>
        <p style={{fontWeight: 'bold', textAlign: 'center'}}>Total Match</p>
        <p style={{fontWeight: 'bold', textAlign: 'center'}}>Match @{homeTeamABB} ~{awayTeamABB}</p>
      </div>
      <CustomizeTable>
        <EachColumn>
          <p style={{fontWeight: 'bold'}}>{awayTeamABB} vs {homeTeamABB} matches</p>
          <p style={{textAlign: 'center'}}>{numHomeLoseAway}:{numHomeWinAway}</p>
          <p style={{textAlign: 'center'}}>{numHomeLoseAwayHF}:{numHomeWinsAeayHF}</p>
        </EachColumn>
        <EachColumn>
          <p style={{ fontWeight: "bold" }}>Expected Spread</p>
          <p style={{ textAlign: "center" }}>{expSpread}</p>
          <p style={{ textAlign: "center" }}>{expSpreadHF}</p>
        </EachColumn>
        <EachColumn>
          <p style={{ fontWeight: "bold" }}>Avg. Total Score</p>
          <p style={{ textAlign: "center" }}>{expTotalScore}</p>
          <p style={{ textAlign: "center" }}>{totalScoreHF}</p>
        </EachColumn>
      </CustomizeTable>
    </Wrapper>
  );
};

export default Information;
