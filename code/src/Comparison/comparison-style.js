import { rgba } from "polished";
import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";
import backgroundImage from "../assets/images/court.jpg";

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
`
export const StyledPlayerCandidates = styled.div `

  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 3rem;
  background-color: yellow;
  @media (max-width: ${breakpoints.desk}) {
    margin: 0 auto 0;
  }
 
  @media (max-width: ${breakpoints.phone}) {
    font-size: 1.5rem;
  }

  .comparsion{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .text{
    text-align: center;
  }
  
  .header{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 50px;
  }

  .img-container {
    align-items: center;
    display: flex;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 6px solid;
    border-color: ${props=>props.teamColour && props.teamColour};
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
}
`

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
    &:hover,
    &.active {
      border-bottom: 5px solid var(--main-purple);
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
    display: flex;
    align-items: center;
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
  margin: 0 auto;
  padding: 1.5rem 0;
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

  .img-container {
    align-items: center;
    display: flex;
    width: 150px;
    height: 150px;
    object-fit: cover;

    border: 6px solid;
    border-color: ${props=>props.teamColour && props.teamColour};
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
`


// ComparisonYearSelection  ===========================================
export const StyledDropdown = styled.div`
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

// ComparisonPage / StyledRadarCont  ==================================
export const StyledRadarCont = styled.div`
  width: 90vw;
  height: 50vh;
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
`;
