import React, { useState, useEffect, useContext } from "react";
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
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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

const EditASession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = location.state.session || {};

  const { authState } = useContext(AuthContext);

  const id = session._id;

  const { error, isLoading, performFetch } = useFetch(
    `/session/reschedule/${id}`,
    () => {},
  );

  const [day, setDay] = useState(session.day || "");
  const [time, setTime] = useState(session.time || "");

  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);

  const [sessionStatus, setSessionStatus] = useState(session.status);

  const daysOfWeek = useFetch(
    `/availability/coach/${session.coach_id}`,
    (response) => {
      setDays(response.result[0].daysOfWeek);
      setTimes(response.result[0].timeSlots);
    },
  );

  const updateSession = useFetch(`/session/update/${id}`, () => {});

  useEffect(() => {
    daysOfWeek.performFetch({
      method: "GET",
      params: { id: session.coach_id },
    });
    return daysOfWeek.cancelFetch;
  }, []);

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSessionStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (authState.role === "learner") {
      try {
        await performFetch({
          method: "PATCH",
          body: JSON.stringify({
            day,
            time,
          }),
        });
      } catch (error) {
        alert("Error: " + error);
      }
    } else {
      try {
        await updateSession.performFetch({
          method: "PATCH",
          body: JSON.stringify({
            status: sessionStatus,
          }),
        });
      } catch (error) {
        alert("Error: " + error);
      }
      navigate(`/session/${id}`);
      window.location.reload();
    }
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
              Edit the Session
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="coachName">Coach Name</FormLabel>
                <TextField
                  value={session.coach_name}
                  name="name"
                  id="name"
                  InputProps={{
                    readOnly: true,
                  }}
                />
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

              <FormControl>
                <FormLabel htmlFor="coachName">Session Status</FormLabel>
                {authState.role === "learner" ? (
                  <TextField
                    value={sessionStatus}
                    name="name"
                    id="name"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                ) : (
                  <Select
                    id="status"
                    value={sessionStatus}
                    onChange={handleStatusChange}
                    variant="outlined"
                  >
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                  </Select>
                )}
                {/* <TextField
                  value={session.status}
                  name="name"
                  id="name"
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
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

export default EditASession;
