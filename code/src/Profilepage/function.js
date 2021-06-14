function createTargetObj(history, type) {
    let targetObj = {
        gameDateTime: history.gameDetails.gameDate + "   " + history.gameDetails.gameStartTime,
        vs: history.gameDetails.homeTeam + "  vs  " + history.gameDetails.awayTeam,
        score: history.gameDetails.HomeScore + ":" + history.gameDetails.AwayScore,
        betOdds:history[type] ? history[type].odds : '--',
        gameFinished: history.gameFinished ? 'Ongoing' : 'Finished',
    }

    switch (type) {
        case 'moneyLine':
            targetObj.BettingType = 'Money Line \n ' + history[type].bettingSide;
            break;
        case 'overAndUnder':
            targetObj.BettingType = 'Over & Under \n (' + history[type].totalScore + ')';
            break;
        case 'spread':
            targetObj.BettingType = 'Spread \n (' + history[type].spread + ')';
            break;
        default:
            break;
    }

    return targetObj;
}

export function structureUserGameHistory(gameHistory) {
    let structuredGameHistory = []

    for (let i = 0; i < gameHistory.length; i++){
        let tempTargetObj = null
        if ('moneyLine' in gameHistory[i]) {
            tempTargetObj = createTargetObj(gameHistory[i], 'moneyLine');
        } else if ('overAndUnder' in gameHistory[i], 'overAndUnder') {
            tempTargetObj = createTargetObj(gameHistory[i]);
        } else if ('spread' in gameHistory[i]) {
            tempTargetObj = createTargetObj(gameHistory[i], 'spread');
        }

        structuredGameHistory.push(tempTargetObj);
    }

    //     let targetObj = {
    //         gameDate: gameHistory[i].gameDetails.gameDate,
    //         gameTime: gameHistory[i].gameDetails.gameStartTime,
    //         vs: gameHistory[i].gameDetails.homeTeam + "  vs  " + gameHistory[i].gameDetails.awayTeam,
    //         score: gameHistory[i][type] ? gameHistory[i][type].odds : '--',
    //         betOdds: gameHistory[i][type] ? gameHistory[i][type].odds : '--',
    //         bettingSide: type === 'overAndUnder' && gameHistory[i][type] ? '' : gameHistory[i][type] ? gameHistory[i][type].bettingSide : '--',
    //         gameFinished: gameHistory[i].gameFinished ? 1 : 0
    //     }

    //     if(type === 'handicap'){
    //         targetObj.spread = gameHistory[i][type] ? gameHistory[i][type].spread : '--'
    //     }
    //     else if(type === 'overAndUnder'){
    //         targetObj.total = gameHistory[i][type].totalScore ? gameHistory[i][type].totalScore : '--'
    //         delete targetObj.bettingSide
    //     }
    //     structuredGameHistory.push(targetObj)
    // }

    return structuredGameHistory
}