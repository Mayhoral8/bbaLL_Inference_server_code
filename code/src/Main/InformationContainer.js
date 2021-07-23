import React from "react"

const Information = ({matchFact, gameInfo}) => {
  let awayTeam = gameInfo['Away Team'];
  let homeTeam = gameInfo['Home Team'];
  let AwayWinRate = (parseFloat(matchFact['Away_WinRate']) * 100).toFixed(2);
  let HomeWinRate = (parseFloat(matchFact['Home_WinRate']) * 100).toFixed(2);
  let AFD = parseFloat(matchFact['AFD']).toFixed(2);
  let HFA = parseFloat(matchFact['HFA']).toFixed(2);
  let expSpread = parseFloat(matchFact['Exp_Spread']).toFixed(2);
  let expTotalScore = parseFloat(matchFact['Exp_Total_Score']).toFixed(2);
  let expSpreadHF = parseFloat(matchFact['Exp_Spread_HF']).toFixed(2);
  let totalScoreHF = parseFloat(matchFact["Total_Score_HF"]);

  return(
    <>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: '50px'}}>
        <div style={{textAlign: 'center'}}>
          <p>{awayTeam}</p>
          <p>Away</p>
          <p>Win Rate: {AwayWinRate}</p>
          <p>Away Field Advantage: {AFD}</p>
        </div>
        <div style={{textAlign: 'center'}}>
          <p>{homeTeam}</p>
          <p>Home</p>
          <p>Win Rate: {HomeWinRate}</p>
          <p>Home Field Advantage: {HFA}</p>
        </div>
      </div>
      <div style={{textAlign: 'center', paddingTop: '50px'}}>
        <p>Past Stats</p>
        <p>PHX vs MIL: {matchFact['Num_Home_Lose_Away']} : {matchFact['Num_Home_Wins_Away']}</p>
        <p>Expect Spread: {expSpread}</p>
        <p>Average Total Score: {expTotalScore}</p>
        <p 
        style={{paddingTop: '40px'}
        }> PHX vs @MIL: {matchFact['Num_Home_Lose_Away_HF']} : {matchFact['Num_Home_Wins_Away_HF']} 
        </p>
        <p>Expected Spread @MIL: {expSpreadHF}</p>
        <p>Average Total Score @MIL: {totalScoreHF}</p>
      </div>
    </>
  )
}

export default Information;