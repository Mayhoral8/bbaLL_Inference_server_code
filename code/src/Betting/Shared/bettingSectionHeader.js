import React from 'react'
import { 
    BettingSectionheaderContainer,
    HeaderSection1Wrapper,
    HeaderSection1,
    HeaderSection2Wrapper,
    HeaderSection2,
    HeaderChildSection,
    GameDate,
    GameTime
} from './bettingSectionHeaderStyles'

const BettingSectionheader = (props) => {
    return(
        <BettingSectionheaderContainer>
            <HeaderSection1Wrapper>
                <HeaderSection1>
                    <GameDate>{props.gameDate}</GameDate>
                    <GameTime>{props.gameStartTime} EST</GameTime>
                </HeaderSection1>
            </HeaderSection1Wrapper>
            <HeaderSection2Wrapper>
                <HeaderSection2>
                    <HeaderChildSection>Spread</HeaderChildSection>
                    <HeaderChildSection>Money Line</HeaderChildSection>
                    <HeaderChildSection>Over & Under</HeaderChildSection>
                </HeaderSection2>
            </HeaderSection2Wrapper>
        </BettingSectionheaderContainer>
    )
}

export default BettingSectionheader