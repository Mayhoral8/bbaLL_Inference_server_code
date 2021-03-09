import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HamburgerButton,
  MobileMenu,
  MobileNavbarDiv,
  NavMenuBtn,
  MobileNavbarOverlay,
  MobileMenuButtons,
  MobileSearch,
} from "./mobilenavbar-style";
import { navConstants } from "../../constants/nav";
import { changeYear } from "Redux/actions/sharedActions";
import { changeStat } from "Redux/actions/sidebarActions";
import logo from "Assets/images/new-logo.png";
import { DEFAULTYEARID } from "Constants";
import { connect } from "react-redux";
import SidebarSearch from "../Sidebar/Components/SidebarSearch";

const MobileNavbar = ({ changeStat, changeYear }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleLinkClick = () => {
    changeStat({ stat: "Points" });
    changeYear({ yearId: DEFAULTYEARID });
  };

  return (
    <>
      <MobileMenu>
        <MobileMenuButtons>
          <div className="search-btn" onClick={toggleSearch}>
            <i className="fas fa-search"></i>
          </div>

          <HamburgerButton onClick={toggleMenu} menuOpen={menuOpen}>
            <NavMenuBtn menuOpen={menuOpen}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </NavMenuBtn>
          </HamburgerButton>
        </MobileMenuButtons>

        <MobileNavbarOverlay
          onClick={toggleMenu}
          menuOpen={menuOpen}
          tabIndex={menuOpen ? 1 : -1}
        >
          <MobileNavbarDiv
            onClick={(e) => e.stopPropagation()}
            menuOpen={menuOpen}
            tabIndex={menuOpen ? 1 : -1}
          >
            <Link to="/" className="logo-container" onClick={toggleMenu}>
              <img src={logo} alt="Sports Inference" />
            </Link>
            <ul>
              {navConstants.map((nav) => (
                <li key={nav.name} onClick={toggleMenu}>
                  <NavLink
                    exact
                    to={nav.url}
                    activeClassName="active"
                    onClick={handleLinkClick}
                  >
                    {nav.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </MobileNavbarDiv>
        </MobileNavbarOverlay>
      </MobileMenu>
      {searchOpen && (
        <MobileSearch searchOpen={searchOpen}>
          <SidebarSearch
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
        </MobileSearch>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  stat: state.sidebarReducer.stat,
});

export default connect(mapStateToProps, { changeStat, changeYear })(
  MobileNavbar
);
