import React from "react";
import "./steps.css";
import stepOne from "../../../public/steps/step1.png";
import steptree from "../../../public/steps/step3.png";
import stepFour from "../../../public/steps/step4.png";
const Steps = () => {
  return (
    <div className="features-steps">
      <div className="steps">
        <div className="step">
          <img src={stepOne} alt="step-img" className="step-img" />
          <span>Connect with a mentor</span>
        </div>
        <div className="step">
          <img src={steptree} alt="step-img" className="step-img" />
          <span>Book your session</span>
        </div>
        <div className="step">
          <span>Start Learning</span>
          <img src={stepFour} alt="step-img" className="step-img" />
        </div>
      </div>
    </div>
  );
};

export default Steps;
