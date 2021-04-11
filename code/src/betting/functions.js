import data from './data.json'

//Data restructuring that comes from the firebase api.
export const structureData=(futureGamesInfo)=>{
    let targetArray=[]
    futureGamesInfo.map(({docId,docData},index)=>{
        let pointsKeysArray=Object.keys(docData['Game Odds'].General)
        let awayTeam=docData['Game Info']['Away Team']
        let homeTeam=docData['Game Info']['Home Team']
        let pointsTargetObj={}
        let gameDetails={
            gameDate: docData['Game Info']['Game Date'],
            awayTeam,
            homeTeam,
            gameStartTime: docData['Game Info']['Game Start Time']
        }
        if(pointsKeysArray.length===0){
            pointsTargetObj={...docData['Game Info'], bettingOdds:{awayTeamOdds:'', homeTeamOdds:''}}
        } else{
            pointsKeysArray.sort()
            let pointsLastIndex=pointsKeysArray.length-1
            let pointsTargetKey=pointsKeysArray[pointsLastIndex]
            pointsTargetObj={awayTeamOdds:docData['Game Odds'].General[pointsTargetKey][awayTeam], homeTeamOdds:docData['Game Odds'].General[pointsTargetKey][homeTeam]}
        }


        let handiKeysArray=Object.keys(docData['Game Odds'].Handicap)
        let handiTargetObj
        if(handiKeysArray.length===0){
            handiTargetObj={handicapHomeTeamOdds:'',handicapAwayTeamOdds:'',handicapHomeTeamPoints:'',handicapAwayTeamPoints:''}
        } else{
            handiKeysArray.sort()
            let handiLastIndex=handiKeysArray.length-1
            let handiTargetKey=handiKeysArray[handiLastIndex]
            let childHandiTargetKeysArray=Object.keys(docData['Game Odds'].Handicap[handiTargetKey])
            let childHandiValue1=childHandiTargetKeysArray[0]
            let childHandiValue2=childHandiTargetKeysArray[1]
            let handiPoint1=docData['Game Odds'].Handicap[handiTargetKey][childHandiValue1]
            let handiPoint2=docData['Game Odds'].Handicap[handiTargetKey][childHandiValue2]
            handiTargetObj={handicapHomeTeamPoints:childHandiValue1,handicapAwayTeamPoints:childHandiValue2,handicapHomeTeamOdds:handiPoint1,handicapAwayTeamOdds:handiPoint2}
        }


        let overUnderKeysArray=Object.keys(docData['Game Odds'].Over_and_under)
        let overUnderTargetObj={}
        if(overUnderKeysArray.length===0){
            overUnderTargetObj={overTotalScore:'',underTotalScore:'',overBettingOdds:'',underBettingOdds:''}
        } else{
            overUnderKeysArray.sort()
            let underTotalScore
            let overTotalScore
            let overUnderLastIndex=overUnderKeysArray.length-1
            let overUnderTargetKey=overUnderKeysArray[overUnderLastIndex]
            let childOverUnderTargetKeys=Object.keys(docData['Game Odds'].Over_and_under[overUnderTargetKey])

            if(childOverUnderTargetKeys[0].includes('Under')){
                underTotalScore=childOverUnderTargetKeys[0]
            }else{
                overTotalScore=childOverUnderTargetKeys[0]
            }
            if(childOverUnderTargetKeys[1].includes('Over')){
                overTotalScore=childOverUnderTargetKeys[1]
            }else{
                underTotalScore=childOverUnderTargetKeys[1]
            }

            let overOddsValue=docData['Game Odds'].Over_and_under[overUnderTargetKey][overTotalScore]
            let underOddsValue=docData['Game Odds'].Over_and_under[overUnderTargetKey][underTotalScore]

            underTotalScore=childOverUnderTargetKeys[0].split(' ')[1]
            overTotalScore=childOverUnderTargetKeys[0].split(' ')[1]

            overUnderTargetObj={overTotalScore,underTotalScore,overOddsValue,underOddsValue}
        }
        targetArray.push({
            overUnder:{...overUnderTargetObj},
            moneyLine:{...pointsTargetObj},
            handicap:{...handiTargetObj},
            gameDetails:{...gameDetails},
            gameId:docId,
            handicapSelected:null,
            overUnderSelected:null,
            moneyLineSelected:null
        })
    })
    return targetArray
}

export const pointBoxClickHandler=(e, params, index, keyName, selectedKey, oddsValue, pointsValue, scoreValue, props, selectedValues, gameInfo)=>{
    if(props.userDetails){
        let gameInfoUpdated = gameInfo;
        gameInfoUpdated[index][keyName] = selectedKey;
        let targetObj={}
        if(selectedValues[index]){
            targetObj=selectedValues
        } else{
            let newObj = { 
                moneyLine: { ...data.selectedValues.moneyLine },
                handicap: { ...data.selectedValues.handicap },
                over: { ...data.selectedValues.over },
                under: { ...data.selectedValues.under }
            }
            selectedValues[index]=newObj
            targetObj=selectedValues
        }

        if(params==='moneyLine'){
            targetObj[index][params].moneyLineOddsValue=oddsValue;
        } else if(params==='handicap'){
            targetObj[index][params].handicapOddsValue=oddsValue;
            targetObj[index][params].handicapPointsValue=pointsValue;
        } else{
            if(params.includes('over')){
                targetObj[index][params].overOddsValue=oddsValue;
                targetObj[index][params].overTotalScoreValue=scoreValue;
                targetObj[index]['under'].underOddsValue=null;
                targetObj[index]['under'].underTotalScoreValue=null;
            } else{
                targetObj[index][params].underOddsValue=oddsValue;
                targetObj[index][params].underTotalScoreValue=scoreValue;
                targetObj[index]['over'].overOddsValue=null;
                targetObj[index]['over'].overTotalScoreValue=null;
            }
        }
        targetObj[index].gameDetails = gameInfoUpdated[index].gameDetails;
        targetObj[index].gameId = gameInfoUpdated[index].gameId 
        let newOverviewKeysArray=Object.keys(targetObj);
        return {
            gameInfoUpdated,targetObj,newOverviewKeysArray
        }

    } else{
        props.history.push('/login')
    }
}