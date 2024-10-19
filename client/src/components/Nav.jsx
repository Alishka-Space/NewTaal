import React from "react";
import { Link } from "react-router-dom";
import TallLogo from "../images/logo-1.png";
import { useState } from "react";
import "./nav.css";
import { AuthContext } from "../context/AuthContext";

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  const { authState } = React.useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="navbar-link">
          <img src={TallLogo} alt="logo" className="logo-img" />
        </Link>
        <div className="logo-text">
          <Link to="/" className="navbar-link">
            <b>Taal</b>
            <b>Coach</b>
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
                <i className="bi bi-house-fill"></i>
                Home
              </Link>
              <Link to="/user" className="navbar-link">
                <i className="bi bi-person-plus-fill"></i>
                Users
              </Link>
              <Link to="/about" className="navbar-link">
                <i className="bi bi-bank2"></i>
                About us
              </Link>
              <Link
                to={`/userProfile/:${authState.id}`}
                className="navbar-link"
              >
                <i className="bi bi-arrow-right-square-fill"></i>
                Profile
              </Link>
            </>
          ) : authState.role === "coach" ? (
            <>
              <Link to={"/coachProfile"} className="navbar-link">
                <i className="bi bi-house-fill"></i>
                Home
              </Link>
              <Link to="/user" className="navbar-link">
                <i className="bi bi-person-plus-fill"></i>
                Users
              </Link>
              <Link to="/about" className="navbar-link">
                <i className="bi bi-bank2"></i>
                About us
              </Link>
              <Link to="/coachProfile" className="navbar-link">
                <i className="bi bi-arrow-right-square-fill"></i>
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="navbar-link">
                <i className="bi bi-house-fill"></i>
                Home
              </Link>
              <Link to="/user" className="navbar-link">
                <i className="bi bi-person-plus-fill"></i>
                Users
              </Link>
              <Link to="/about" className="navbar-link">
                <i className="bi bi-bank2"></i>
                About us
              </Link>
            </>
          )}
          {!authState.token ? (
            <>
              <Link to="/signin" className="navbar-link">
                <i className="bi bi-arrow-right-square-fill"></i>
                Log-in
              </Link>
              <Link to="/signup" className="navbar-link">
                <i className="bi bi-arrow-right-square-fill"></i>
                sign-up
              </Link>
            </>
          ) : (
            <Link to="/signout" className="navbar-link">
              <i className="bi bi-arrow-right-square-fill"></i>
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
