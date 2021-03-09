import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TableDiv, TopGrid } from "./rightbox-style";
import { ContainerCard } from "../../globalStyles";
import LeaderTable from "../LeaderboardStat/Components/LeaderTable";
import GraphInfo from "Shared/GraphInfo/GraphInfo";
import GetPlayerImage from "../../Individual/Components/GetPlayerImage";

export const RightBox = ({ stats }) => {
  const isTotal = useSelector(state => state.sharedReducer.isTotal);
  const stat = useSelector(state => state.sidebarReducer.stat);
  const isTeam = useSelector(state => state.sidebarReducer.isTeam);

  let statsIn, tableName, table1Attr, table2Attr;
  let stat_key = stat === "Plus_Minus" ? "PLUS_MINUS" : stat;
  
  switch (isTotal) {
    case "average":
      statsIn = stats.LeaderTable.Regular_Stats[`${stat_key}_Avg`];
      table1Attr = "Average";
      table2Attr = "Rolling_Avg";
      tableName = "Averge " + stat;
      if (stat == "Three_Points") {
        tableName = "Average 3-Points";
      }
      break;
    case "total_poss":
      table1Attr = "Total_Per_Poss";
      table2Attr = "Total_Per_Poss_Last10";
      statsIn = stats.LeaderTable.Regular_Stats[`${stat_key}_TPP`];
      tableName = "Total " + stat + " / Poss";
      if (stat == "Three_Points") {
        tableName = "Total 3-Points / Poss";
      }
      break;
    case "efficiency":
      table1Attr = "Efficiency";
      table2Attr = "Efficiency_Last10";
      statsIn = stats.LeaderTable.Regular_Stats[`${stat_key}_Eff`];
      tableName = stat + " Efficiency";
      if (stat == "Three_Points") {
        tableName = "3-Points Efficiency";
      }
      break;
    default:
      table1Attr = "Total";
      table2Attr = "Total_Last10";
      statsIn = stats.LeaderTable.Regular_Stats[`${stat_key}_Total`];
      tableName = "Total " + stat;
      if (stat == "Three_Points") {
        tableName = "Total 3-Points";
      }
  }

  return (
    <>
      <ContainerCard style={{ margin: "1rem 0" }}>
        <GraphInfo plotType="leader_team_table" />
        <TopGrid>
          {statsIn.slice(0, 3).map((player, index) => {
            const slug = player.Name.replace(/\s/g, "_");
            return (
              <Link key={index} to={`/${isTeam ? "team" : "player"}/${slug}`}>
                <div className='img-container'>
                  <GetPlayerImage
                    playerName={player.Name.replace(/ /g, "_")}
                    isTeam={isTeam}
                    leaderboard
                  />
                </div>
              </Link>
            );
          })}
        </TopGrid>

        <TableDiv>
          <h3>{tableName} (Entire Season)</h3>
          <LeaderTable
            stats={statsIn}
            data={table1Attr}
            team={isTeam}
            tableRightName={tableName}
          />
        </TableDiv>
      </ContainerCard>

      <ContainerCard style={{ margin: "1rem 0" }}>
        <TableDiv>
          <h3>{tableName} (Last 10 Games)</h3>
          <LeaderTable
            stats={statsIn}
            data={table2Attr}
            team={isTeam}
            tableRightName={tableName}
          />
        </TableDiv>
      </ContainerCard>
    </>
  );
};

export default RightBox;