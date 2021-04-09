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
    const { selectedValues, index, onRemovePoints }=props
    return(
        <OverviewBoxC>
            <HeaderC>
                <TeamNameC>
                    {selectedValues[index].gameDetails['Home Team']}
                </TeamNameC>
                <TeamNameC>
                    {selectedValues[index].gameDetails['Away Team']}
                </TeamNameC>
            </HeaderC>
            <PointsC>
                {
                    selectedValues[index].moneyLine.moneyLineOddsValue ?
                    <Points>
                        <span>Money Line:</span> 
                        <span>{selectedValues[index].moneyLine.moneyLineOddsValue} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'moneyLine' ,index )
                             }}
                            />
                        </span>
                    </Points>
                    :null
                }
                {
                    selectedValues[index].handicap.handicapOddsValue ?
                    <Points>
                        <span>Handicap:</span> 
                        <span>{selectedValues[index].handicap.handicapOddsValue} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'handicap', index )
                             }}
                            />
                        </span>
                    </Points>
                    :null
                }
                {
                    selectedValues[index].over.overOdds ? 
                    <Points>
                        <span>Over:</span> 
                        <span>{selectedValues[index].over.overOdds}
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'over', index )
                             }}
                            />
                        </span>
                    </Points> 
                    : 
                    selectedValues[index].under.underOdds ? 
                    <Points><span>Under: </span> 
                        <span>{selectedValues[index].under.underOdds} 
                            <CloseIcon 
                             src={closeIcon} 
                             alt=''
                             onClick={( e )=>{
                                onRemovePoints( e, 'under', index )
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