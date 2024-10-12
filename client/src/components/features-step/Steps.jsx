import React from 'react'
import "./steps.css"
const Steps = () => {
  return (
    <div className="features-steps">
        <h2 className='step-title' >How It Works</h2>
        <div className="steps">
          <div className="step">
            <i className="bi bi-person-plus-fill"></i>
            <h3>Create Your Account</h3>
          </div>
          <div className="step">
            <i className="bi bi-people-fill"></i>
            <h3>Connect with a Mentor</h3>
          </div>
          <div className="step">
            <i className="bi bi-book"></i>
            <h3>Start Learning</h3>
          </div>
        </div>

    </div>

  )
}

export default Steps
