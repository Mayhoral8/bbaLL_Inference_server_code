import React from 'react'
import {BettingSectionheaderContainer,HeaderSection1,HeaderSection2,HeaderChildSection} from './bettingSectionHeaderStyles'
import moment from 'moment-timezone'
const BettingSectionheader=()=>{
    let date = new Date
    let easternStandardTimeBasedDate = moment(date).tz('America/New_York').format('MM/DD/YYYY')
    return(
        <BettingSectionheaderContainer>
            <HeaderSection1>{easternStandardTimeBasedDate}</HeaderSection1>
            <HeaderSection2>
                <HeaderChildSection>Handicap</HeaderChildSection>
                <HeaderChildSection>Money Line</HeaderChildSection>
                <HeaderChildSection>Over & Under</HeaderChildSection>
            </HeaderSection2>
        </BettingSectionheaderContainer>
    )
}
export default BettingSectionheader