
import styled from "styled-components";
import { breakpoints } from "../constants/breakpoints.js";
import "../../src/fonts.css";

export const StyledComparisonProfileBlank = styled.section`
  max-width: 900px;
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
// ComparisonPage / StyledComparisonProfile  ==========================
export const StyledComparisonProfile = styled.section`
  max-width: 900px;
  margin: 0 20px; 0 auto;
  font-family:Ubuntu;
  padding: 1.5rem 5px;
  border: 1px solid #207EEC;
  box-shadow: 0px 0px 5px;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${breakpoints.desk}) {
    max-width: inherit;
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
    text-shadow: -2px 2px 5px rgba(57, 32, 79, 0.3);
    color: red;
    font-family: Ubuntu;
    font-style: normal;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 500;
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

export const StyledPlayerInfoAndSwitches = styled.div `
  max-width: 800px; 
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  margin: 0 auto 0 auto;
  @media (max-width: ${breakpoints.tablet}) {

  }

  @media (max-width: ${breakpoints.phone}) {
    max-width: 400px;
    margin: 0 auto 0 auto;
  }

  @media (max-width: ${breakpoints.phoneXXS}) {

  }

`;

export const StyledPlayerInfo = styled.div`
  box-shadow: ${(props) =>
        (props.location == "left" ? "0px 0px 5px rgba(32, 126, 236, 0.5)"
                                  : "0px 0px 5px rgba(236, 32, 32, 0.5)")};
  border-radius: 10px;
  padding-left: 10px;
  padding-top: 10px;
  @media (max-width: ${breakpoints.tablet}) {
    padding-left: 5px;
  }

  @media (max-width: ${breakpoints.phoneXXS}) {
    
  }

`;

export const StyleButton = styled.div`
  margin: 2rem 6rem;
  padding-top: 10px;
  padding-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  cursor: default;
  
  .button {
    display: inline-block;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    margin: 10px;
    @media (max-width: ${breakpoints.phone}) {
      font-size: 8px;
      margin: 5px;
    }
  }
  
  .left{
    border: ${(props) => 
        (props.left == true ? "2px solid #7500DE" : "none")};
    border-radius: 10px;
  }

  .right{
    border: ${(props) => 
        (props.right == true ? "2px solid #7500DE" : "none")};
    border-radius: 10px;
  }

  @media (max-width: ${breakpoints.phone}) {
    margin: 0;
  }
`;

// ComparisonPage / StyledRadarCont  ==================================
export const StyledRadarCont = styled.div`
  width: 90vw;
  height: 50vh;
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

// ComparisonPage / StyledComparisonBars  =============================
export const StyledComparisonBars = styled.section`
  width: 90vw;
  max-width: 900px;
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

export const StyledSideInfo = styled.div`

  color: ${(props) => 
            (props.location == "left" ? "#207EEC" : "#EC2020")};
  .info {
    line-height: 2;
    font-family: Ubuntu;
    font-size: 16px;
    @media(max-width: ${breakpoints.phone}) {
      font-size: 8px;
    }
    @media (max-width: ${breakpoints.phoneXXS}) {
      font-size: 1px;
    }
  }
`;