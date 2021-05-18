import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import { getMonthName } from "../../../Shared/Functions/GetMonthName";
import RecentEventsItem from "./RecentEventsItem";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeGamesTab } from "../../../redux/actions/gamesActions";
import { RecentEventsListWrapper } from "./RecentEventsItemList-style";

const RecentEventsList = ({
  gameInfo,
  setSelectedGameIndex,
  selectedGameIndex,
  url,
}) => {
  const location = useLocation();
  const history = useHistory();
  const gamePath = location.pathname.split("/")[2];
  const activeTab = useSelector((state) => state.gamesReducer.activeTab);
  const dispatch = useDispatch();
  const gameCodeArr = gameInfo.map((game) => game.id);

  useEffect(() => {
    if (gamePath) {
      if (gameCodeArr.includes(gamePath)) {
        const index = findIndexFromGamePath(gamePath);
        const selectedDate =
          getMonthName(gamePath.substring(4, 6)) +
          " " +
          gamePath.substring(6, 8);
        setSelectedGameIndex(index);
        dispatch(changeGamesTab(activeTab));
        setSelectedDate(selectedDate);
      } else {
        history.push("/404");
      }
    }
  }, [location]);

  // find index of of gamePath from gameInfo
  const findIndexFromGamePath = (path) => {
    const index = gameInfo.map((e) => e.id).indexOf(path);
    return index;
  };

  // convert game code to date
  const getDateFromGameCode = (game) => {
    const gameCode = game.id;
    return (
      getMonthName(gameCode.substring(4, 6)) + " " + gameCode.substring(6, 8)
    );
  };

  const [selectedDate, setSelectedDate] = useState(
    getDateFromGameCode(gameInfo[gameInfo.length - 1])
  );

  const dateToGames = {};
  let dateList = [];

  // create dateToGames object {date: games} and dateList ["Jan 1" "Jan 2", ...]
  gameInfo.forEach((game) => {
    const date = getDateFromGameCode(game);

    if (date in dateToGames) {
      dateToGames[date].push(game);
    } else {
      dateToGames[date] = [game];
    }
    if (!dateList.includes(date)) {
      dateList.push(date);
    }
  });

  // sort dateList and get last three dates
  dateList = dateList.sort().slice(Math.max(dateList.length - 3, 0));

  // handle date selection
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  // render date buttons
  const renderDateButtons = () => {
    const buttonArr = [];
    for (const date of dateList) {
      buttonArr.push(
        <button
          key={date}
          onClick={() => handleSelectDate(date)}
          className={date === selectedDate ? "active-button" : ""}
        >
          {date}
        </button>
      );
    }
    return buttonArr;
  };

  // render games list
  const renderGamesList = () => {
    return dateToGames[selectedDate].map((game) => {
      const homeTeam = game.Home.Team;
      const awayTeam = game.Away.Team;
      const homeScore = game.Home.points;
      const awayScore = game.Away.points;
      const index = gameInfo.map((e) => e.id).indexOf(game.id);

      return (
        <div
          onClick={() => setSelectedGameIndex(index)}
          className="item-container"
          key={index}
          style={{ width: 200 }}
        >
          <Link to={`${url}/${gameInfo[index].id}/${activeTab}`}>
            <RecentEventsItem
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              homeScore={homeScore}
              awayScore={awayScore}
              index={index}
              selectedGameIndex={selectedGameIndex}
            />
          </Link>
        </div>
      );
    });
  };

  return (
    <RecentEventsListWrapper selectedGameIndex={selectedGameIndex}>
      <div className="recent-events-wrapper">
        <div className="date-select">{renderDateButtons()}</div>

        <div className="carousel">
          <Carousel numOfItems={dateToGames[selectedDate].length}>
            {renderGamesList()}
          </Carousel>
        </div>
      </div>
    </RecentEventsListWrapper>
  );
};


export default RecentEventsList;
