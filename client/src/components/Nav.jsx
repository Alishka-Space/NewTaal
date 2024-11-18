import React from "react";
import { Link } from "react-router-dom";
import TallLogo from "../images/logosh.png";
import { useState } from "react";
import "./nav.css";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  const { authState, logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    logout();
  };
  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={TallLogo} alt="logo" className="logo-img" />
        </Link>
        <div className="logo-text">
          <Link to="/" onClick={handleLinkClick}>
            <b>TaalCoach</b>
          </Link>
        </div>
      </div>
      <nav
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        className="navbar"
      >
        <ul className="navbar-links">
          {authState.role === "learner" ? (
            <>
              <Link to="/userhome" className="navbar-link">
                Home
              </Link>
              <Link to="/about" className="navbar-link">
                About us
              </Link>
              <Link
                to={`/learnerProfile/${authState.id}`}
                className="navbar-link"
              >
                Profile
              </Link>
              <Link to={`/session/${authState.id}`} className="navbar-link">
                Sessions
              </Link>
            </>
          ) : authState.role === "coach" ? (
            <>
              <Link to={"/coachhome"} className="navbar-link">
                Home
              </Link>
              <Link to="/about" className="navbar-link">
                About us
              </Link>
              <Link to={`coachProfile/${authState.id}`} className="navbar-link">
                Profile
              </Link>
              <Link to={`/session/${authState.id}`} className="navbar-link">
                Sessions
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-link" onClick={handleLinkClick}>
                Home
              </Link>
              <Link
                to="/about"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                About us
              </Link>
            </>
          )}
          {!authState.token ? (
            <>
              <Link
                to="/signin"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                Log-in
              </Link>
              <Link
                to="/signup"
                className="navbar-link"
                onClick={handleLinkClick}
              >
                Sign-up
              </Link>
            </>
          ) : (
            <Link to="/" className="navbar-link" onClick={handleLogout}>
              Log-out
            </Link>
          )}
        </ul>
      </nav>

      <div onClick={() => setToggle((prev) => !prev)} className="header-menu">
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
    </header>
  );
};

export default Nav;
