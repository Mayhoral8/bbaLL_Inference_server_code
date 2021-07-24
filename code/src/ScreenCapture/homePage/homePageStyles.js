import styled from "styled-components"

export const HomePageContainer = styled.div`
    margin-top: 63.992px;
    height: calc(100vh - 63.992px);
    padding: 20px 10px;
    display: flex;
    justify-content: space-between;
`

export const PlayerRanks = styled.div`
  height: auto;
`

export const FutureGames = styled.div`
`

export const FutureGameListBox = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  scrollbar-width: thin; /* "auto" or "thin" */

  @media (max-width: 1400px) {
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;
    margin-left: 0rem;
  }
`

export const FutureGameListRow = styled.div`
  display: flex;
  flex-direction: row;
`