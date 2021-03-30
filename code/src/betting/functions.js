//Data restructuring that comes from the firebase api.
export const structureData=(futureGamesInfo)=>{
    let targetArray=[]
    futureGamesInfo.map((element,index)=>{
        let pointsKeysArray=Object.keys(element['Game Odds'].General)
        pointsKeysArray.sort()
        let pointsLastIndex=pointsKeysArray.length-1
        let pointsTargetKey=pointsKeysArray[pointsLastIndex]
        let awayTeam=element['Game Info']['Away Team']
        let homeTeam=element['Game Info']['Home Team']
        let pointsTargetObj={...element['Game Info'], teams:{awayTeam:element['Game Odds'].General[pointsTargetKey][awayTeam], homeTeam:element['Game Odds'].General[pointsTargetKey][homeTeam]}}

        let handiKeysArray=Object.keys(element['Game Odds'].Handicap)
        handiKeysArray.sort()
        let handiLastIndex=handiKeysArray.length-1
        let handiTargetKey=handiKeysArray[handiLastIndex]
        let childHandiTargetKeysArray=Object.keys(element['Game Odds'].Handicap[handiTargetKey])
        let childHandiValue1=childHandiTargetKeysArray[0]
        let childHandiValue2=childHandiTargetKeysArray[1]
        let handiPoint1=element['Game Odds'].Handicap[handiTargetKey][childHandiValue1]
        let handiPoint2=element['Game Odds'].Handicap[handiTargetKey][childHandiValue2]
        let handiTargetObj={value1:childHandiValue1,value2:childHandiValue2,point1:handiPoint1,point2:handiPoint2}


        let overUnderKeysArray=Object.keys(element['Game Odds'].Over_and_under)
        overUnderKeysArray.sort()
        let under
        let over
        let overUnderLastIndex=overUnderKeysArray.length-1
        let overUnderTargetKey=overUnderKeysArray[overUnderLastIndex]
        let childOverUnderTargetKeys=Object.keys(element['Game Odds'].Over_and_under[overUnderTargetKey])

        if(childOverUnderTargetKeys[0].includes('Under')){
            under=childOverUnderTargetKeys[0]
        }else{
            over=childOverUnderTargetKeys[0]
        }
        if(childOverUnderTargetKeys[1].includes('Over')){
            over=childOverUnderTargetKeys[1]
        }else{
            under=childOverUnderTargetKeys[1]
        }

        let overPoint=element['Game Odds'].Over_and_under[overUnderTargetKey][over]
        let underPoint=element['Game Odds'].Over_and_under[overUnderTargetKey][under]

        under=childOverUnderTargetKeys[0].split(' ')[1]
        over=childOverUnderTargetKeys[0].split(' ')[1]

        let overUnderTargetObj={over,under,overPoint,underPoint}

        targetArray.push({overUnder:{...overUnderTargetObj},points:{...pointsTargetObj},handicap:{...handiTargetObj}})
    })
    return targetArray
}