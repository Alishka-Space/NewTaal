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
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ScheduledSessions = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sessionsData, setSessionsData] = useState();

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

  const handleEditASession = (row) => {
    navigate("/editasession", { state: { session: row } });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container justifyContent="center">
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 6,
          p: 2,
          mt: 4,
          mb: 1,
          minWidth: { xs: "100%", md: 700 },
          width: { xs: "100%", sm: "80%", md: 750 },
          height: "auto",
        }}
        variant="elevation"
        elevation={20}
      >
        <Card
          sx={{
            p: 1,
            borderRadius: "10px",
            bgcolor: "#f0f0f0",
            my: 2,
            textAlign: "center",
          }}
        >
          <Typography fontWeight="bold">Scheduled Sessions</Typography>
        </Card>

        <Box>
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: { xs: 300, sm: 500, md: 650 },
                overflowX: "auto",
              }}
              aria-label="sticky table"
            >
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
                  sessionsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>
                          {authState.role === "coach" ? (
                            <Link to={`/learnerProfile/${row.learner_id}`}>
                              {row.learner_name}
                            </Link>
                          ) : (
                            <Link to={`/coachProfile/${row.coach_id}`}>
                              {row.coach_name}
                            </Link>
                          )}
                        </TableCell>
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => handleEditASession(row)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={sessionsData ? sessionsData.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Grid>
  );
};

export default ScheduledSessions;
