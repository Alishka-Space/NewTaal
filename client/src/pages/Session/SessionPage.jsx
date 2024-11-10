import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SessionHeaderCoach from "../../components/sessionComponents/SessionHeaderCoach";
import SessionHeaderLearner from "../../components/sessionComponents/SessionHeaderLearner";
import ScheduledSessions from "../../components/sessionComponents/ScheduledSessions";
import PreviousSessions from "../../components/sessionComponents/PreviousSessions";
import { AuthContext } from "../../context/AuthContext";
import CompletedSessions from "../../components/sessionComponents/CompletedSessions";

const SessionPage = () => {
  const { authState } = React.useContext(AuthContext);

  return (
    <div style={{ backgroundColor: "#e6e6fa", position: "relative" }}>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <Box
          sx={{
            minHeight: "100vh",
            paddingBottom: "100px",
          }}
        >
          {authState.role === "learner" ? (
            <SessionHeaderLearner />
          ) : (
            <SessionHeaderCoach />
          )}
          <ScheduledSessions />
          <CompletedSessions />
          <PreviousSessions />
        </Box>
      </Container>
    </div>
  );
};

export default SessionPage;
