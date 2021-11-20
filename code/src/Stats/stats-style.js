import styled from "styled-components";

export const StatsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonsAndSearchBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 1rem 0rem;
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
  }
  @media (max-width: 1023px) {
    flex-direction: column;
    font-size: 0.85rem;
  }
`;

export const StatButtonBoxWrapper = styled.div`
  display: block;
  margin: 1rem auto 2rem;

  h3 {
    margin-bottom: 1rem;
  }
  .timeline-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    max-width: 100%;
    width: 300px;
  }
  .timeline-container a {
    z-index: 2;
  }
  .timeline-container:before {
    content: '';
    background: #090979;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 2px;
    width: 100%;
    z-index: 1;
  }
  .timeline {
    background: black;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    height: 4px;
    width: 0;
  }
  .circle {
    background: var(--white);
    border-radius: 50%;
    height: 15px;
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #090979;
    z-index: 2;
    display: relative;
    cursor: pointer;
  }
  .circle.active {
    border-color: #090979;
    background-color: #090979;
  }
  @media(min-width: 968px) {
    margin: 0;
    margin-left: 4rem;
  }
`;

export const MinuteButton = styled.button`
  position:absolute;
  top: 1.5rem;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-weight: 550;
  margin-top: 1vh;
  font-size: 10.5vw;
  text-align: left;
  color: #534a91;
  user-select: none;
`;

export const StatsPlotDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0rem;
  margin: auto;

  #statsBar {
    text-align: center;
  }

  .trace.scatter .text {
    font-weight: bold;
  }
  .plot {
    overflow-x:auto;
    width: 100%;
    height: 40vh;
    min-width: 600px;
    min-height: 400px;
    margin: auto;
  }
  .plot-container {
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  @media(min-width: 568px) {
    padding: 1rem 2rem 0rem;
    .plot {
      height: 50vh;
    }
  } 
`;

export const GraphInfoDiv = styled.div`
  padding-bottom: 2rem;
  box-shadow: 0px 1px 6px rgb(9 9 121 / 70%);
  border-radius: 5px;
`

export const BarGraphDiv = styled.div`
  .plot {
    width: 100%;
    overflow-x:auto;
    .main-svg:nth-of-type(2) .infolayer .g-gtitle text tspan{
      font-size: 0.8rem;
    }
    @media(min-width: 500px) {
      .main-svg:nth-of-type(2) .infolayer .g-gtitle text tspan{
        font-size: 1.1rem;
      }
    } 
  }
`

export const GraphInstruction = styled.div`
  font-size: 0.8rem;
  text-align: right;
  margin-right: 0.8rem;
  color: #a5a5a5;
  .arrow {
    margin-left: 0.3rem;
  }
  @media(min-width:600px) {
    display: none;
  }
  background-color: red;
`

export const StatButtonPillsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
  box-shadow: 0px 1px 6px rgb(9 9 121 / 70%);
  border-radius: 5px;
  padding: 0px 10px
  background: linear-gradient(to right,#362daa,#0d93f6,#36afca);
`

export const PlotInformation = styled.div`
  padding: 1rem 3rem;
  .text {
    font-size: 20px;
    line-height: 1.5;
  }
` 