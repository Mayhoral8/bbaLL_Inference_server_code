//Data restructuring that comes from the firebase api.
export const structureData=(futureGamesInfo)=>{
    let targetArray=[]
    futureGamesInfo.map((element,index)=>{
        let pointsKeysArray=Object.keys(element['Game Odds'].General)
        let awayTeam=element['Game Info']['Away Team']
        let homeTeam=element['Game Info']['Home Team']
        let pointsTargetObj={}
        let gameDetails={...element['Game Info']}
        if(pointsKeysArray.length===0){
            pointsTargetObj={...element['Game Info'], bettingOdds:{awayTeamOdds:'', homeTeamOdds:''}}
        } else{
            pointsKeysArray.sort()
            let pointsLastIndex=pointsKeysArray.length-1
            let pointsTargetKey=pointsKeysArray[pointsLastIndex]
            pointsTargetObj={awayTeamOdds:element['Game Odds'].General[pointsTargetKey][awayTeam], homeTeamOdds:element['Game Odds'].General[pointsTargetKey][homeTeam]}
        }


        let handiKeysArray=Object.keys(element['Game Odds'].Handicap)
        let handiTargetObj
        if(handiKeysArray.length===0){
            handiTargetObj={handicapHomeTeamOdds:'',handicapAwayTeamOdds:'',handicapHomeTeamPoints:'',handicapAwayTeamPoints:''}
        } else{
            handiKeysArray.sort()
            let handiLastIndex=handiKeysArray.length-1
            let handiTargetKey=handiKeysArray[handiLastIndex]
            let childHandiTargetKeysArray=Object.keys(element['Game Odds'].Handicap[handiTargetKey])
            let childHandiValue1=childHandiTargetKeysArray[0]
            let childHandiValue2=childHandiTargetKeysArray[1]
            let handiPoint1=element['Game Odds'].Handicap[handiTargetKey][childHandiValue1]
            let handiPoint2=element['Game Odds'].Handicap[handiTargetKey][childHandiValue2]
            handiTargetObj={handicapHomeTeamPoints:childHandiValue1,handicapAwayTeamPoints:childHandiValue2,handicapHomeTeamOdds:handiPoint1,handicapAwayTeamOdds:handiPoint2}
        }


        let overUnderKeysArray=Object.keys(element['Game Odds'].Over_and_under)
        let overUnderTargetObj={}
        if(overUnderKeysArray.length===0){
            overUnderTargetObj={overTotalScore:'',underTotalScore:'',overBettingOdds:'',underBettingOdds:''}
        } else{
            overUnderKeysArray.sort()
            let underTotalScore
            let overTotalScore
            let overUnderLastIndex=overUnderKeysArray.length-1
            let overUnderTargetKey=overUnderKeysArray[overUnderLastIndex]
            let childOverUnderTargetKeys=Object.keys(element['Game Odds'].Over_and_under[overUnderTargetKey])

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

            let overOdds=element['Game Odds'].Over_and_under[overUnderTargetKey][overTotalScore]
            let underOdds=element['Game Odds'].Over_and_under[overUnderTargetKey][underTotalScore]

            underTotalScore=childOverUnderTargetKeys[0].split(' ')[1]
            overTotalScore=childOverUnderTargetKeys[0].split(' ')[1]

            overUnderTargetObj={overTotalScore,underTotalScore,overOdds,underOdds}
        }
        targetArray.push({
            overUnder:{...overUnderTargetObj},
            moneyLine:{...pointsTargetObj},
            handicap:{...handiTargetObj},
            gameDetails:{...gameDetails}, 
            handicapSelected:null,
            overUnderSelected:null,
            moneyLineSelected:null
        })
    })
    return targetArray
}