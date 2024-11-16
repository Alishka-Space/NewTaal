import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Avatar, Typography } from "@mui/material";
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

const SessionHeaderLearner = () => {
  const { authState } = useContext(AuthContext);
  const [data, setData] = useState(null);

  const { performFetch, cancelFetch } = useFetch(
    `/learner/profile/${authState.id}`,
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
            borderRadius: 8,
            p: 1,
            mt: 4,
            mb: 1,
            width: "100%",
            maxWidth: 1200,
            bgcolor: "#C0C0C0",
            overflow: "hidden",
          }}
          variant="elevation"
          elevation={20}
        >
          <Grid
            container
            spacing={1}
            p={1}
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              spacing={2}
            >
              <Avatar
                sx={{
                  width: { xs: 100, sm: 150 },
                  height: { xs: 100, sm: 150 },
                  mb: { xs: 2, sm: 0 },
                }}
                src={data.image}
              />

              <Stack
                width={{ xs: "100%", sm: 500 }}
                spacing={2}
                justifyContent="center"
              >
                <Item
                  sx={{
                    backgroundColor: "#E1D5E7",
                    borderRadius: 1,
                    height: "auto",
                  }}
                >
                  <Typography fontWeight="bold" variant="h6" textAlign="center">
                    {data?.username}
                  </Typography>
                </Item>

                <Item
                  sx={{
                    backgroundColor: "#E1D5E7",
                    borderRadius: 1,
                    height: "auto",
                  }}
                >
                  <Typography fontWeight="bold" variant="h6" textAlign="center">
                    {data?.purpose}
                  </Typography>
                </Item>

                <Item
                  sx={{
                    backgroundColor: "#E1D5E7",
                    borderRadius: 2,
                    height: "auto",
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    variant="body1"
                    textAlign="center"
                  >
                    {data?.bio}
                  </Typography>
                </Item>
              </Stack>
            </Stack>
          </Grid>
        </Paper>
      </Grid>
    )
  );
};

export default SessionHeaderLearner;
