import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";
export const Wrapper = styled.div`
  font-family: Roboto;
  .tableHeader{
    display: grid;
    grid-template-columns: 3fr 2fr 2fr;
    width: 80%;
    margin: 0 auto 0 auto;
    @media(max-width: 834px) {
      font-size: 0.8rem;
    }
  }

  .buttom {
    @media(max-width: 834px) {
      padding-top: 0px;
    }
  }
`

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 10px;
  padding-bottom: 20px;
  justify-content: center;
  width: 80%;
  margin: 0 auto 0 auto;
  @media(max-width: 987px) {
    width: 100%;
  }

  .img-container-side {
    display: flex;
    width: 70px;
    height: 70px;
    @media(max-width: 987px) {
      width: 50px;
      height: 50px;
    }

    @media(max-width: 300px) {
      display: none;
    }
    object-fit: cover;
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
    font-size: 2rem;
    @media (max-width: 834px) {
      font-size: 1rem;
    }
    @media(max-width: 987px) {
      font-size: 1.5rem;
    }
    display: grid;
    grid-template-columns: 4fr 1fr;
  }
  .awayTeam{
    color: ${(props) => props.awayTeamColor};
    font-weight: bold;
    font-family: Roboto;
    font-size: 2rem;
    @media (max-width: 834px) {
      font-size: 1rem;
    }
    @media(max-width: 987px) {
      font-size: 1.5rem;
    }
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
`

export const EachColumn = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  padding: 5px 0;
  @media(max-width: 834px) {
    font-size: 0.8rem;
  }
`

export const CustomizeTable = styled.div`
  border-top: 3px solid black;
  width: 80%;
  margin: 0 auto 0 auto;
`