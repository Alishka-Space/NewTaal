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
import { Card, Typography } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const PreviousSessions = () => {
  const { authState } = useContext(AuthContext);
  const [sessionsData, setSessionsData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <Typography fontWeight="bold">
            Previous and Cancelled Sessions
          </Typography>
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
                      <TableCell>{row.day}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.status}</TableCell>
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sessionsData ? sessionsData.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
};

export default PreviousSessions;
