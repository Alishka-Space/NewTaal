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

  const { error, isLoading, performFetch } = useFetch(
    "/session/create",
    () => {},
  );

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
    alert("Error: " + error);
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

{
  /* <MenuItem value="00:00 - 01:00">00:00 - 01:00</MenuItem>
<MenuItem value="01:00 - 02:00">01:00 - 02:00</MenuItem>
<MenuItem value="02:00 - 03:00">02:00 - 03:00</MenuItem>
<MenuItem value="03:00 - 04:00">03:00 - 04:00</MenuItem>
<MenuItem value="04:00 - 05:00">04:00 - 05:00</MenuItem>
<MenuItem value="05:00 - 06:00">05:00 - 06:00</MenuItem>
<MenuItem value="06:00 - 07:00">06:00 - 07:00</MenuItem>
<MenuItem value="07:00 - 08:00">07:00 - 08:00</MenuItem>
<MenuItem value="08:00 - 09:00">08:00 - 09:00</MenuItem>
<MenuItem value="09:00 - 10:00">09:00 - 10:00</MenuItem>
<MenuItem value="10:00 - 11:00">10:00 - 11:00</MenuItem>
<MenuItem value="11:00 - 12:00">11:00 - 12:00</MenuItem>
<MenuItem value="12:00 - 13:00">12:00 - 13:00</MenuItem>
<MenuItem value="13:00 - 14:00">13:00 - 14:00</MenuItem>
<MenuItem value="14:00 - 15:00">14:00 - 15:00</MenuItem>
<MenuItem value="15:00 - 16:00">15:00 - 16:00</MenuItem>
<MenuItem value="16:00 - 17:00">16:00 - 17:00</MenuItem>
<MenuItem value="17:00 - 18:00">17:00 - 18:00</MenuItem>
<MenuItem value="18:00 - 19:00">18:00 - 19:00</MenuItem>
<MenuItem value="19:00 - 20:00">19:00 - 20:00</MenuItem>
<MenuItem value="20:00 - 21:00">20:00 - 21:00</MenuItem>
<MenuItem value="21:00 - 22:00">21:00 - 22:00</MenuItem>
<MenuItem value="22:00 - 23:00">22:00 - 23:00</MenuItem>
<MenuItem value="23:00 - 00:00">23:00 - 00:00</MenuItem> */
}
