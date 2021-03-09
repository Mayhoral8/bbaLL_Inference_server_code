import React, { useEffect, useState } from "react";
import {
  TeamProfileDiv,
  TeamProfileTitleDiv,
  TeamYearDropdown,
  TeamPlayerImageDiv,
  TeamPlayerImage,
  TeamPlayerDivLink,
  TeamStatWrapper,
} from "./teamprofile-style";
import { fbFirestore, fbStorage } from "../../App/config";
import { FormatYearAddEnding } from "Functions/YearFormat";
import { FormatNumberToCash } from "Functions/MoneyFormat";
import { ContainerCard } from "../../globalStyles";
import * as individualConstants from "../individualConstants";
import YearDropdown from "./YearDropDown";
import CareerTable from "./CareerTable";
import IndivRadar from "./IndivRadar";
import GetPlayerImage from "./GetPlayerImage";
import SEO from "../../Shared/SEO";

const TeamProfile = ({ teamName }) => {
  const [years, setYears] = useState([]);
  const [yearDropped, setYearDropped] = useState(false);
  const [sTeamName, setSTeamName] = useState(teamName);
  const [teamUrl, setTeamUrl] = useState("");
  const [radarStats, setRadarStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [tableStats, setTableStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [maxYearly, setMaxYearly] = useState({
    assists: { name: "", value: 1 },
    blocks: { name: "", value: 1 },
    steals: { name: "", value: 1 },
    total_rebounds: { name: "", value: 1 },
  });
  const [activeYear, setActiveYear] = useState(2020);
  const [teamPlayers, setTeamPlayers] = useState([]);
  if (sTeamName !== teamName) {
    setSTeamName(teamName);
  }
  useEffect(() => {
    getMaxYearly((activeYear - 1).toString(), "teams");
    getYearsFromFirestore();
    getTeamLogoFromStorage();
    getYearDataFromFirestore(activeYear);
  }, []);

  const getMaxYearly = (year, playersOrTeams) => {
    fbFirestore
      .collection("max_yearly_stats")
      .doc(year)
      .collection("teams_players")
      .doc(playersOrTeams)
      .get()
      .then((doc) => {
        setMaxYearly(doc.data());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getYearsFromFirestore = () => {
    fbFirestore
      .collection("team_basic_info")
      .doc(teamName)
      .collection("Years")
      .get()
      .then((snapshot) => {
        setYears(
          snapshot.docs.map((doc) => FormatYearAddEnding(doc.id)).reverse()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTeamLogoFromStorage = () => {
    fbStorage
      .ref()
      .child(`team_logo_spi/${teamName.replace(/\s/g, "_")}.png`)
      .getDownloadURL()
      .then((url) => {
        setTeamUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getYearDataFromFirestore = (year) => {
    fbFirestore
      .collection("team_basic_info")
      .doc(teamName)
      .collection("Years")
      .doc(year.toString())
      .get()
      .then((doc) => {
        setRadarStats(
          individualConstants.radarTeamStats.map((stat) => {
            if (
              ["assists", "total_rebounds", "blocks", "steals"].includes(stat)
            ) {
              return (doc.data()[stat] / doc.data().games_played) * 100;
            }
            return doc.data()[stat] * 100;
          })
        );
        setTableStats(
          individualConstants.tableTeamStats.map((stat) => {
            return (doc.data()[stat] / doc.data().games_played).toFixed(2);
          })
        );
        setTeamPlayers(
          Object.keys(doc.data().players)
            .filter((playerKey) => playerKey >= 0 && playerKey <= 5)
            .map((key) => doc.data().players[key])
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleYearChange = (year) => {
    setActiveYear(year);
    getYearDataFromFirestore(year);
  };
  return (
    <>
      <SEO
        title={teamName}
        slug={`team/${teamName.replace(/\s/,'_')}`}
      />
      <TeamProfileDiv>
        <TeamProfileTitleDiv>
          <div className="team-name-container">
            <div className="img-container">
              <img src={teamUrl} />
            </div>
            <div className="team-name">{teamName}</div>
          </div>
        </TeamProfileTitleDiv>

        <TeamStatWrapper>
          <ContainerCard style={{ padding: "0.5rem" }}>
            <TeamYearDropdown onClick={() => setYearDropped(!yearDropped)}>
              <h3 className="card-title">
                {FormatYearAddEnding(activeYear) + " "}
                <i className="fas fa-caret-down"></i>
              </h3>
              <YearDropdown
                yearDropped={yearDropped}
                years={years}
                activeYear={activeYear}
                setYearDropped={setYearDropped}
                handleYearDropdown={handleYearChange}
              />
            </TeamYearDropdown>
            <CareerTable
              stats={[tableStats]}
              years={[FormatYearAddEnding(activeYear.toString())]}
              filterBy={FormatYearAddEnding(activeYear.toString())}
            />
          </ContainerCard>

          <ContainerCard>
            <IndivRadar
              stats={radarStats}
              text={individualConstants.radarTeamStatNames.map((text) =>
                text.replace(/_/g, " ")
              )}
              maxYearly={maxYearly}
            />
          </ContainerCard>
        </TeamStatWrapper>
        <TeamPlayerImageDiv>
          {teamPlayers.map((player) => (
            <TeamPlayerImage key={player.name}>
              <TeamPlayerDivLink
                to={`/player/${player.name.replace(/\s/g, "_")}`}
              >
                <div className="img-container">
                  <GetPlayerImage playerName={player.name.replace(/\s/g, "_")} />
                </div>
                <p>{player.name.replace(/,/g, ".")}</p>
              </TeamPlayerDivLink>
              <p>Height: {player.height}</p>
              <p>Weight: {player.weight}</p>
              <p>Avg Min: {player.avg_min.toFixed(2)}</p>
              <p>Salary: {FormatNumberToCash(player.salary)}</p>
            </TeamPlayerImage>
          ))}
        </TeamPlayerImageDiv>
      </TeamProfileDiv>
    </>
  );
};
export default TeamProfile;
