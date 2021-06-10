import styled from 'styled-components'

const media = {
    deskLG: `@media(max-width: 1100px)`,
    phoneMD1: `@media(max-width: 464px)`,
    phoneMD: `@media(max-width: 440px)`,
}

export const BettingSectionheaderContainer=styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`

export const HeaderSection1Wrapper=styled.div`
    width: 18%;
    padding:10px 0px;
    border-top-left-radius: 5px;
    border: 2px solid red;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    ${media.deskLG}{
        min-width: 129px;
    }
    ${media.phoneMD}{
        min-width: 100px;
    }
    ${media.phoneMD1}{
        height: 62px;
    }
`

export const HeaderSection1=styled.div`
    width: 100%;
    color: black;
    font-weight: 900;
`

export const HeaderSection2Wrapper=styled.div`
    width: 82%;
    border-top-right-radius: 5px;
    padding:10px 0px;
    border: 2px solid skyblue;
    padding-right: 10px;
`

export const HeaderSection2=styled.div`
    width: 100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

export const HeaderChildSection=styled.div`
    text-align:center;
    width:33.33%;
    color: black;
    font-weight: 900;
`