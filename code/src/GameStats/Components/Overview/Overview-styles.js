import styled from "styled-components";
import { rgba } from "polished";

// Used in Overview.js
export const OverviewWrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid silver;
  grid-gap: 1rem;
  @media (min-width: 996px) {
    grid-template-columns: 1.5fr 1fr;
  }
`

// Used in Overview.js
export const StyledHighlightWrapper = styled.div`
  border:0.5px solid #080A1E;
  box-shadow: 0 4px 2px 0px gray;
  padding-top: 1.5rem;
  h3 {
    border-bottom:0.5px solid #080A1E;
    margin-left: 2rem;
    margin-right: 2rem;
    color: var(--lighter-black);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: Popins;
    font-style: normal;
    font-weight: 600;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin-right: 0.5rem;
    }
  }
  ul {
    list-style-type: square;
    margin-left: 2.5rem;
    margin-right: 2rem;
    margin-top: 0.5rem;
    padding-bottom: 1rem;
    list-style-type: none;

  }
  ul > li {
    text-indent: -5px;
  }

  ul > li: before {
    content: "-           ";
    text-indent: -5px;
  }
  li {
    padding: 3px 0;
    font-family: Popins;
    font-style: normal;
    font-weight: 400;
  }
  @media (max-width: 568px) {
    ul {
      margin-left: 2.5rem;
    }
  }
`;

// Used in Overview.js
export const VideoResonsiveWrapper = styled.div`
  overflow:hidden;
  padding-bottom: 56.25%;
  position: relative;
  height: 0;
  border:0.5px solid #080A1E;
  box-shadow: 0 4px 2px 0px gray;
  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`
// Used in Overview.js
export const VideoNotFoundContiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vw;

  @media(min-width: 996px) {
    flex-direction: row;
  }
`
// Used in Overview.js
export const Message = styled.div`

  h1 {
    font-size: 6vw;
    text-shadow: 2px 1px 0px #7A7A7A;
    color: #353058;
  }
  h2 {
    font-size: 4vw;
    color: #333;
    margin-bottom: 2rem;
  }
  @media(min-width: 768px) {
    h1 {
      font-size: 6vw;
      text-shadow: 4px 3px 0px #7A7A7A;
      color: #353058;
    }
  }
`

// Used in toggler.js
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  outline: none;
  margin: 0 auto 0.5rem;

  span {
    margin: 0 0.5rem;
    font-size: 0.9rem;
  }

  .toggle-label {
    cursor: pointer;
    width: 40px;
    height: 21px;
    background: grey;
    display: block;
    border-radius: 40px;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 17px;
      height: 17px;
      background: var(--white);
      border-radius: 40px;
      transition: 0.3s;
      transform: ${({ toggled }) => toggled === true ? 'translateX(19px)' : 'translateX(0)'};
    }
  }

  input {
    height: 0;
    width: 0;
    visibility: hidden;
  }
`
//Used in Summary.js
export const TapsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  @media(min-width: 996px){
    grid-template-columns: 2fr 1fr;
  }
`
//Used in Summary.js
export const PlotButtonsContiner = styled.div`
  width: 95%;
  position: relative;
  margin:-13px auto 0 auto;
  justify-content: center;
  @media (min-width: 996px) {
    width:50%;
  }
  @media (min-width: 768px) and (max-width:996px) {
    width: 40%;
  }
  @media (min-width: 330px) and (max-width:450px) {
    width: 95%;
  }
  @media (min-width: 450px) and (max-width:768px) {
    width: 70%;
  }
  @media (min-width: 280px) and (max-width:330px) {
    width: 100%;
  }
`;

//Used in Summary.js
export const PlotButtons = styled.div`
  margin: 1rem auto;
  text-align: center;
  display: flex;
  width: 100%;
  justify-content:center;
  border: 1px solid #080A1E;
  box-shadow: 0 4px 2px 0px gray;
`;

//Used in Summary.js
export const SummaryOverviewWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  .mobile-hide {
    display: none;
  }
  .axis-description {
    text-align: center;
    font-size: 0.9rem;
    color: var(--lighter-black);

    background: rgba(0, 0, 0, 0.05);
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    .vertical-divider {
      margin: 0 0.5rem;
    }
  }
  @media (min-width: 996px) {
    grid-template-columns: 2fr 1fr;
    .mobile-hide {
      display: flex;
      justify-content: center;
    }
    .desktop-hide {
      display: none;
    }
    .axis-description {
      margin-top: 0rem;
    }
  }
`;

// used in ProgressBar.js
export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  background: grey;
  display: flex;
  /* margin-bottom: 1rem; */
  .bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    color: var(--white);
  }

  .home-bar {
    width: ${({ progressbar }) => {
    if (progressbar && (progressbar[0] === 0 && progressbar[1] === 0)) {
      return 50;
    } else if (progressbar) {
      return (progressbar[0] / (progressbar[0] + progressbar[1])) * 100;
    }
  }}%;
    background: ${({ homecolour }) => homecolour && homecolour};
  }

  .away-bar {
    width: ${({ progressbar }) => {
    if (progressbar && (progressbar[0] === 0 && progressbar[1] === 0)) {
      return 50;
    } else if (progressbar) {
      return (progressbar[1] / (progressbar[0] + progressbar[1])) * 100;
    }
  }}%;
    height: 2.5rem;
    background: ${({ awaycolour }) => awaycolour && awaycolour};
  }
`
//Used in PlayByPlay.js
export const PlayByPlayList = styled.ul`
  list-style: none;
  border: 1px solid silver;
  height: 25rem;
  overflow-y: auto;
  h3 {
    padding: 0.5rem;
  }
  @media (max-width: 996px) {
    margin-top: 2rem;
    height: 15rem;
  }
`;

//Used in PlayByPlay.js
export const ListItem = styled.li`
  background: ${({ colour, currentCount }) =>
    colour && rgba(colour, currentCount * 0.1)};
  display: grid;
  grid-template-columns: 1fr 5fr;

  .summary-container {
    display: flex;
    flex-direction: column;
  }
  .summary:not(:first-child) {
    margin: 0.5rem 0;
  }
  .summary {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  .time {
    padding: 0.5rem;
    text-align: center;
  }
  @media (max-width: 500px) {
    .time {
      padding: 0.3rem;
      text-align: center;
      font-size: 0.7rem;
    }
    .summary {
      font-size: 0.7rem;
      padding: 0.3rem;
    }
    .summary:not(:first-child) {
      margin: 0.2rem 0;
    }
  }
`;

export const ChartContainer = styled.div`
position: relative;
display: ${({ hide }) => (hide ? "none" : "block")};
width: 95vw;
margin: 0 auto;
max-width: 1000px;
height: 50vh;
max-height: 270px;

@media (min-width: 768px) {
  width: 91vw;
  max-height: 45vh;
  min-height: 350px;
}

@media (min-width: 996px) {
  display: ${({ hide }) => (hide ? "block" : "none")};
  width: 57vw;
  height: 50vh;
}
`;
