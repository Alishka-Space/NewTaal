import React from "react";
import "./features.css";
import about from "../../../public/featuers-img/remove3.png";
import abouta from "../../../public/featuers-img/remove1.png";
import aboutb from "../../../public/featuers-img/remove2.png";

const Features = () => {
  return (
    <div className="features-div">
      <h1 className="feature-title">Our Features</h1>
      <div className="features">
        <div className="feature">
          <h3>1-on-1 Language Coaching</h3>
          <img src={about} alt="about-img" className="about-img" />
        </div>
        <div className="feature">
          <img src={abouta} alt="about-img" className="about-img" />
        </div>
        <div className="feature">
          <h3>Professional Language Coaches</h3>
          <img src={aboutb} alt="about-img" className="about-img" />
        </div>
      </div>
    </div>
  );
};

export default Features;
