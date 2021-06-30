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
        score: history.gameDetails.HomeScore ? Math.trunc(history.gameDetails.HomeScore) + 
                        " : " + Math.trunc(history.gameDetails.AwayScore) : '--',
        betOdds:history[type] ? history[type].odds : '--',
        gameFinished: history.gameFinished ? 'Finished' : 'Ongoing',
        result: history[type].result
    }
    
    let winTeam = "null";

    if (history.gameFinished) {
        winTeam = Math.trunc(history.gameDetails.HomeScore) > Math.trunc(history.gameDetails.AwayScore) ? 
                        history.gameDetails.homeTeam : history.gameDetails.awayTeam
    }

    targetObj.vs = targetObj.vs + "--" + winTeam;

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
    let structuredGameHistory = [];
    for (let i = 0; i < gameHistory.length; i++){
        let tempTargetObj = null
        if ('moneyLine' in gameHistory[i] && gameHistory[i].moneyLine.odds !== "") {
            tempTargetObj = null
            tempTargetObj = createTargetObj(gameHistory[i], 'moneyLine');
            structuredGameHistory.push(tempTargetObj);
        } 
        
        if ('overAndUnder' in gameHistory[i] && gameHistory[i].overAndUnder.odds !== "") {
            tempTargetObj = null
            tempTargetObj = createTargetObj(gameHistory[i], 'overAndUnder');
            structuredGameHistory.push(tempTargetObj);
        } 
        
        if ('handicap' in gameHistory[i] && gameHistory[i].handicap.odds !== "") {
            tempTargetObj = null
            tempTargetObj = createTargetObj(gameHistory[i], 'handicap');
            structuredGameHistory.push(tempTargetObj);
        }
    }

    return structuredGameHistory
}