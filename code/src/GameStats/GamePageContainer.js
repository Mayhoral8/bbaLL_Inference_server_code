import React from "react";
import { FullWidthMain } from "../globalStyles";
import GamePage from "./GamePage";
import SEO from "../Shared/SEO";
import { connect } from "react-redux";

const GamePageContainer = (props) => {
  return (
    <>
      <SEO
        title="NBA game analytics"
        description="NBA game analytics - powered by AI, Machine learning, & Statistics. We provide match facts, boxscores, shot types, fantasy ranking, and time series analysis. The time series analysis consists of game of runs, effective field goal percentage, fantasy scores, plays (possessions), and play by play texts. We aim to have the most accurate and fastest sports stats provider."
      />
      <FullWidthMain>
        <GamePage
          gameInfo={props.gameInfo}
          gamePbp={props.gamePbp}
          gamePlayers={props.gamePlayers}
          history = {props.history}
        />
      </FullWidthMain>
    </>
  );
};
const mapStateToProps = ({
  firestoreReducer
}) => {
  return {
    gameInfo: firestoreReducer.ordered.gameInfoJson,
    gamePbp: firestoreReducer.ordered.gamePbpJson,
    gamePlayers: firestoreReducer.ordered.gamePlayersJson
  };
};
export default connect(mapStateToProps)(GamePageContainer);
