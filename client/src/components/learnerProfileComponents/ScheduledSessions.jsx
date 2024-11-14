import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const ScheduledSessions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sessionsData, setSessionsData] = useState();
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState();
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [editRowIndex, setEditRowIndex] = useState(-1);

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/session/user/${id}`,
    (response) => {
      setSessionsData(response.result);
    },
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      params: id,
    });

    return cancelFetch;
  }, []);

  const handleButtonAction = (rowIndex) => {
    setEditRowIndex((prevEditIndex) =>
      prevEditIndex === rowIndex ? -1 : rowIndex,
    );
    setReviewDialogOpen(true);
    setSelectedSession(sessionsData[rowIndex]);
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
                  <TableCell>Learner Name</TableCell>
                  <TableCell>Coach Name</TableCell>
                  <TableCell>Day of Sessions</TableCell>
                  <TableCell>Time of Sessions</TableCell>
                  <TableCell>Session Status</TableCell>
                  <TableCell>Review</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessionsData &&
                  sessionsData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.learner_name}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          onClick={() =>
                            navigate(`/coachProfile/${row.coach_id}`)
                          }
                          sx={{
                            fontSize: 13,
                            fontWeight: "normal",
                            color: "text.primary",
                            marginTop: 1,
                            textAlign: "left",
                            paddingTop: 1,
                          }}
                        >
                          {row.coach_name}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.day}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        <strong>
                          <Button
                            color="secondary"
                            variant="contained"
                            size="small"
                            onClick={() => handleButtonAction(index)}
                          >
                            {editRowIndex === index ? "Edit" : "Add"}
                          </Button>
                        </strong>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Dialog
          open={reviewDialogOpen}
          onClose={() => setReviewDialogOpen(false)}
          aria-labelledby="responsive-dialog-title"
          style={{ minWidth: "500px", height: "500px" }}
        >
          <DialogTitle id="responsive-dialog-title">
            Session Feedback and Ratings
          </DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              minWidth: "400px",
            }}
          >
            <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              <span>Coach Name : </span>
              <span>{selectedSession?.coach_name}</span>
            </div>
            <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              <span>Session Day:</span>
              <span>{selectedSession?.day}</span>
            </div>
            <div style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              <span>Learner Name</span>
              <span>{selectedSession?.learner_name}</span>
            </div>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "1rem" }}>Rating</span>
              <Select
                style={{ flex: 1 }}
                value={rating}
                label="Rating"
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </div>
            <TextField
              style={{ width: "100%", marginTop: "0.5rem" }}
              label="Review"
              value={review}
              onChange={(event) => {
                setReview(event.target.value);
              }}
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setReviewDialogOpen(false);
              }}
              autoFocus
            >
              Add Review
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Grid>
  );
};

export default ScheduledSessions;
