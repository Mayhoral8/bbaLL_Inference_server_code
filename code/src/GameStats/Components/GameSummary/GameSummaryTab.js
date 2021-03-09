import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { changeGamesTab } from "../../../redux/actions/gamesActions";

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

const GameSummaryTabWrapper = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  li {
    text-transform: uppercase;
    cursor: pointer;
    font-weight: 800;
    display: flex;
    width: calc(100% / 4);
    justify-content: center;
    border: 1px solid silver;
    align-items: center;
    text-align: center;
  }
  li:not(:last-child) {
    border-right: 0;
  }
  .isActive {
    color: var(--main-purple);
    border-bottom: 3px solid var(--main-purple);
  }
  a {
    width: 100%;
    height: 100%;
    padding: 0.7rem;
  }
  @media (max-width: 600px) {
    li {
      font-size: 0.6rem;
    }
  }
`;

export default GameSummaryTab;
