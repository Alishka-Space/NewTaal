import React from "react";
import "./steps.css";

const Steps = () => {
  return (
    <div className="features-steps">
      <div className="steps">
        <div className="step-one">
          <span>Create Your Account</span>
          <p>Sign up to get started with your personalized learning journey.</p>
        </div>
        <div className="step-two">
          <span>Connect with a Mentor</span>
          <p>Find a mentor that aligns with your goals and preferences.</p>
        </div>
        <div className="step-three">
          <span>Book Your Session</span>
          <p>Schedule a time that works best for you to begin learning.</p>
        </div>
        <div className="step-four">
          <span>Start Learning</span>
          <p>Engage in interactive lessons tailored just for you.</p>
        </div>
      </div>
    </div>
  );
};

export default Steps;
