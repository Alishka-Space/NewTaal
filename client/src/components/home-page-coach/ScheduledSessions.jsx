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
import "./ScheduledSessions.css";

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid container className="scheduled-container">
      <Paper className="scheduled-paper">
        <Card
          className="scheduled-card"
          sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0", my: 2 }}
        >
          <Typography className="scheduled-title" fontWeight="bold">
            Scheduled Sessions
          </Typography>
        </Card>

        <Box>
          <TableContainer component={Paper}>
            <Table className="scheduled-table" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="scheduled-table-header">
                    <Typography variant="body2" fontWeight="bold">
                      Learner Name
                    </Typography>
                  </TableCell>
                  <TableCell className="scheduled-table-header">
                    <Typography variant="body2" fontWeight="bold">
                      Day of Sessions
                    </Typography>
                  </TableCell>
                  <TableCell className="scheduled-table-header">
                    <Typography variant="body2" fontWeight="bold">
                      Time of Sessions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessionsData &&
                  sessionsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>
                          <Typography
                            fontSize={14}
                            onClick={() =>
                              navigate(`/learnerProfile/${row.learner_id}`)
                            }
                          >
                            <Link href="#" sx={{ color: "purple" }}>
                              {row.learner_name}
                            </Link>
                          </Typography>
                        </TableCell>
                        <TableCell className="scheduled-table-cell">
                          {row.day}
                        </TableCell>
                        <TableCell className="scheduled-table-cell">
                          {row.time}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="scheduled-pagination"
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
