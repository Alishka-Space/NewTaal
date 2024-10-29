import React, { useContext } from "react";
import "./homeCoach.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ScheduledSessions from "../sessionComponents/ScheduledSessions";

const HomeCoach = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVisitProfile = () => {
    navigate(`/coachProfile/${authState.id}`);
  };

  return (
    <div className="coach-home-page">
      <div className="coach-homepage-search">
        {/* Greeting Section */}
        <header className="greeting-coach">
          <h1>Hello, {authState.user}</h1>
        </header>

        {/* Primary Buttons */}
        <section className="button-group-coach">
          <button className="visit-profile-coach" onClick={handleVisitProfile}>
            Visit Profile
          </button>
        </section>
      </div>

      {/* Scheduled Sessions */}
      <ScheduledSessions />
    </div>
  );
};

export default HomeCoach;
