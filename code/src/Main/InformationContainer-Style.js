import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";
export const Wrapper = styled.div`
  font-family: Roboto;
`

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 20px;
  padding-bottom: 30px;
  justify-content: center;
  width: 80%;
  margin: 0 auto 0 auto;

  .img-container-side {
    display: flex;
    width: 70px;
    height: 70px;
    object-fit: cover;
    @media (max-width: ${breakpoints.tabletLG}) {
      width: 30px;
      height: 30px;
    }
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
    img {
      align-items: center;
      width: 98%;
      border-radius: ${(props) => (props.isTeam === "true" ? "0" : "50%")};
    }
  }

  .homeTeam{
    color: ${(props) => props.homeTeamColor};
    font-weight: bold;
    font-family: Roboto;
    font-size: 2.5rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
  .awayTeam{
    color: ${(props) => props.awayTeamColor};
    font-weight: bold;
    font-family: Roboto;
    font-size: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
`

export const EachColumn = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  padding: 10px 0;
`

export const CustomizeTable = styled.div`
  border-top: 3px solid black;
  width: 80%;
  margin: 0 auto 0 auto;
`