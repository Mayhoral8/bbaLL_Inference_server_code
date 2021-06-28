import styled from 'styled-components'

const media = {
  deskLLG: `@media(max-width: 1350px)`,
  deskLG: `@media(max-width: 1100px)`,
  deskMD: `@media(max-width: 930px)`,
  tabletLG: `@media(max-width: 1024px)`,
  tablet: `@media(max-width: 768px)`,
  phone: `@media(max-width: 550px)`,
}

export const UserStatsContainer = styled.div`
  border: 0.5px solid rgba(57, 32, 79, 0.25);
  box-shadow: 0px 0px 5px rgba(57, 32, 79, 0.25);
  border-radius: 5px;
  padding:20px;
  margin: 0 5px;
  width: auto;
  text-align:center; 
  .styledButton{
    color: white;
    background-color: #65AE24;
    border-radius: 5px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    padding: 15px 80px;
    ${media.tablet}{
      padding: 15px 40px;
    }
  }
  .styledDiv {
      margin-top: 40px;
  }
`

export const UserName = styled.h3`
  width: 100%;
  text-align: center;
  margin-bottom:20px;
  overflow: hidden;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #3D4857;
`

export const ProfileImgFigures = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 290px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0px 2px;
    font-size: 10px;
  }
`

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align:start;
  width: 100%;
  margin-top:20px;
  ${media.tablet} {
    margin-top: 10px;
  }
`

export const ProfileImg = styled.img`
  ${media.phone}{
    height: auto;
    width: 90%;
    border-radius: 10px;
  }

  ${media.tablet} {
    width: 90px;
    height: auto;
    border-radius: 10px;
  }

  width: 100px;
  height: auto;
  border-radius: 10px;
  `

export const PointsRank = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LevelWinRate = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Stats = styled.div`
  color: rgb(0,0,0,0.5);
  margin: 0px 20px;
  ${media.tablet}{
    margin: 0px 5px;
  }

  @media screen and (max-width: 280px) {
    margin: 0px 2px;
    font-size: 10px;
  }
`

export const IconFigure = styled.div`
    display: flex;
    margin-top: 5px;
`

export const Icon = styled.img`

`

export const Figure = styled.div`
    font-weight: 900;
    margin-left: 10px;
    color: black;
`

export const Rank = styled.div`
    margin:5px 0px;
    ${media.deskLG}{
        display: none;
    }
`

export const Level = styled.div`
    margin:5px 0px;
    ${media.deskLG}{
        display: none;
    }
`
