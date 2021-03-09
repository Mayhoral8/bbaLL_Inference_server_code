import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { CenteredMain } from "../globalStyles";
import SEO from "../Shared/SEO";
import LeaderPage from "./LeaderPage";

const LeaderPageContainer = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <SEO
        title="NBA Leaderboard and rankings"
        description="NBA Leaderboard and rankings - leveraging statistics and data science. Our leaderboard displays the ranking of players & teams over the past years, within the season, within the last 10 days. The rankings include average, total, poss per 100, and efficiency. The attributes includes: points, assists, rebounds, blocks, steals, turnovers, three points, fantasy points, and +/-. We aim to have the most accurate and fastest sports stats provider."
      />
      <CenteredMain>
        <Switch>
          <Route path={`${path}/:teamsOrPlayers?`}>
            <LeaderPage />
          </Route>
        </Switch>
      </CenteredMain>
    </>
  );
};

export default LeaderPageContainer;
