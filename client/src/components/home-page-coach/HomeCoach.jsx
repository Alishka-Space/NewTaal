import React, { useContext } from "react";
import "./homeCoach.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ScheduledSessions from "./ScheduledSessions";
import Container from "@mui/material/Container";

const HomeCoach = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVisitProfile = () => {
    navigate(`/coachProfile/${authState.id}`);
  };

  return (
    <div
      className="coach-home-page"
      style={{
        backgroundColor: "#e6e6fa",
        position: "relative",
        paddingBottom: "100px",
      }}
    >
      <div className="coach-homepage-search">
        <header className="greeting-coach">
          <h1>Hello, {authState.user}</h1>
        </header>

        <section className="button-group-coach">
          <button className="visit-profile-coach" onClick={handleVisitProfile}>
            Visit Profile
          </button>
        </section>
      </div>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <ScheduledSessions />
      </Container>
    </div>
  );
};

export default HomeCoach;
