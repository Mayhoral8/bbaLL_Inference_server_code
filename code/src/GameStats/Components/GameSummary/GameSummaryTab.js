import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { changeGamesTab } from "../../../redux/actions/gamesActions";
import { GameSummaryTabWrapper} from "./GameSummary-Styles";

// TODO: move it to constants? or somewhere else
const tabs = ["overview", "stats", "match facts", "boxscore"];

const GameSummaryTab = ({ url, gameCode }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.gamesReducer.activeTab);

  const { pathname } = useLocation();
  const history = useHistory();
  const tabPath = pathname.split("/")[3];

  useEffect(() => {
    if (tabPath) {
      if (!tabs.includes(tabPath)) {
        history.push("/404");
      }
      dispatch(changeGamesTab(tabPath));
    }
  }, [tabPath]);

  const tabLink = (tab) => {
    let link;
    if (!url.includes(gameCode)) {
      link = `${url}/${gameCode}/${tab}`;
    } else {
      link = `${url}/${tab}`;
    }
    return link;
  };
  return (
    <GameSummaryTabWrapper>
      {tabs.map((tab, i) => (
        <li
          key={i}
          onClick={() => dispatch(changeGamesTab(tab))}
          className={activeTab === tab ? "isActive" : ""}
        >
          <Link to={tabLink(tab)}>{tab}</Link>
        </li>
      ))}
    </GameSummaryTabWrapper>
  );
};

export default GameSummaryTab;
