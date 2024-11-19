import React, { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import SendIcon from "@mui/icons-material/Send";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const CompletedSessions = () => {
  const { authState } = useContext(AuthContext);
  const [sessionsData, setSessionsData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState();
  const [rating, setRating] = useState();
  const [comments, setComments] = useState("");
  const [session_id, setSessionId] = useState();

  const { performFetch, cancelFetch } = useFetch(
    `/session/user/${authState.id}`,
    (response) => {
      const scheduledSessions = response.result.filter(
        (item) => item.status === "completed",
      );
      setSessionsData(scheduledSessions);
    },
  );

  const createReview = useFetch(`/review/create/${session_id}`, () => {
    setReviewDialogOpen(false);
  });

  const handleButtonAction = (rowIndex) => {
    setEditRowIndex((prevEditIndex) =>
      prevEditIndex === rowIndex ? -1 : rowIndex,
    );
    setReviewDialogOpen(true);
    setSelectedSession(sessionsData[rowIndex]);
    setSessionId(sessionsData[rowIndex]._id);
  };

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmitReview = () => {
    createReview.performFetch({
      method: "POST",
      params: session_id,
      body: JSON.stringify({
        rating: rating,
        comments: comments,
      }),
    });

    if (createReview.error) {
      alert(`Error: ${createReview.error}`);
    }
  };

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
    <Grid container justifyContent="center">
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 6,
          p: 2,
          mt: 4,
          mb: 1,
          width: { xs: "100%", sm: "80%", md: 750 },
          maxWidth: 1200,
          bgcolor: "#f8f8f8",
          overflow: "auto",
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0", my: 2 }}>
          <Typography fontWeight="bold" textAlign="center">
            Completed Sessions
          </Typography>
        </Card>

        <Box>
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 300,
                "@media (max-width: 600px)": {
                  fontSize: "0.8rem",
                },
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
                  {authState.role === "learner" && (
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Add Review
                    </TableCell>
                  )}
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
                        {authState.role === "learner" && (
                          <TableCell>
                            <Button
                              color="secondary"
                              variant="contained"
                              size="small"
                              onClick={() => handleButtonAction(index)}
                            >
                              {editRowIndex === index ? "Edit" : "Add"}
                            </Button>
                          </TableCell>
                        )}
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
            sx={{
              "@media (max-width: 600px)": {
                ".MuiTablePagination-toolbar": {
                  padding: "0 8px",
                  fontSize: "0.8rem",
                },
                ".MuiTablePagination-actions": {
                  marginRight: "8px",
                },
              },
            }}
          />
        </Box>
        <Dialog
          open={reviewDialogOpen}
          onClose={() => setReviewDialogOpen(false)}
          maxWidth="sm"
          fullWidth
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Session Feedback
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                p: 1,
                backgroundColor: "#add8e6",
              }}
            >
              <Typography fontWeight="bold" sx={{ minWidth: 120 }}>
                Coach Name:
              </Typography>
              <Typography>{selectedSession?.coach_name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                p: 1,
                backgroundColor: "#add8e6",
              }}
            >
              <Typography fontWeight="bold" sx={{ minWidth: 120 }}>
                Session Day:
              </Typography>
              <Typography>{selectedSession?.day}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ccc",
                p: 1,
                backgroundColor: "#add8e6",
              }}
            >
              <Typography fontWeight="bold" sx={{ minWidth: 120 }}>
                Learner Name:
              </Typography>
              <Typography>{selectedSession?.learner_name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                mt: 2,
                backgroundColor: "#f0f0f0",
                borderRadius: 1,
              }}
            >
              <Typography fontWeight="bold" sx={{ minWidth: 120, mr: 2 }}>
                Rate this session:
              </Typography>
              <Rating
                name="half-rating"
                defaultValue={1}
                precision={0.5}
                value={rating}
                onChange={handleChange}
              />
            </Box>
            <TextField
              fullWidth
              label="Share your review"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              multiline
              rows={4}
              sx={{
                mt: 2,
                backgroundColor: "#f0f0f0",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
            <Button
              endIcon={<SendIcon />}
              variant="contained"
              onClick={handleSubmitReview}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grid>
  );
};

export default CompletedSessions;
