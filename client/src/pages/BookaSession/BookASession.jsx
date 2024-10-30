import React, { useState, useContext } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const BookASession = () => {
  const { authState } = useContext(AuthContext);

  const location = useLocation();
  const coach = location.state.coach || {};

  const { error, isLoading, performFetch } = useFetch(
    "/session/create",
    () => {},
  );

  const [day, setDay] = useState(coach.day || "");
  const [time, setTime] = useState(coach.time || "");

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
            padding: "30px",
            minHeight: "100vh",
          }}
        >
          <Card variant="outlined" sx={{ marginTop: 2, borderRadius: 10 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                paddingBottom: 2,
              }}
            >
              Book a Session
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="coachName">Coach Name</FormLabel>
                <TextField value={coach.username} name="name" id="name" />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="day">Choose a Day</FormLabel>
                <Select
                  id="day"
                  value={day}
                  onChange={handleDayChange}
                  variant="outlined"
                >
                  <MenuItem value="monday">Monday</MenuItem>
                  <MenuItem value="tuesday">Tuesday</MenuItem>
                  <MenuItem value="wednesday">Wednesday</MenuItem>
                  <MenuItem value="thursday">Thursday</MenuItem>
                  <MenuItem value="friday">Friday</MenuItem>
                  <MenuItem value="saturday">Saturday</MenuItem>
                  <MenuItem value="sunday">Sunday</MenuItem>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="time">Choose a Time</FormLabel>
                <Select
                  id="time"
                  value={time}
                  onChange={handleTimeChange}
                  variant="outlined"
                >
                  <MenuItem value="00:00 - 01:00">00:00 - 01:00</MenuItem>
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
                  <MenuItem value="23:00 - 00:00">23:00 - 00:00</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                size="medium"
              >
                Save
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default BookASession;
