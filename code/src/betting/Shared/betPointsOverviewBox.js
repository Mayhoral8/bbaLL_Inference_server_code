import React from 'react'
import { 
    OverviewBoxC,
    HeaderC,
    TeamNameC,
    PointsC,
    Points,
    CloseIcon,
    Type
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
                    selectedValues[gameId].moneyLine.odds ?
                    <Points>
                        <Type>Money Line</Type> 
                        <span>{selectedValues[gameId].moneyLine.odds} 
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
                    selectedValues[gameId].handicap.odds ?
                    <Points>
                        <Type>Spread</Type> 
                        <span>{selectedValues[gameId].handicap.odds} 
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
                    selectedValues[gameId].overAndUnder.type === 'over' ? 
                    <Points>
                        <Type>Over</Type> 
                        <span>{selectedValues[gameId].overAndUnder.odds}
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'overAndUnder', gameId )
                             }}
                            />
                        </span>
                    </Points> 
                    : 
                    selectedValues[gameId].overAndUnder.type === 'under' ?
                    <Points><span>Under: </span> 
                        <span>{selectedValues[gameId].overAndUnder.odds} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'overAndUnder', gameId )
                             }}
                            />
                        </span>
                    </Points>
                    :
                    null
                }
            </PointsC>
        </OverviewBoxC>
    )
}
export default overviewBox