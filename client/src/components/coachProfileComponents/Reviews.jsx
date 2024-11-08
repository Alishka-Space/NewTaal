import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { Card, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import useFetch from "../../hooks/useFetch";

const Reviews = () => {
  const { id } = useParams();
  const [reviewsData, setReviewsData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
          width: 800,
          height: 760,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0", mb: 4 }}>
          <Typography fontWeight="bold">Reviews</Typography>
        </Card>

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      bgcolor: "#333333",
                      color: "#ffffff",
                      fontWeight: "bold",
                      width: 180,
                    }}
                  >
                    Learner Name
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#333333",
                      color: "#ffffff",
                      fontWeight: "bold",
                      width: 4,
                      textAlign: "center",
                    }}
                  >
                    Rating
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "#333333",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                  >
                    Comments
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewsData &&
                  reviewsData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          sx={{
                            bgcolor: "#f0f0f0",
                          }}
                        >
                          {row.learner_name}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            bgcolor: "#f0f0f0",
                            fontWeight: "bold",
                          }}
                        >
                          <Rating
                            name="read-only"
                            value={row.rating}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                        </TableCell>
                        <TableCell sx={{ bgcolor: "#f0f0f0" }}>
                          {row.comments}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={reviewsData ? reviewsData.length : 0}
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

export default Reviews;
