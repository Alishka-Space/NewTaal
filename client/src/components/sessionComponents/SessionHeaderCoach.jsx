import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Avatar, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const SessionHeaderCoach = () => {
  const { authState } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const { performFetch, cancelFetch } = useFetch(
    `/coach/profile/${authState.id}`,
    (response) => {
      setData(response.result);
    },
  );

  useEffect(() => {
    performFetch({
      method: "POST",
      param: authState.id,
    });
    return cancelFetch;
  }, []);

  return (
    data && (
      <Grid container justifyContent="center">
        <Paper
          sx={{
            userSelect: "none",
            borderRadius: 20,
            p: { xs: 1, md: 1 },
            mt: { xs: 2, md: 4 },
            mb: 2,
            bgcolor: "#C0C0C0",
          }}
          variant="elevation"
          elevation={20}
        >
          <Grid
            container
            p={3}
            alignItems="center"
            spacing={3}
            direction={{ xs: "column", md: "row" }}
          >
            <Stack
              direction="row"
              justifyContent="space-around"
              mb={{ xs: 1, md: 3 }}
            >
              <Avatar
                sx={{
                  width: { xs: 190, md: 250 },
                  height: { xs: 190, md: 230 },
                }}
                src={data.image}
              />
            </Stack>

            <Stack
              width={{ xs: 300, md: 400 }}
              spacing={1}
              justifyContent="center"
              alignContent="center"
            >
              <Item
                sx={{
                  height: 40,
                  backgroundColor: "#E1D5E7",
                  borderRadius: 3,
                }}
              >
                <Rating
                  name="read-only"
                  value={data.rating}
                  precision={0.5}
                  readOnly
                />
              </Item>

              <Item
                sx={{
                  height: 40,
                  backgroundColor: "#E1D5E7",
                  borderRadius: 3,
                }}
              >
                <Typography fontWeight="bold" width="100%" variant="h6">
                  {data?.username}
                </Typography>
              </Item>

              <Item
                sx={{
                  minHeight: { xs: 90, md: 100 },
                  backgroundColor: "#E1D5E7",
                  borderRadius: 5,
                }}
              >
                <Typography width="100%" variant="body3">
                  {data?.bio}
                </Typography>
              </Item>
            </Stack>
          </Grid>
        </Paper>
      </Grid>
    )
  );
};

export default SessionHeaderCoach;
