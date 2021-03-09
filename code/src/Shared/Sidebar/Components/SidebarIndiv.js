import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { changeIndivStat } from "../../../redux/actions/sidebarActions";
import { List, ListItem } from "../sidebar-style";

const SidebarIndiv = ({ indivStat, changeIndivStat }) => {
  const TEMPfiller = ["Overall", "Shots", "Assists & Rebounds", "Defence"];

  const { pathname } = useLocation();
  const teamOrPlayer = pathname.split("/")[1];
  const namePath = pathname.split("/")[2];
  const indivPath = pathname.split("/")[3];

  useEffect(() => {
    if (indivPath) {
      changeIndivStat({ indivStat: indivPath });
    }
  }, [pathname]);

  return (
    <List>
      {TEMPfiller.map((category) => {
        return (
          <ListItem
            key={category}
            onClick={() => changeIndivStat({ indivStat: category })}
            isActive={category === indivStat ? true : false}
          >
            <Link to={`/${teamOrPlayer}/${namePath}/${category}`}>
              {category}
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

const mapStateToProps = (state) => ({
  indivStat: state.sidebarReducer.indivStat,
});

export default connect(mapStateToProps, { changeIndivStat })(SidebarIndiv);
