import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { changeYear } from "Redux/actions/sharedActions";
import { changeStat } from "Redux/actions/sidebarActions";
import {
  NavbarContainer,
  NavList,
  NavbarLogo,
  NavListItem,
} from "./navbar-style";
import { navConstants } from "../../constants/nav";
import { DEFAULTYEARID } from "Constants";
import logo from "Assets/images/new-logo.png";
import SidebarSearch from "Shared/Sidebar/Components/SidebarSearch";
import MobileNavbar from "./MobileNavbar";
import { changeIsTeam } from "../../redux/actions/sidebarActions";

const Navbar = ({ changeStat, changeYear, changeIsTeam }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const [navPath, setNavPath] = useState("/");

  useEffect(() => {
    setNavPath(pathname.split("/")[1]);
  }, [location]);

  const handleLinkClick = (name) => {
    if (name === "Leaderboard") {
      changeStat({ stat: "Summary" });
    } else {
      changeStat({ stat: "Points" });
    }
    if (name === "Comparison") {
      changeIsTeam({ isTeam: false });
    }
    changeYear({ yearId: DEFAULTYEARID });
  };

  return (
    <NavbarContainer>
      {/* left */}
      <div className="navbar-left">
        <NavbarLogo to="/games">
          <img src={logo} alt="Sports Inference" />
        </NavbarLogo>
        <NavList>
          {navConstants.map((page) => {
            return (
              <NavListItem key={page.name}>
                <Link
                  to={page.url}
                  className={navPath === page.parentUrl ? "active" : "inactive"}
                  title={page.name}
                  onClick={() => handleLinkClick(page.name)}
                >
                  {page.name}
                </Link>
              </NavListItem>
            );
          })}
        </NavList>
      </div>

      {/* right */}
      <SidebarSearch />

      {/* mobile menu btn */}
      <MobileNavbar />
    </NavbarContainer>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
});

export default connect(mapStateToProps, {
  changeStat,
  changeYear,
  changeIsTeam,
})(Navbar);
