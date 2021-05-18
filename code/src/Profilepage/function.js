export const structureUserGameHistory = (gameHistory, type) => {
    let structuredGameHistory = []

    for (let i = 0; i < gameHistory.length; i++){

        let targetObj = {
            gameDate: gameHistory[i].gameDetails.gameDate,
            vs: gameHistory[i].gameDetails.homeTeam + "  vs  " + gameHistory[i].gameDetails.awayTeam,
            score: gameHistory[i][type] ? gameHistory[i][type].odds : '--',
            betOdds: gameHistory[i][type] ? gameHistory[i][type].odds : '--',
            bettingSide: type === 'overAndUnder' && gameHistory[i][type] ? '' : gameHistory[i][type] ? gameHistory[i][type].bettingSide : '--',
            gameFinished: gameHistory[i].gameFinished
        }

        if(type === 'handicap'){
            targetObj.spread = gameHistory[i][type] ? gameHistory[i][type].points : '--'
        }
        else if(type === 'overUnder'){
            targetObj.spread = gameHistory[i][type].totalScore ? gameHistory[i][type].totalScore : '--'
            delete targetObj.bettingSide
        }
        structuredGameHistory.push(targetObj)
    }

    return structuredGameHistory
}