import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Card, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

const Sessions = () => {
  const { authState } = useContext(AuthContext);

  const [data, setData] = useState(null);

  const { performFetch, cancelFetch } = useFetch(
    `/session/user/${authState.id}`,
    (response) => {
      setData(response.result);
    },
  );

  useEffect(() => {
    performFetch({
      method: "GET",
      param: authState.id,
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
          minWidth: 1000,
          height: 460,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold">Scheduled Sessions</Typography>
        </Card>

        <div>
          <Grid container p={3} spacing={2}>
            <Grid item>
              <Box
                sx={{
                  width: 150,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    {authState.role === "learner"
                      ? "Coach Name"
                      : "Learner Name"}
                  </Item>
                  {data?.map((item) => (
                    <Item sx={{ height: 45 }} key={item._id}>
                      <Typography width="100%" variant="h8">
                        {authState.role === "coach"
                          ? item.learnerName
                          : item.coachName}
                      </Typography>
                    </Item>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Day of Session
                  </Item>
                  {data?.map((item) => (
                    <Item sx={{ height: 45 }} key={item._id}>
                      <Typography width="100%" variant="h8">
                        {item.day}
                      </Typography>
                    </Item>
                  ))}
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 250,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Time of Session
                  </Item>
                  {data?.map((item) => (
                    <Item sx={{ height: 45 }} key={item._id}>
                      <Typography width="100%" variant="h8">
                        {item.time}
                      </Typography>
                    </Item>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  width: 250,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Status</Item>
                  {data?.map((item) => (
                    <Item sx={{ height: 45 }} key={item._id}>
                      <Typography width="100%" variant="h8">
                        {item.status}
                      </Typography>
                    </Item>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
};

export default Sessions;
