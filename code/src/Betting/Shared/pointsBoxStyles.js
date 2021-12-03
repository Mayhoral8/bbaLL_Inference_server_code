import styled from 'styled-components'

const media = {
    deskLLG: `@media(max-width: 1350px)`,
    deskLG: `@media(max-width: 1100px)`,
    deskMD: `@media(max-width: 930px)`,
    tablet: `@media(max-width: 768px)`,
    phone: `@media(max-width: 550px)`,
    phoneMD: `@media(max-width: 440px)`,
}

export const PointsBoxContainer = styled.div`
    height: 80px;
    width: 90px;
    border:${props => props.selected ? '4px solid #7500DE' : ''};
    box-shadow: ${props => props.selected ? '' : '0px 0px 15px rgba(0, 0, 0, 0.25)'};
    border-radius: 5px;
    cursor: pointer;
    margin:0px 5px;
    display:flex;
    flex-direction:column;
    ${media.deskMD}{
        height: 50px;
        width: 70px;
        border:${props => props.selected ? '2px solid #7500DE' : ''};
        margin: 10px 0px;
    }
    ${media.phoneMD}{
        height: 50px;
        width: 50px;
    }
`

export const PointsWrapper = styled.div`
    height: 100%;
    position: relative;
    z-index: 1;
`

export const PointsSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

export const LockIconContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
`

export const LockIcon = styled.img`
    width: 50px;
    opacity: 0.9;
    ${media.deskMD}{
        width: 40px;
    }
`

export const OddsValueContainer = styled.div`
    text-align: center;
    font-weight: 900;
    color: #002B5C;
    ${media.deskMD}{
        font-size: 14px;
    }
    ${media.tablet}{
        font-size: 18px;
    }
    ${media.phoneMD}{
        font-size: 15px;
    }
`

export const PointsValueContainer = styled.div`
    width: 100%;
    text-align: center;
    color: black;
    border-radius: 5px;
    font-size: 14px;
    ${media.tablet}{
        margin-top: 3px;
        font-size: 15px;
    }
    ${media.phoneMD}{
        margin-top: 7px;
        font-size: 12px;
    }
`

export const TotalScoreValueContainer = styled.div`
    width: 100%;
    text-align: center;
    color: black;
    border-radius: 5px;
    font-size: 14px;
    ${media.tablet}{
        margin-top: 3px;
        font-size: 15px;
    }
    ${media.phoneMD}{
        margin-top: 7px;
        font-size: 12px;
    }
`

export const MoneyLineOddsContainer = styled.div`
    height: 100%;
    display: flex;
    font-weight: 900;
    flex-direction: column;
    justify-content: center;
    color: #002B5C;
    align-items: center;
    ${media.deskMD}{
        font-size: 14px;
    }
    ${media.tablet}{
        font-size: 18px;
    }
    ${media.phoneMD}{
        font-size: 15px;
    }
`

export const TeamIconOddsContainer = styled.div`
    height: calc(100% - 14px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${media.phoneMD}{
        height: calc(100% - 26px);
    }
`

export const TeamIconContainer = styled.div`
    text-align:center;
    ${media.deskMD}{
        display: none;
    }
`

export const ArrowIconContainer = styled.div`
    text-align:center;
    ${media.deskMD} {
        display: none;
    }
`

export const ArrowIcon = styled.img`
    height: 38px;
    width: 50px;
`

export const TeamIcon = styled.img`
    height: 38px;
    width: 50px;
`