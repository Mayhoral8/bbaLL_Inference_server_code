import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router";
import {
  IndivPageDiv,
  Footer,
  TitleDiv,
  TitleContainer,
  ShotsTitle,
} from "./indiv-style";
import * as individualConstants from "./individualConstants";
import PlotContainer from "./Components/PlotContainer";
import TeamProfile from "./Components/TeamProfile";
import PlayerProfile from "./Components/PlayerProfile";
import ScrollToTopOnMount from "../Shared/ScrollToTopOnMount";
import { MobileFilterDiv } from "../Leaderboard/leader-style";
import StatSelect from "../Shared/SmallSelect/StatSelect";
import { fbFirestore } from "../App/config";
import Spinner from "../Shared/Spinner/Spinner";

const IndivPage = ({ indivStat, location }) => {
  const history = useHistory();
  const pathName = location.pathname.split("/")[2];
  const onPlayerPage = location.pathname.split("/")[1] === "player";
  const indivPath = location.pathname.split("/")[3];

  const name = pathName.replace(/_/g, " ");
  const categoryData = individualConstants.plotStats[indivStat];
  const STATS = ["Overall", "Shots", "Assists & Rebounds", "Defence"];
  const [activeYear, setActiveYear] = useState(null);
  const [fullActiveYear, setFullActiveYear] = useState(null);
  const [years, setYears] = useState([]);
  const [careerStats, setCareerStats] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (indivPath) {
      if (!STATS.includes(indivPath)) {
        history.push("/404");
      }
    }
    if (onPlayerPage) {
      fbFirestore
        .collection("player_basic_info")
        .doc(pathName.replace(/\s/g, "_"))
        .get()
        .then((doc) => {
          const yearsPlayed = Object.keys(doc.data()["games_played"]).sort();
          const lastYearPlayed = +yearsPlayed.slice(-2, -1)[0].substring(0, 4);
          setActiveYear(lastYearPlayed);
          setFullActiveYear(yearsPlayed.slice(-2, -1)[0]);
        })
        .catch((error) => {
          console.log(error);
          history.push("/404");
        });
    }
  }, []);

  if (onPlayerPage) {
    if (activeYear === null || fullActiveYear === null) {
      return <Spinner />;
    }
  }

  const setBasicInfo = (years, careerStats) => {
    setYears(years);
    setCareerStats(careerStats);
  };
  return (
    <>
      <ScrollToTopOnMount />
      <IndivPageDiv>
        {location.pathname.split("/")[1] === "player" ? (
          <PlayerProfile
            playerName={pathName}
            activeYear={activeYear}
            setActiveYear={setActiveYear}
            fullActiveYear={fullActiveYear}
            years={years}
            careerStats={careerStats}
            setBasicInfo={setBasicInfo}
            setFullActiveYear={setFullActiveYear}
          />
        ) : (
          <TeamProfile teamName={name} />
        )}
        <MobileFilterDiv>
          <StatSelect stats={STATS} indiv />
        </MobileFilterDiv>
        <PlotContainer
          name={name}
          categoryData={categoryData}
          indivStat={indivStat}
          isTeam={location.pathname.split("/")[1] === "team"}
          years={years}
        />
        {!(location.pathname.split("/")[1] === "team") && (
          <Footer>
            Top 100 players are chosen based on plus-minus scores for years
            greater than 1996, otherwise they are chosen based on points
          </Footer>
        )}
      </IndivPageDiv>
    </>
  );
};

const mapStateToProps = (state) => ({
  indivStat: state.sidebarReducer.indivStat,
  isTeam: state.sidebarReducer.isTeam,
});

export default connect(mapStateToProps)(withRouter(IndivPage));
