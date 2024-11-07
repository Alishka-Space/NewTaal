import React from "react";
import { useState } from "react";
import "../hero-header/hero.css";
import { Link } from "react-router-dom";
import hero from "../../../public/photo/hero-chang.jpg";

const HeroHeader = () => {
  const [, setToggle] = useState(false);
  const handleLinkClick = () => {
    setToggle(false);
  };
  return (
    <div className="hero-header">
      <img src={hero} alt="hero-img" className="hero-img" />
      <Link to="/signup" onClick={handleLinkClick} className="hero-btn">
        Sign Up Now
      </Link>
    </div>
  );
};

export default HeroHeader;
