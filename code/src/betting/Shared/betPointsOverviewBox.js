import React from 'react'
import {OverviewBoxC,Input,Label} from './betPointsOverviewBoxStyles'
const overviewBox=(props)=>{
    const {figures,label}=props
    console.log(figures)
    return(
        <OverviewBoxC>
            <Label>{label}</Label>
            <Input disabled={true} value={figures}/>
        </OverviewBoxC>
    )
}
export default overviewBox