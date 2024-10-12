import React from "react";
import "./banner.css";
import banner from "../../images/banner-1.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-wrapper">
        <div className="banner-layout">
          <h1 className="banner-layout-title">TaalCoach</h1>
        </div>
        <img src={banner} alt="tall-banner" className="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
