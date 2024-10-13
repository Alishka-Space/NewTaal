import React from "react";
import "../hero-header/hero.css";
import { Link } from "react-router-dom";

const HeroHeader = () => {
  return (
    <div className="hero-header">
      <Link className="hero-btn">Sign Up Now</Link>
    </div>
  );
};

export default HeroHeader;
