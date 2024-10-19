import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Card, Typography } from "@mui/material";

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

const MatchedLearners = (props) => {
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
          height: 460,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold">Matched Learners</Typography>
        </Card>

        <div>
          <Grid container p={4} spacing={2}>
            <Grid item>
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Learner 1</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Learner 2</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Learner 3</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Learner 4</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Learner 5</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 500,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45 }}>
                    <Typography width="100%" variant="h8">
                      {props?.data?.matchedLearner}
                    </Typography>
                  </Item>

                  <Item sx={{ height: 45 }}>
                    <Typography width="100%" variant="h8">
                      {props?.data?.matchedLearner}
                    </Typography>
                  </Item>

                  <Item sx={{ height: 45 }}>
                    <Typography width="100%" variant="h8">
                      {props?.data?.matchedLearner}
                    </Typography>
                  </Item>

                  <Item sx={{ height: 45 }}>
                    <Typography width="100%" variant="h8">
                      {props?.data?.matchedLearner}
                    </Typography>
                  </Item>

                  <Item sx={{ height: 45 }}>
                    <Typography width="100%" variant="h8">
                      {props?.data?.matchedLearner}
                    </Typography>
                  </Item>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
};

MatchedLearners.propTypes = {
  data: PropTypes.shape({
    matchedLearner: PropTypes.string,
  }).isRequired,
};

export default MatchedLearners;
