import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useFetch from "../../hooks/useFetch";

const Reviews = () => {
  const { id } = useParams();
  const [reviewsData, setReviewsData] = useState();

  const { performFetch, cancelFetch } = useFetch(
    `/review/coach/${id}`,
    (response) => {
      setReviewsData(response.result);
    },
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      params: id,
    });
    return cancelFetch;
  }, []);

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
          <Typography fontWeight="bold">Reviews</Typography>
        </Card>
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Learner Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewsData &&
                  reviewsData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.learner_name}</TableCell>
                      <TableCell>{row.rating}</TableCell>
                      <TableCell>{row.comments}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Reviews;
