import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Card, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const ScheduledSessions = () => {
  const { authState } = useContext(AuthContext);
  const [sessionsData, setSessionsData] = useState();
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  const { performFetch, cancelFetch } = useFetch(
    `/session/user/${authState.id}`,
    (response) => {
      const scheduledSessions = response.result.filter(
        (item) => item.status === "scheduled",
      );
      setSessionsData(scheduledSessions);
    },
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      params: authState.id,
    });

    return cancelFetch;
  }, []);

  const handleEdit = (row) => {
    setEditRowIndex(row._id);
    setDay(row.day);
    setDay(row.time);
    setDay(row.status);
  };

  const handleSave = () => {
    performFetch({
      method: "PATCH",
      body: JSON.stringify({
        day: day,
        time: time,
        status: status,
      }),
    });

    setEditRowIndex(null);
  };

  return (
    <Grid container>
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 6,
          p: 2,
          mt: 4,
          mb: 1,
          minWidth: 800,
          height: 500,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0", my: 2 }}>
          <Typography fontWeight="bold">Scheduled Sessions</Typography>
        </Card>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {authState.role === "learner"
                      ? "Coach Name"
                      : "Learner Name"}
                  </TableCell>

                  <TableCell sx={{ fontWeight: "bold" }}>
                    Day of Sessions
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Time of Sessions
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Session Status
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessionsData &&
                  sessionsData.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {authState.role === "coach"
                          ? row.learner_name
                          : row.coach_name}
                      </TableCell>

                      <TableCell>
                        {editRowIndex === row._id ? (
                          <Stack direction="row" spacing={1}>
                            <FormControl sx={{ minWidth: 120 }}>
                              <NativeSelect
                                id="day-select"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                              >
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                              </NativeSelect>
                            </FormControl>
                          </Stack>
                        ) : (
                          <Typography>{row.day}</Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        {editRowIndex === row._id ? (
                          <Stack direction="row" spacing={1}>
                            <FormControl sx={{ minWidth: 120 }}>
                              <NativeSelect
                                id="time-select"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                              >
                                <option value="00:00 - 01:00">
                                  00:00 - 01:00
                                </option>
                                <option value="01:00 - 02:00">
                                  01:00 - 02:00
                                </option>
                                <option value="02:00 - 03:00">
                                  02:00 - 03:00
                                </option>
                                <option value="03:00 - 04:00">
                                  03:00 - 04:00
                                </option>
                                <option value="04:00 - 05:00">
                                  04:00 - 05:00
                                </option>
                                <option value="05:00 - 06:00">
                                  05:00 - 06:00
                                </option>
                                <option value="06:00 - 07:00">
                                  06:00 - 07:00
                                </option>
                                <option value="07:00 - 08:00">
                                  07:00 - 08:00
                                </option>
                                <option value="08:00 - 09:00">
                                  08:00 - 09:00
                                </option>
                                <option value="09:00 - 10:00">
                                  09:00 - 10:00
                                </option>
                                <option value="10:00 - 11:00">
                                  10:00 - 11:00
                                </option>
                                <option value="11:00 - 12:00">
                                  11:00 - 12:00
                                </option>
                                <option value="12:00 - 13:00">
                                  12:00 - 13:00
                                </option>
                                <option value="13:00 - 14:00">
                                  13:00 - 14:00
                                </option>
                                <option value="14:00 - 15:00">
                                  14:00 - 15:00
                                </option>
                                <option value="15:00 - 16:00">
                                  15:00 - 16:00
                                </option>
                                <option value="16:00 - 17:00">
                                  16:00 - 17:00
                                </option>
                                <option value="17:00 - 18:00">
                                  17:00 - 18:00
                                </option>
                                <option value="18:00 - 19:00">
                                  18:00 - 19:00
                                </option>
                                <option value="19:00 - 20:00">
                                  19:00 - 20:00
                                </option>
                                <option value="20:00 - 21:00">
                                  20:00 - 21:00
                                </option>
                                <option value="21:00 - 22:00">
                                  21:00 - 22:00
                                </option>
                                <option value="22:00 - 23:00">
                                  22:00 - 23:00
                                </option>
                                <option value="23:00 - 00:00">
                                  23:00 - 00:00
                                </option>
                              </NativeSelect>
                            </FormControl>
                          </Stack>
                        ) : (
                          <Typography>{row.time}</Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        {editRowIndex === row._id ? (
                          <Stack direction="row" spacing={1}>
                            <FormControl sx={{ minWidth: 120 }}>
                              <NativeSelect
                                id="status-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="Canceled">Canceled</option>
                                <option value="Completed">Completed</option>
                              </NativeSelect>
                            </FormControl>
                          </Stack>
                        ) : (
                          <Typography>{row.status}</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <strong>
                          <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() =>
                              editRowIndex === row._id
                                ? handleSave(row)
                                : handleEdit(row)
                            }
                          >
                            {editRowIndex === row._id ? "Save" : "Edit"}
                          </Button>
                        </strong>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            spacing={2}
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Pagination
              count={3}
              color="secondary"
              size="small"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ScheduledSessions;
