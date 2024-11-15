import React, { useState, useContext, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const location = useLocation();
  const coach = location.state.coach || {};

  const { error, isLoading, performFetch } = useFetch(
    "/session/create",
    (response) => {
      navigate(`/session/${response.result._id}`);
      window.location.reload();
    },
  );

  const [day, setDay] = useState(coach.day || "");
  const [time, setTime] = useState(coach.time || "");
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);

  const daysOfWeek = useFetch(
    `/availability/coach/${coach.user_id}`,
    (response) => {
      setDays(response.result[0].daysOfWeek);
      setTimes(response.result[0].timeSlots);
    },
  );

  useEffect(() => {
    daysOfWeek.performFetch({
      method: "GET",
      params: { id: coach.user_id },
    });
    return daysOfWeek.cancelFetch;
  }, []);

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
                  {days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
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
                  {times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
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
