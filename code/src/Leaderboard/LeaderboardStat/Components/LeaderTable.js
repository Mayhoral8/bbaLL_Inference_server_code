import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TableBody, Table, TableRow, TableHead, TableBoxLeft, TableBoxMiddle, TableBoxRight, ExpandButton } from "./leadertable-style";
import { Argsort } from "Shared/Functions/Argsort";

const LeaderTable = ({ stats, data, team, tableRightName }) => {
  const history = useHistory();
  const notHome = history.location.pathname !== '/';

  // array of sorted stats
  const stats_val = [];
  stats.map(leader => stats_val.push(leader[data]));

  const sortind = Argsort(stats_val).reverse();

  // show more button states
  const [itemsToShow, setItemsToShow] = useState(5);
  const [expanded, setExpanded] = useState(false);
  const listItems = sortind;
  const dataArr = notHome ? sortind : listItems.slice(0, itemsToShow);

  // handle show more button
  const showMore = () => {
    if (itemsToShow === 5) {
      setItemsToShow(listItems.length);
      setExpanded(true);
    } else {
      setItemsToShow(5);
      setExpanded(false);
    }
  }

  return (
    <Table>
      <TableHead>
        <TableBoxLeft>Rank</TableBoxLeft>
        <TableBoxMiddle>{team ? "Team" : "Player"}</TableBoxMiddle>
        <TableBoxRight>{tableRightName}</TableBoxRight>
      </TableHead>
      <TableBody>
        {dataArr.map((indj, i) => {
          const slug = stats[indj].Name.replace(/\s/g, "_");
          const name = stats[indj].Name.replace(/_/g, " ");
          const stat = stats[indj][data];
          let roundStat = Math.round(stat * 100) / 100;
          i++;
          if (data.startsWith("Efficiency") || data.includes("Per_Poss")) {
            roundStat = Math.round(stat * 1000) / 1000;
          }

          return (
            <TableRow key={i}>
              <TableBoxLeft>{i}</TableBoxLeft>
              <TableBoxMiddle>
                <Link to={`/${team ? "team" : "player"}/${slug}`}>{name}</Link>
              </TableBoxMiddle>
              <TableBoxRight>{roundStat}</TableBoxRight>
            </TableRow>
          );
        })}
      </TableBody>
      {
        notHome
          ? null
          : <ExpandButton onClick={showMore}>
            {expanded ? <span>Show Less</span> : <span>Show All</span>}
          </ExpandButton>
      }

    </Table>
  );
};

export default LeaderTable;
