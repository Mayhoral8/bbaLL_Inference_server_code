import React from 'react'
import {ContentHeader,HeaderSection1,HeaderSection2,HeaderChildSection} from './contentHeaderStyles'
const contentHeader=()=>{
    return(
        <ContentHeader>
            <HeaderSection1>Teams</HeaderSection1>
            <HeaderSection2>
                <HeaderChildSection>Money Line</HeaderChildSection>
                <HeaderChildSection>Handicap</HeaderChildSection>
                <HeaderChildSection>Over & Under</HeaderChildSection>
            </HeaderSection2>
        </ContentHeader>
    )
}
export default contentHeader