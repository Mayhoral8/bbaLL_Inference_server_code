import React, { useEffect, useState } from "react";
import * as individualConstants from "../individualConstants";
import BasicPlayerInfo from "./BasicPlayerInfo";
import IndivRadar from "./IndivRadar";
import CareerTable from "./CareerTable";
import { PlayerStatWrapper, PlayerDropdown } from "./playerprofile-style";
import { fbFirestore } from "../../App/config";
import { ContainerCard } from "../../globalStyles";
import getMaxYearly from "./FireStoreGetMaxYearly";
import { FormatYearAddEnding } from "../../Shared/Functions/YearFormat";
import YearDropdown from "./YearDropDown";
import SEO from "../../Shared/SEO";

const PlayerProfile = ({ playerName, activeYear, setActiveYear, fullActiveYear, years, careerStats, setBasicInfo, setFullActiveYear }) => {
  const [yearDropped, setYearDropped] = useState(false);
  const [radarStats, setRadarStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [tableStats, setTableStats] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [maxYearly, setMaxYearly] = useState({
    assists: { name: "", value: 1 },
    blocks: { name: "", value: 1 },
    steals: { name: "", value: 1 },
    total_rebounds: { name: "", value: 1 },
  });
  useEffect(() => {
    getMaxYearly(activeYear.toString(), "players", setMaxYearly);
    handleYearDropdown(activeYear);
    fbFirestore
      .collection("max_yearly_stats")
      .doc(activeYear.toString())
      .collection("teams_players")
      .doc("players_max")
      .get()
      .then((doc) => {
        setMaxYearly(doc.data());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleYearDropdown = (year) => {
    const selectedYear = FormatYearAddEnding(year);
    setActiveYear(year);
    setFullActiveYear(selectedYear)

    // fetch data from Firestore
    fbFirestore
      .collection("player_basic_info")
      .doc(playerName.replace(/\s/g, "_"))
      .get()
      .then((doc) => {
        // player stats in table
        const basicTableStats = individualConstants.tableStats.map((stat) => {
          if (doc.data()[stat][selectedYear]) {
            return doc.data()[stat][selectedYear].toFixed(2);
          } else {
            return "-";
          }
        });

        setTableStats(basicTableStats);

        const basicRadarStats = individualConstants.radarStats.map((stat) => {
          return doc.data()[stat][selectedYear] * 100;
        });
        setRadarStats(basicRadarStats);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SEO
        title={playerName.replace('_', ' ')}
        slug={`player/${playerName}`}
      />
      <ContainerCard style={{ margin: "1rem 0" }}>
        <BasicPlayerInfo
          playerNameProp={playerName}
          setBasicInfo={setBasicInfo}
          activeYear={activeYear}
          fullActiveYear={fullActiveYear}
        />
      </ContainerCard>

      <PlayerStatWrapper>
        <ContainerCard style={{ padding: "0.5rem" }}>
          <h3 className="card-title">Career</h3>
          <CareerTable
            stats={[careerStats]}
            years={["Career"]}
            filterBy={"Career"}
          />
        </ContainerCard>

        <ContainerCard style={{ padding: "0.5rem" }}>
          <PlayerDropdown onClick={() => setYearDropped(!yearDropped)}>
            <h3 className="card-title">
              {FormatYearAddEnding(activeYear) + " "}
              <i className="fas fa-caret-down"></i>
            </h3>
            <YearDropdown
              yearDropped={yearDropped}
              years={years}
              activeYear={activeYear}
              setYearDropped={setYearDropped}
              handleYearDropdown={handleYearDropdown}
            />
          </PlayerDropdown>
          <CareerTable stats={[tableStats]} years={years} filterBy={years[0]} />
        </ContainerCard>

        <ContainerCard style={{ textAlign: "center" }}>
          <IndivRadar
            stats={radarStats}
            text={individualConstants.radarStatNames.map((text) =>
              text.replace(/_/g, " ")
            )}
            maxYearly={maxYearly}
          />
        </ContainerCard>
      </PlayerStatWrapper>
    </>
  );
};

export default PlayerProfile;
