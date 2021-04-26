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
        "comparison",
        "home",
      ].includes(location.pathname.split("/")[1]) ? (
        ""
      ) : (
        <Sidebar />
      )}
      <MobileNavbar />
      {children}
    </>
  );
};

export default withRouter(Layout);
