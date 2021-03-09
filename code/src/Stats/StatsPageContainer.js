import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SEO from "../Shared/SEO";
import StatsPage from "./StatsPage";
import { StatsDiv } from "./stats-style";
import { CenteredMain } from "../globalStyles";

const StatsPageContainer = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <SEO
         title="NBA stats and analytics"
         description="NBA stats and analytics - powered by AI, Machine learning, & Statistics. Features include a leaderboard, ranking stats, fantasy-stats, salary, lineups, rosters, and game reviews. Compare between teams, players, MVPs, and champions. We aim to have the most accurate and fastest sports stats provider. We aim to have the most accurate and fastest sports stats provider."
      />
      <CenteredMain>
        <StatsDiv>
          <Switch>
            <Route path={`${path}/:teamsOrPlayers?`}>
              <StatsPage />
            </Route>
          </Switch>
        </StatsDiv>
      </CenteredMain>
    </>
  );
};

export default StatsPageContainer;
