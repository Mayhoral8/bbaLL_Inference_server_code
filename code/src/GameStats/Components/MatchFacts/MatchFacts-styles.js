import styled from 'styled-components';
// Used in the MatchFacts.js
export const StyledPlots = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 4rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid silver;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  position: relative;
  .f-row {
    display: flex;
    padding-top: 8rem;
    justify-content: center;
  }
  .vertical-line {
    width: 2px;
    height: 100%;
    background: #eee;
    margin: auto;
  }
  .team-name {
    text-align: center;
    margin-bottom: 3rem;
  }
  .table-title {
    position: absolute;
    text-transform: uppercase;
    color: var(--lighter-black);
    font-size: 1.2rem;
    background: var(--white);
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    top: -1.7rem;
    padding: 1rem 2rem;
  }
  .legend {
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    display: flex;
    background: var(--white);
    padding: 1rem 0 2rem;
    .box {
      width: 20px;
      height: 10px;
      margin-right: 0.5rem;
      &.jump {
        background: #4BC0C0;
      }
      &.layup {
        background: #36A2EB;
      }
      &.dunk {
        background: #FFCE56;
      }
      &.hook {
        background: #FF6384;
      }
    }
    .legend-item {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
    }
    span {
      font-size: 0.8rem;
      color: var(--lighter-black);
    }
  }

  .table-plot-title {
    color: var(--lighter-black);
    font-size: 1.2rem;
    text-align: center;
  }
  
  .mobile-table-title {
    margin-bottom: 1rem;
    span{
      display: none;
    }
  }

  .mobile-plot-title{
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    top: 4rem;
  }

  @media(max-width: 768px) {
    border-top: none;
    margin-top: 2rem;
    .table-title {
      padding: 0;
      white-space: nowrap;
    }
    .table-title.table {
      display: none;
    }
    .legend {
      padding: 1rem 0;
    }
    .mobile-table-title{
      span{
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
  }
  @media(min-width: 768px) {
    grid-template-columns: ${({ plot }) => plot ? '' : '1fr 1rem 1fr'};
  }
`
// Used in MatchFactsPlots
export const StyledMatchFactsPlots = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 5rem 1fr 1fr;
  grid-template-areas:
    "homeDonut homeBar vline awayDonut awayBar";
  margin: auto;
  margin-top: 8rem;
  .item-1 {
    grid-area: homeDonut;
  }
  .item-2 {
    grid-area: homeBar;
  }
  .vertical-line {
    grid-area: vline;
  }
  .item-3 {
    grid-area: awayDonut;
  }
  .item-4 {
    grid-area: awayBar;
  }
  @media(max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
    "homeDonut awayDonut"
     "homeBar  awayBar";
    grid-gap: 1.5rem;
    width: 100%;
    margin-top: 5rem;
    .vertical-line {
      display:none;
    }
  }
`
// Used in MatchsTable.js
export const StyledLeaderTable = styled.div`
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding: 2rem 0;

    @media(max-width: 768px) {
    margin-bottom: 3rem;
    padding: 0;
    }
`

// Used in MatchFactsTitle.js
export const StyledTitle = styled.div`
    display: flex;
    justify-content: center;
    @media(max-width: 500px) {
        .title {
            display: none;
        }
    }
`

