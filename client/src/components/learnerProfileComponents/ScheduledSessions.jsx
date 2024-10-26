import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
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
import { DataGrid } from "@mui/x-data-grid";
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

  const columns = [
    {
      field: "learner_name",
      headerName: "Learner Name",
      width: 150,
      sortable: false,
    },
    {
      field: "coach_name",
      headerName: "Coach name",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Typography
          variant="body2"
          onClick={() => navigate(`/coachProfile/${params.row.coach_id}`)}
          sx={{
            fontSize: 13,
            fontWeight: "normal",
            color: "text.primary",
            marginTop: 1,
            textAlign: "left",
            paddingTop: 1,
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "day",
      headerName: "Date",
      width: 110,
      sortable: false,
    },
    {
      field: "time",
      headerName: "Time",
      width: 110,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Session Status",
      width: 160,
      sortable: false,
    },

    {
      field: "review",
      headerName: "Review",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={() => handleButtonAction(params.rowIndex)}
          >
            {editRowIndex === params.rowIndex ? "Edit" : "Add"}
          </Button>
        </strong>
      ),
    },
  ];

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
          {sessionsData && sessionsData.length > 0 && (
            <Paper sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={
                  sessionsData.map((s) => {
                    return { ...s, id: s._id };
                  }) ?? []
                }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15]}
              />
            </Paper>
          )}
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
                // Call the endpoint later to create review
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
