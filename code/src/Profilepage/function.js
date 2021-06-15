function transformTime(time) {
    let timeArray = time.split(' ');
    if (timeArray[1] === 'PM') {
        let hourAndMinute = timeArray[0].split(':');
        let newHour = parseInt(hourAndMinute[0]) + 12;
        let newTime = newHour + ':' + hourAndMinute[1];
        return newTime;
    }

    return timeArray[0];
}

function createTargetObj(history, type) {    
    let targetObj = {
        gameDateTime: history.gameDetails.gameDate + " " + transformTime(history.gameDetails.gameStartTime),
        vs: history.gameDetails.homeTeam + "  vs  " + history.gameDetails.awayTeam,
        score: history.gameDetails.HomeScore ? history.gameDetails.HomeScore + " : " + history.gameDetails.AwayScore : '--',
        betOdds:history[type] ? history[type].odds : '--',
        gameFinished: history.gameFinished ? 'Finished' : 'Ongoing',
    }

    switch (type) {
        case 'moneyLine':
            targetObj.BettingType = 'Money Line (' + history[type].bettingSide  + ')';;
            break;
        case 'overAndUnder':
            targetObj.BettingType = 'Over & Under (' + history[type].totalScore + ')';
            break;
        case 'handicap':
            targetObj.BettingType = 'Spread (' + history[type].spread + ')';
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
            tempTargetObj = null
            tempTargetObj = createTargetObj(gameHistory[i], 'moneyLine');
            structuredGameHistory.push(tempTargetObj);
        } 
        
        if ('overAndUnder' in gameHistory[i]) {
            tempTargetObj = null
            tempTargetObj = createTargetObj(gameHistory[i], 'overAndUnder');
            structuredGameHistory.push(tempTargetObj);
        } 
        
        if ('handicap' in gameHistory[i]) {
            tempTargetObj = null
            tempTargetObj = createTargetObj(gameHistory[i], 'handicap');
            structuredGameHistory.push(tempTargetObj);
        }
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