import React, { useState, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const BookASession = () => {
  const { authState } = useContext(AuthContext);

  const location = useLocation();
  const coach = location.state.coach || {};

  const { error, isLoading, performFetch } = useFetch("/session/create");

  const [day, setDay] = useState("monday");
  const [time, setTime] = useState("morning");

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = () => {
    performFetch({
      method: "POST",
      body: JSON.stringify({
        day,
        time,
        learner_id: authState.id,
        coach_id: coach.user_id,
      }),
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    alert(error);
  }

  return (
    <div style={{ backgroundColor: "#e6e6fa", position: "relative" }}>
      <Container maxWidth="md" style={{ position: "relative" }}>
        <Box
          sx={{
            minHeight: "100vh",
            paddingBottom: "100px",
          }}
        >
          <h1>Book a session</h1>
          <p>Choose a day</p>
          <select onChange={handleDayChange}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <p>Choose a time</p>
          <select onChange={handleTimeChange}>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
          <button onClick={handleSubmit}>Submit</button>
        </Box>
      </Container>
    </div>
  );
};

export default BookASession;
