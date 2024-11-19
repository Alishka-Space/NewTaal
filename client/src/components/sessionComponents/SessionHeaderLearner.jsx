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
            borderRadius: 20,
            p: 4,
            mt: 4,
            mb: 1,
            width: { xs: "100%", sm: "80%", md: 800 },
            height: { xs: "auto", md: 300 },
            bgcolor: "#C0C0C0",
          }}
          variant="elevation"
          elevation={20}
        >
          <div>
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
                <Avatar sx={{ width: 160, height: 160 }} src={data.image} />
              </Stack>

              <Stack width={500} spacing={1} justifyContent="center">
                <Item
                  sx={{
                    height: 40,
                    backgroundColor: "#E1D5E7",
                    borderRadius: 2,
                  }}
                >
                  <Typography fontWeight="bold" width="100%" variant="h6">
                    {data?.username}
                  </Typography>
                </Item>
                <Item
                  sx={{
                    height: 40,
                    backgroundColor: "#E1D5E7",
                    borderRadius: 2,
                  }}
                >
                  <Typography fontWeight="bold" width="100%" variant="h7">
                    {data?.purpose}
                  </Typography>
                </Item>
                <Item
                  sx={{
                    height: 100,
                    backgroundColor: "#E1D5E7",
                    borderRadius: 2,
                  }}
                >
                  <Typography width="100%" fontWeight="bold" variant="h8">
                    {data?.bio}
                  </Typography>
                </Item>
              </Stack>
            </Grid>
          </div>
        </Paper>
      </Grid>
    )
  );
};

export default SessionHeaderLearner;
