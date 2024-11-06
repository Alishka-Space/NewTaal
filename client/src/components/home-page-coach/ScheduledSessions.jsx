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
import Link from "@mui/material/Link";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const ScheduledSessions = () => {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [sessionsData, setSessionsData] = useState();
  //const [editRowIndex, setEditRowIndex] = useState(null);

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
          <Typography fontWeight="bold" textAlign="center">
            Scheduled Sessions
          </Typography>
        </Card>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Learner Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Day of Sessions
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Time of Sessions
                  </TableCell>
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
                          <Typography
                            fontSize={15}
                            fontWeight="bold"
                            onClick={() =>
                              navigate(`/learnerProfile/${row.learner_id}`)
                            }
                            sx={{
                              textAlign: "left",
                              paddingTop: 1,
                            }}
                          >
                            <Link href="#">{row.learner_name}</Link>
                          </Typography>
                        </TableCell>
                        <TableCell>{row.day}</TableCell>
                        <TableCell>{row.time}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
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
