import React from 'react'
import { 
    OverviewBoxC,
    HeaderC,
    TeamNameC,
    PointsC,
    Points,
    CloseIcon
} from './betPointsOverviewBoxStyles'
import closeIcon from '../../assets/images/closeIcon.svg'
const overviewBox = ( props ) => {
    const { selectedValues, gameId, onRemovePoints }=props
    return(
        <OverviewBoxC>
            <HeaderC>
                <TeamNameC>
                    {selectedValues[gameId].gameDetails.homeTeam}
                </TeamNameC>
                <TeamNameC>
                    {selectedValues[gameId].gameDetails.awayTeam}
                </TeamNameC>
            </HeaderC>
            <PointsC>
                {
                    selectedValues[gameId].moneyLine.moneyLineOddsValue ?
                    <Points>
                        <span>Money Line:</span> 
                        <span>{selectedValues[gameId].moneyLine.moneyLineOddsValue} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'moneyLine' ,gameId )
                             }}
                            />
                        </span>
                    </Points>
                    :null
                }
                {
                    selectedValues[gameId].handicap.handicapOddsValue ?
                    <Points>
                        <span>Handicap:</span> 
                        <span>{selectedValues[gameId].handicap.handicapOddsValue} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'handicap', gameId )
                             }}
                            />
                        </span>
                    </Points>
                    :null
                }
                {
                    selectedValues[gameId].over.overOddsValue ? 
                    <Points>
                        <span>Over:</span> 
                        <span>{selectedValues[gameId].over.overOddsValue}
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'over', gameId )
                             }}
                            />
                        </span>
                    </Points> 
                    : 
                    selectedValues[gameId].under.underOddsValue ? 
                    <Points><span>Under: </span> 
                        <span>{selectedValues[gameId].under.underOddsValue} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'under', gameId )
                             }}
                            />
                        </span>
                    </Points>:null
                }
            </PointsC>
        </OverviewBoxC>
    )
}
export default overviewBox