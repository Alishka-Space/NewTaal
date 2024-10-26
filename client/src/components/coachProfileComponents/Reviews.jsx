import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../../hooks/useFetch";

const Reviews = () => {
  const { id } = useParams();
  const [reviewsData, setReviewsData] = useState();

  const { performFetch, cancelFetch } = useFetch(
    `/session/user/${id}`,
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

  const columns = [
    {
      field: "day",
      headerName: "Session Date",
      width: 100,
      sortable: false,
      resizable: false,
    },
    {
      field: "learner_name",
      headerName: "Learner Name",
      width: 150,
      sortable: false,
      resizable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 80,
      type: "number",
      sortable: false,
      resizable: false,
    },
    {
      field: "review",
      headerName: "Review",
      width: 500,
      sortable: false,
      resizable: false,
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
          <Typography fontWeight="bold">Reviews</Typography>
        </Card>
        <Box>
          {reviewsData && reviewsData.length > 0 && (
            <Paper sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={
                  reviewsData.map((s) => {
                    return { ...s, id: s._id };
                  }) ?? []
                }
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 15,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 15]}
              />
            </Paper>
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Reviews;
