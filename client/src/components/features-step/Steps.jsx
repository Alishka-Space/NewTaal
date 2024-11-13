import React from "react";
import "./steps.css";

const Steps = () => {
  return (
    <div className="features-steps">
      <div className="steps">
        <div className="step-one">
          <span>Create Your Account</span>
          <p>Sign up to get started with your journey</p>
        </div>
        <div className="step-two">
          <span>Connect a Mentor</span>
          <p>Find a mentor that aligns with your goals</p>
        </div>
        <div className="step-three">
          <span className="title-step-three">Book Your Session</span>
          <p>Schedule a time that works for you</p>
        </div>
        <div className="step-four">
          <span className="title-step-four">Start Learning</span>
          <p>Engage in interactive lessons for you</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
