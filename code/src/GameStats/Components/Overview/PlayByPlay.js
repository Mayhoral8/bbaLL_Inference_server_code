import React, { Fragment } from "react";
import styled from "styled-components";
import { rgba } from "polished";

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

const PlayByPlayList = styled.ul`
  list-style: none;
  border: 1px solid silver;
  height: 25rem;
  overflow-y: auto;
  h3 {
    padding: 0.5rem;
  }
  @media (max-width: 996px) {
    margin-top: 2rem;
    height: 15rem;
  }
`;

const ListItem = styled.li`
  background: ${({ colour, currentCount }) =>
    colour && rgba(colour, currentCount * 0.1)};
  display: grid;
  grid-template-columns: 1fr 5fr;

  .summary-container {
    display: flex;
    flex-direction: column;
  }
  .summary:not(:first-child) {
    margin: 0.5rem 0;
  }
  .summary {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
  .time {
    padding: 0.5rem;
    text-align: center;
  }
  @media (max-width: 500px) {
    .time {
      padding: 0.3rem;
      text-align: center;
      font-size: 0.7rem;
    }
    .summary {
      font-size: 0.7rem;
      padding: 0.3rem;
    }
    .summary:not(:first-child) {
      margin: 0.2rem 0;
    }
  }
`;

export default PlayByPlay;
