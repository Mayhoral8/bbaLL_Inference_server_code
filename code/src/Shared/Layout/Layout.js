import React from "react";
import { withRouter } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import Sidebar from "../Sidebar/Sidebar";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

const Layout = ({ children, location }) => {
  const windowSize = useWindowSize();
  const breakpoint = 500;


  return (
    <>
      <Navbar />
      {windowSize < breakpoint ||
      [
        "privacy-policy",
        "terms-of-use",
        "404",
        "",
        "games",
        "home",
        "comparison",

      ].includes(location.pathname.split("/")[1]) ? (
        ""
      ) : location.pathname != '/betting' && location.pathname != '/profile' && location.pathname != '/screen-capture/home-page' && location.pathname != '/screen-capture/games-page' ? (
            <Sidebar />
      ) : null
      }
      <MobileNavbar />
      {children}
    </>
  );
};

export default withRouter(Layout);
