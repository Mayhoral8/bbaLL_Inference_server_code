import { rgba } from "polished";
import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";
import backgroundImage from "../assets/images/court.jpg";
import refresh from "../assets/images/refresh.png";
import "../../src/fonts.css";

export const StyledMainContent = styled.div`

`

export const StyledPlayerCanidatesMobile = styled.div`
  margin-top: 4rem;
  .button-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .refresh-button{
    background-color: #7A1DC4;
    border: 2px solid #7500DE;
    border-radius: 10px;
    color: white;
    padding: 2% 8%;
    background-image: url(${refresh});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20% auto;
  }
`

// ComparisonPage / StyledComparisonBanner  ===========================
export const StyledComparisonBanner = styled.div`
  background-image: linear-gradient(
      to right,
      rgba(56, 40, 81, 0.95) 50%,
      rgba(56, 40, 81, 0.3)
    ),
    url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  max-width: 1150px;
  margin: 5% auto 0;
  padding: 3rem;
  color: var(--white);

  h1 {
    font-weight: 400;
    text-align: center;
    span {
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    @media (max-width: ${breakpoints.phone}) {
      font-size: 1.5rem;
    }
  }
`
// The main content(menu / player(team) conparsion / static) 
export const MainContent = styled.div`
  display:flex;
  max-width: 1150px;
  margin: 0 auto 0 auto;
  .leftContent {
    max-width: 900px;
  }
`;

// ComparisonPage / StyledComparisonOptions  ==========================
export const StyledComparisonOptions = styled.section`
  border: 1px solid #eee;
  max-width: 900px;
  margin-bottom: 1rem;
  padding: 1.5rem;
  @media (max-width: ${breakpoints.phone}) {
    font-size: 0.8rem;
  }
`;

export const StyledOptionsTeams = styled.ul`
  display: flex;
  margin-bottom: 2rem;
  p {
    white-space: nowrap;
  }
  li {
    display: inline;
  }
  li span {
    display: inline;
    margin: 0 1rem;
    cursor: pointer;
    padding: 5px 5px;
    &:hover,
    &.active {
      border: 2px solid #7500DE;
      border-radius: 5px;
      box-shadow: -1px 1px 5px;
    }
    &:before {
      content: attr(title);
      font-weight: bold;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
    @media (max-width: ${breakpoints.phone}) {
      margin: 0 0.5rem;
    }
  }
`;

export const StyledOptionVs = styled.div`
  @media (max-width: ${breakpoints.desk}) {
    width: 20%;
    text-align: center;
  }
  @media (max-width: ${breakpoints.phone}) {
    margin: 1rem 0;
    width: 100%;
  }
`;

export const StyledOptionsNames = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.phone}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const StyledOptionName = styled.div`
  display: flex;
  @media (max-width: ${breakpoints.desk}) {
    flex-direction: column;
    width: 100%;
  }
  @media (max-width: ${breakpoints.phone}) {
    width: 100%;
  }
  .form-control {
    margin-right: 1rem;
    align-items: center;
    padding: 5px;
    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
      align-items: flex-start;
    }
    @media (max-width: ${breakpoints.phone}) {
      flex-direction: row;
      align-items: center;
      margin-right: 0;
    }
    label {
      @media (max-width: ${breakpoints.desk}) {
        width: 4rem;
        white-space: nowrap;
      }
    }
  }
  .form-control:first-child {
    @media (max-width: ${breakpoints.tablet}) {
      margin-bottom: 2rem;
    }
    @media (max-width: ${breakpoints.phone}) {
      margin-bottom: 0;
    }
  }
`;

export const StyledBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  text-align: center;
  margin: 1rem 0;
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 100px 1fr;
  }
`;

export const StyledBar = styled.div`
  height: 3.5rem;
  border: 2px solid #eee;
  border-radius: 5rem 0 0 5rem;
  background-color: #eee;
  p {
    display: flex;
    align-items: center;
    height: 100%;
    width: ${(props) => props.width && props.width}%;
    color: ${(props) => props.text && props.text};
    background: ${(props) => (props.bcg ? props.bcg : "mediumaquamarine")};
    padding: 0 1rem;
    @media(max-width: ${breakpoints.phone}) {
      font-size: 0.8rem;
      padding: 0 0.4rem;
    }
  }
  &.bar--left {
    border-radius: 5px 0 0 5px;
    p {
      margin-left: auto;
      border-radius: 5rem 0 0 5rem;
      justify-content: flex-start;
    }
  }
  &.bar--right {
    border-radius: 0 5px 5px 0;
    p {
      border-radius: 0 5rem 5rem 0;
      justify-content: flex-end;
    }
  }
`;

export const StyledBarText = styled.div`
  background: ${(props) =>
    props.bcg ? rgba(props.bcg, 0.1) : "rgba(0,0,0,0.1)"};
  height: 3.5rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    @media(max-width: ${breakpoints.phone}) {
      font-size: 0.8rem;
    }
    .text-bold {
      font-weight: bold;
    }
  }
`;

export const RandomPlayerContiner = styled.div`
  max-width: 200px;
  cursor: default;
`;

export const EachRandomSetWrapper = styled.div`
  .comparsion{
    max-width: 200px;
    border: 1px solid #39204F;
    box-shadow: 0px 0px 5px;
    border-radius: 10px;
    margin-bottom:20px;
    min-height: 100px;
    @media (min-width: ${breakpoints.desk}) {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
    } 
  }
  .continer {
    text-align: center;
  }
  .nameTag{
    text-align: center;
    font-size: 10px;
  }
  .vsText{
    font-family: Ubuntu;
    font-style: normal;
    font-weight: 300;
    text-align: center;
    font-size: 15px;
    @media (min-width: ${breakpoints.desk}) {
      padding-top: 30px;
    }
  }
  .img-container-side {
    display: inline-block;
    margin: 0 auto;
    align-items: center;
    display: flex;
    width: 50px;
    height: 50px;
    object-fit: cover;
    overflow: hidden;
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
      padding: ${(props) => (props.isTeam === "true" ? "1rem" : 0)};
    }
  }

  .left{
    border: 2px solid;
    border-color: #207EEC;
    border-radius: 50%;
  }

  .right{
    border: 2px solid;
    border-color: #EC2020;
    border-radius: 50%;
  }
`


export const SideNav = styled.div`
  margin-top: 100px;
  height:700px;
  border-radius: 0.5ex;
  position: sticky;
  top: -.3em;
  @media (max-width: ${breakpoints.desk}) {
    height:1200px;
  }
`;

export const StyledDropdownBule = styled.div`
  border: 3px solid #207EEC;
  border-radius: 4px;
  margin-top: 5px;
  .select__control {
    width: 100%;
    min-width: ${props=>props.length==="longer" ? '13rem': '10rem'};
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    
  }
  .select__control--is-focused {
    border: none;
    box-shadow: none;
  }
  .select__indicator-separator {
    display: none;
  }
  @media (max-width: ${breakpoints.desk}) {
    width: 100%;
  }
`;

export const StyledDropdownRed = styled.div`
  border: 3px solid #EC2020;
  border-radius: 4px;
  margin-top: 5px;
  .select__control {
    width: 100%;
    min-width: ${props=>props.length==="longer" ? '13rem': '10rem'};
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    
  }
  .select__control--is-focused {
    border: none;
    box-shadow: none;
  }
  .select__indicator-separator {
    display: none;
  }
  @media (max-width: ${breakpoints.desk}) {
    width: 100%;
  }
`;

export const StyledPlayerCandidates = styled.div `
  margin: 2rem 2rem 0;
  max-width: 200px;
  .centerButton{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button{
    background-color: #7A1DC4;
    border: 2px solid #7500DE;
    border-radius: 10px;
    color: white;
    padding: 8% 30%;
    background-image: url(${refresh});
    background-repeat: no-repeat;
    background-position: center;
    @media (min-width: ${breakpoints.desk}) {
      width: 10px;
      height: 10px;
    }
  }

`

export const StyledButton = styled.button`
  padding: 0.7rem 2rem;
  background: var(--main-purple);
  color: var(--white);
  margin-top: 1rem;
`;
