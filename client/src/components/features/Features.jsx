import React from "react";
import "./features.css";

const Features = () => {
  return (
    <div className="features-div">
      <h1 className="feature-title">Our Features</h1>
      <div className="features">
        <div className="feature">
          <i className="bi bi-person-fill"></i>
          <h3>1-on-1 Coaching</h3>
          <p>Personalized sessions tailored to your learning style.</p>
        </div>
        <div className="feature">
          <i className="bi bi-clock"></i>
          <h3>Flexible Scheduling</h3>
          <p>Learn at your own pace with flexible session timings.</p>
        </div>
        <div className="feature">
          <i className="bi bi-globe"></i>
          <h3>Language Proficiency</h3>
          <p>Improve your language skills with expert mentors.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
