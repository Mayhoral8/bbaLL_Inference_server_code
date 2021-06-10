import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    phoneSM: `@media(max-width: 480px)`,
    phoneMD: `@media(max-width: 440px)`,
}

export const OverviewBoxC=styled.div`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: white;
    margin: 10px 0px;
    border-radius: 20px;
    ${media.deskLLG} {
        margin: 10px 10px;
        min-width: 240px;
    }
    ${media.phoneSM} {
        margin: 10px 10px;
        min-width: 200px;
    }
`

export const Input=styled.input`
    border:1px solid #e6e6e6;
    height:50px;
    width:100%;
    padding:10px;
`
 
export const PointsC=styled.div`
    min-height:137px;
    padding:10px 20px;
`
export const Type = styled.span`
    font-weight: 900;
    ${media.phoneMD}{
        font-size: 14px;
    }
`

export const HeaderC=styled.div`
    background: white;
    border: 2px solid #7500DE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 1px 4px rgba(57, 32, 79, 0.25);
    padding:10px 20px;
    border-radius: 20px;
`

export const TeamNameC=styled.div`
    margin: 5px 0px;
    color: white;
    font-weight: 900;
    color: black;
    ${media.phoneMD}{
        font-size: 14px;
    }
`

export const Points=styled.div`
    padding:10px 0px;
    display:flex;
    justify-content:space-between;
    align-items:center;
`

export const CloseIcon=styled.img`
    margin-left:15px;
    cursor: pointer;
`

export const Span = styled.span`
    ${media.phoneMD}{
        font-size: 11.5px;
    }
`