import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SessionHeaderCoach from "../../components/sessionComponents/SessionHeaderCoach";
import SessionHeaderLearner from "../../components/sessionComponents/SessionHeaderLearner";
import Sessions from "../../components/sessionComponents/Sessions";
import { AuthContext } from "../../context/AuthContext";

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
          <Sessions />
        </Box>
      </Container>
    </div>
  );
};

export default SessionPage;
