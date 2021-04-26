import React, { Fragment } from "react";
import { PlayByPlayList, ListItem } from "./Overview-styles"

const PlayByPlay = ({ textToDisplay, homeColour, awayColour, currentText }) => {
  let prevTeam = '';
  let currentCount = 1;
  let quarter;
  const renderText = textToDisplay.map((text, i) => {
    let time, team, summary;

    if (text) {
      // extract time, team, quarter and summary
      time = text.split("\n")[2];
      const extractTeam = text.split("\n")[0];
      const extractQuarter = currentText !== '' ? currentText.split('\n')[0] : text.split('\n')[0];

      team = extractTeam.split('][')[0].substring(1);
      quarter = extractQuarter.split('][')[1].substring(1, 2);
      summary = textToDisplay.length >= 1 && text.split('\n').slice(3);

      // count for consecutive team events
      if (team !== prevTeam) {
        currentCount = 1;
        prevTeam = team;
      } else {
        currentCount++;
      }
      return (
        <ListItem
          currentCount={currentCount}
          colour={team === "Away" ? awayColour : homeColour}
          key={i}
        >
          <span className="time">{time}</span>
          <div className="summary-container">
            {summary.map((item, i) =>
              item !== "" ? (
                <span className="summary" key={i}>
                  {item.trim()}
                </span>
              ) : (
                  <Fragment key={i}></Fragment>
                )
            )}
          </div>
        </ListItem>
      );
    } else {
      return (
        <Fragment key={i}></Fragment>
      );
    }
  });

  return (
    <PlayByPlayList>
      <h3>{quarter > 4 ? 'Overtime' : 'Quarter'} {quarter > 4 ? '' : quarter}</h3>
      {renderText}
    </PlayByPlayList>
  );
};

export default PlayByPlay;
