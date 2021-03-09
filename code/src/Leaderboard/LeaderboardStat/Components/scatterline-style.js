//ScatterLinePlot Styled Component
import styled from "styled-components";

export const PlotContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlotDiv = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  margin-top: 2rem;
  /* logo size of top team  */
  .main-svg:nth-of-type(2) .layer-above .imagelayer image {
    width: 5%;
    height: 5%;
  }
  /* yaxis label */
  .main-svg:nth-of-type(2) .infolayer .g-ytitle {
    transform: translateX(-15px);
  }

  .scatter-line-plot {
    width: 100%;
    height: 100vh;
    @media(min-width: 768px) {
      height: auto;
    }
  }
`;

export const MobileYAxisTitle = styled.p`
  color: #7f7f7f;
  z-index:6;
  transform: translateY(3rem);
`;

export const ScatterGraphToolBar = styled.div`
  display: flex;
  user-select: none;
  justify-content: space-between;
  align-items: center;
  margin-right: 0.5rem;
`