import styled, { createGlobalStyle } from 'styled-components';
import './fonts.css';

// global styles
export const GlobalStyle = createGlobalStyle`
  *,
  ::before,
  ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  /* custom variables */
  html {
    --grey: #b4b8c9;
    --red: #e54861;
    --penblue: #353058;
    --main-purple: #534a91;
    --main-purple: #6733D6;
    --faint-purple: #e9e8f4;
    --white: #fff;
    --light-grey: #ccc;
    --black: #333;
    --accent: #6733D6;
    --lighter-black: #444;
    --fw-bold: 550;
   
    --box-shadow-1: 0px 4px 10px rgba(83, 74, 145,0.4);
    --box-shadow-2: 0 6px 50px 0 rgba(0, 0, 0, 0.1);
    --box-shadow-3: 10px 10px 10px rgba(83, 74, 145,0.4);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --table-border: 1px solid #eee;
  }

  body {
    /* font-family: Verdana, sans-serif; */
    font-family: 'Roboto', sans-serif;
  }

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: var(--black);
  }

  .m-1 {
    margin: 1rem 0;
  }
`

export const FullWidthMain = styled.div`
  margin: 2.2rem auto;
  width: 100%;
  min-height: 80vh;
  @media screen and (min-width: 996px) {
    margin: 4rem auto;
  }
`

export const CenteredMain = styled.div`
  padding: ${({ games }) => games ? '0rem' : '0 1rem'};
  margin: 2.2rem auto;
  max-width: 1440px;
  width: 100%;
  @media screen and (min-width: 996px) {
    padding: 0 3rem;
    margin: ${({ games }) => games ? '3rem auto' : '7rem auto 4rem'};
  }
  @media screen and (min-width: 1440px) {
    padding: 0;
  }
`

export const ContainerCard = styled.div`
  background: var(--white);
  box-shadow: 0px 1px 6px rgba(0,0,0,0.08);
  /* margin: 1rem 0; */
  width: 100%;
  padding: ${({ graph }) => graph ? '1rem' : 0};

  .card-title {
    text-align: center;
    font-size: 1.5rem;
    color: #888;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
`

export const BadgeButton = styled.button`
  background: white;
  font-family: Popins;
  font-style: normal;
  font-weight: 300;
  font-size: 15px;
  justtify-content:center;
  text-align: center;
  color: #080A1E;
  border: no;
  display: flex;
  &:disabled, &:disabled:hover {
    cursor: not-allowed;
  }
  &:hover {
    cursor: pointer;
  }
  ${(props) => {
    let underLine;
    if (props.isActive) {
      underLine = `
      border-bottom: 7px solid #F8DF5E;
      `;
    }
    return underLine
  }}

  ${(props) => {
    let size;
    if (props.isActive) {
      size = `
        font-weight: bold;
      `;
    }
    return size
  }}

  a, span {
    width: 100%;
    padding: 7px;
  }

  @media(min-width: 996px) {
    a, span {
      padding: 10px 10px;
    }
  }
`

export const GraphTitle = styled.h3`
  margin: 2rem 1rem;
  color: var(--lighter-black);
  font-size: 1.3rem;
  text-align: center;
  @media(max-width: 600px) {
    font-size: 1rem;
  } 
`

export const MobileYAxisTitle = styled.p`
  color: #7f7f7f;
  z-index:1;
  font-size: ${({ leaderboard }) => leaderboard ? '' : '12px'};
  transform: ${({ leaderboard }) => leaderboard ? 'translateY(3rem)' : 'translate(0.5rem, 0rem)'};
  margin-top: ${({ leaderboard }) => leaderboard ? '0' : '1rem'};
`;

export const ButtonPillsContainer = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
  width: 100%;
`

export const StyledMatchPlotsContainer = styled.div`
  width: ${({ doughnut }) => doughnut ? '10vw' : '17vw'};
  max-width: 270px;
  height: 30vh;
  position: relative;
  @media(max-width: 1024px) {
    height: 18vh;
    width: ${({ doughnut }) => doughnut ? '15vw' : '17vw'};
  }
  @media(max-width: 500px) {
    width: 46vw;
    height: ${({ doughnut }) => doughnut ? '25vh' : '32vh'};
  }
`
