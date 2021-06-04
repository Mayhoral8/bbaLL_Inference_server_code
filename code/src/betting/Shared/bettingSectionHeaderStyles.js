import styled from 'styled-components'

const media = {
    phoneMD: `@media(max-width: 440px)`,
}

export const BettingSectionheaderContainer=styled.div`
    width:100%;
    padding:10px;
    display:flex;
    justify-content: space-between;
    background: #002B5C;
    border-top-left-radius: 5px;
`


export const HeaderSection1=styled.div`
    max-width: 18%;
    min-width: 129px;
    color: white;
    font-weight: 900;
    ${media.phoneMD}{
        min-width: 100px;
    }
`

export const HeaderSection2=styled.div`
    width: 82%;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

export const HeaderChildSection=styled.div`
    text-align:center;
    width:33.33%;
    color: white;
    font-weight: 900;
`