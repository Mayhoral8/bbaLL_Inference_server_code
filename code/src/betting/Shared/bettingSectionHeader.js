import React from 'react'
import { 
    BettingSectionheaderContainer,
    HeaderSection1,
    HeaderSection2,
    HeaderChildSection
} from './bettingSectionHeaderStyles'

const BettingSectionheader = (props) => {
    return(
        <BettingSectionheaderContainer>
            <HeaderSection1>{props.gameStartTime}</HeaderSection1>
            <HeaderSection2>
                <HeaderChildSection>Spread</HeaderChildSection>
                <HeaderChildSection>Money Line</HeaderChildSection>
                <HeaderChildSection>Over & Under</HeaderChildSection>
            </HeaderSection2>
        </BettingSectionheaderContainer>
    )
}

export default BettingSectionheader