import React from 'react'
import {ContentHeader,HeaderSection1,HeaderSection2,HeaderChildSection} from './contentHeaderStyles'
import moment from 'moment-timezone'
const contentHeader=()=>{
    let date = new Date
    let easternStandardTimeBasedDate = moment(date).tz('America/New_York').format('MM/DD/YYYY')
    return(
        <ContentHeader>
            <HeaderSection1>{easternStandardTimeBasedDate}</HeaderSection1>
            <HeaderSection2>
                <HeaderChildSection>Handicap</HeaderChildSection>
                <HeaderChildSection>Money Line</HeaderChildSection>
                <HeaderChildSection>Over & Under</HeaderChildSection>
            </HeaderSection2>
        </ContentHeader>
    )
}
export default contentHeader