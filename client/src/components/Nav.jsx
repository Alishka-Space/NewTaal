import React from "react";
import { Link } from "react-router-dom";
import TallLogo from "../images/logo-1.png";
import { useState } from "react";
import "./nav.css";

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <img src={TallLogo} alt="logo" className="logo-img" />
        <div className="logo-text">
          <b>Tall</b>
          <b>Coach</b>
        </div>
      </div>
      <nav
        style={{
          clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        className="navbar"
      >
        <ul className="navbar-links">
          <Link className="navbar-link">
            <i className="bi bi-house-fill"></i>
            Home
          </Link>
          <Link className="navbar-link">
            <i className="bi bi-person-plus-fill"></i>
            Users
          </Link>
          <Link className="navbar-link">
            <i className="bi bi-bank2"></i>
            About us
          </Link>
          <Link className="navbar-link">
            <i className="bi bi-person-plus-fill"></i>
            Coaches
          </Link>
          <Link className="navbar-link">
            <i className="bi bi-house-fill"></i>
            Pricing
          </Link>
          <Link className="navbar-link">
            <i className="bi bi-arrow-right-square-fill"></i>
            Log-in
          </Link>
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
