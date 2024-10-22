import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SessionHeaderCoach from "../../components/sessionComponents/SessionHeaderCoach";
import Sessions from "../../components/sessionComponents/Sessions";

const SessionPage = () => {
  return (
    <div style={{ backgroundColor: "#e6e6fa", position: "relative" }}>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <Box
          sx={{
            minHeight: "100vh",
            paddingBottom: "100px",
          }}
        >
          <SessionHeaderCoach />
          <Sessions />
        </Box>
      </Container>
    </div>
  );
};

export default SessionPage;
