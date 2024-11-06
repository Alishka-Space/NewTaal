import React from "react";
import "./features.css";
import about from "../../../public/featuers-img/remove3.png";
import abouta from "../../../public/featuers-img/remove1.png";
import aboutb from "../../../public/featuers-img/remove2.png";

const Features = () => {
  return (
    <div className="features-div">
      <div className="features">
        <b className="feature-title">Our Features</b>
        <div className="feature">
          <div className="feature-text">
            <span>1-on-1 sessions</span>
            <p>Learn & Speak at your own pace</p>
          </div>
          <img src={about} alt="about-img" className="about-img" />
        </div>
        <div className="feature">
          <div className="feature-text">
            <span>Flexible Scheduling</span>
            <p>TaalCoach platform`s flexible scheduling</p>
          </div>
          <img src={abouta} alt="about-img" className="about-img" />
        </div>
        <div className="feature">
          <div className="feature-text">
            <span>Professional Language Coaches</span>
            <p>designed to be as unique as each individual</p>
          </div>
          <img src={aboutb} alt="about-img" className="about-img" />
        </div>
      </div>
    </div>
  );
};

export default Features;
