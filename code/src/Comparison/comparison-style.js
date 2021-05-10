import { rgba } from "polished";
import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";
import backgroundImage from "../assets/images/court.jpg";
import refresh from "../assets/images/refresh.png";
import "../../src/fonts.css";

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
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 3rem;
  color: var(--white);
  @media (max-width: ${breakpoints.desk}) {
    margin: 0 auto 0;
  }
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
`;
export const StyledPlayerCandidates = styled.div`
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 3rem;
  width: 500px;
  @media (max-width: ${breakpoints.desk}) {
    margin: 0 auto 0;
  }

  @media (max-width: ${breakpoints.phone}) {
    font-size: 1.5rem;
  }

  .centerButton {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }

  .button {
    background-color: #7a1dc4;
    border: 2px solid #7500de;
    border-radius: 10px;
    color: white;
    padding: 28px 121px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 14px;
    background-image: url(${refresh});
    background-repeat: no-repeat;
    background-position: center;

    text-align: center;
  }
`;

// ComparisonPage / StyledComparisonOptions  ==========================
export const StyledComparisonOptions = styled.section`
  border: 1px solid #eee;
  max-width: 1100px;
  margin: 0 auto 1rem;
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
      border: 2px solid #7500de;
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

export const StyledButton = styled.button`
  padding: 0.7rem 2rem;
  background: var(--main-purple);
  color: var(--white);
  margin-top: 1rem;
`;

// ComparisonPage / StyledComparisonProfile  ==========================
export const StyledComparisonProfile = styled.section`
  max-width: 1100px;
  width: 85%;
  margin: 0 auto 0 auto;
  font-family: ubuntu;
  padding: 1.5rem 20px;
  border: 1px solid #207eec;
  box-shadow: 0px 0px 5px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.desk}) {
    max-width: inherit;
    margin: 0 2rem;
  }
  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }
  @media (max-width: ${breakpoints.phoneXXS}) {
    flex-direction: column;
  }
`;

export const StyledComparisonProfileElement = styled.div`
  display: flex;
  align-items: center;
  text-shadow: -2px 2px 5px rgba(57, 32, 79, 0.3);
  font-family: Ubuntu;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  text-transform: capitalize;

  .img-container {
    align-items: center;
    display: flex;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 6px solid;
    border-color: ${(props) => props.teamColour && props.teamColour};
    border-radius: 50%;
    overflow: hidden;
    @media (max-width: ${breakpoints.tabletLG}) {
      width: 100px;
      height: 100px;
    }
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
    img {
      width: 100%;
      border-radius: ${(props) => (props.isTeam === "true" ? "0" : "50%")};
      padding: ${(props) => (props.isTeam === "true" ? "1rem" : 0)};
    }
  }
`;
export const StyledInfo = styled.div`
  flex: 2;
  margin: ${(props) => (props.margin === "left" ? "0 0 0 1rem" : "0 1rem 0 0")};
  text-align: ${(props) => (props.margin === "left" ? "left" : "right")};
  h3 {
    text-shadow: -2px 2px 5px rgba(57, 32, 79, 0.3);
    color: red;
    font-family: Ubuntu;
    font-style: normal;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 0.5rem;
    margin-left: ${(props) => (props.margin === "left" ? "" : "auto")};
    max-width: 15rem;
    @media (max-width: ${breakpoints.tabletLG}) {
      font-size: 1.3rem;
    }
    @media (max-width: ${breakpoints.phone}) {
      font-size: 1rem;
    }
  }
  p {
    font-size: 1.2rem;
    @media (max-width: ${breakpoints.tabletLG}) {
      font-size: 1rem;
    }
    @media (max-width: ${breakpoints.tabletLG}) {
      font-size: 0.8rem;
    }
  }
`;

export const StyledComparisonProfileBlank = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 0;
  @media (max-width: ${breakpoints.desk}) {
    max-width: inherit;
    margin: 0 2rem;
  }
  @media (max-width: ${breakpoints.phone}) {
    margin: 0 1rem;
  }
`;

// ComparisonYearSelection  ===========================================
export const StyledDropdownBule = styled.div`
  border: 3px solid #207eec;
  border-radius: 4px;
  margin-top: 5px;
  .select__control {
    width: 100%;
    min-width: ${(props) => (props.length === "longer" ? "13rem" : "10rem")};
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
  border: 3px solid #ec2020;
  border-radius: 4px;
  margin-top: 5px;
  .select__control {
    width: 100%;
    min-width: ${(props) => (props.length === "longer" ? "13rem" : "10rem")};
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

// ComparisonPage / StyledComparisonBars  =============================
export const StyledComparisonBars = styled.section`
  max-width: 1100px;
  margin: 7rem auto 0;
  padding: 1.5rem 0;
  @media (max-width: ${breakpoints.desk}) {
    margin: 7rem 1rem;
  }
  @media (max-width: ${breakpoints.phone}) {
    margin: 0 1rem;
  }
  .bar-heading {
    text-align: center;
    font-size: 1.2rem;
    @media (max-width: ${breakpoints.phone}) {
      font-size: 0.8rem;
    }
  }
  .bar-group {
    margin-bottom: 3rem;
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
  border: 1px solid #eee;
  p {
    display: flex;
    align-items: center;
    height: 100%;
    width: ${(props) => props.width && props.width}%;
    color: ${(props) => props.text && props.text};
    background: ${(props) => (props.bcg ? props.bcg : "mediumaquamarine")};
    padding: 0 1rem;
    @media (max-width: ${breakpoints.phone}) {
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
    @media (max-width: ${breakpoints.phone}) {
      font-size: 0.8rem;
    }
    .text-bold {
      font-weight: bold;
    }
  }
`;

// ComparisonPage / StyledRadarCont  ==================================
export const StyledRadarCont = styled.div`
  width: 90vw;
  height: 50vh;
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
`;

export const RandomPlayerContiner = styled.div`
  .comparsion {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    border: 1px solid #39204f;
    box-shadow: 0px 0px 5px;
    border-radius: 10px;
    padding: 5px;
    margin-bottom: 20px;
  }
  .continer {
    width: 100%;
    text-align: center;
  }
  .nameTag {
    text-align: center;
  }
  .vsText {
    padding-top: 50px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    text-align: center;
  }
  .img-container-side {
    display: inline-block;
    margin: 0 auto;
    align-items: center;
    display: flex;
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 2px solid;
    border-color: ${(props) => props.teamColour && props.teamColour};
    border-radius: 50%;
    overflow: hidden;
    @media (max-width: ${breakpoints.tabletLG}) {
      width: 100px;
      height: 100px;
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
`;

export const SideNav = styled.div`
  margin-top: 100px;
  height: 900px;
  border-radius: 0.5ex;
  position: sticky;
  top: -0.3em;
`;

export const Main = styled.div`
  margin-right: 10px;
`;

export const MainContent = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  min-height: 80vh;
  @media screen and (min-width: 996px) {
    margin: 4rem auto;
  }
  display: flex;
  flex-direction: row-reverse;
`;
