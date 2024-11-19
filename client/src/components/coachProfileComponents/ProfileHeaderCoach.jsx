import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { Avatar, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

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

const ProfileHeaderCoach = (props) => {
  const { data } = props;

  return (
    <Grid container justifyContent="center">
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 20,
          p: 2,
          mt: 4,
          mb: 1,
          width: { xs: "100%", sm: "80%", md: 800 },
          height: { xs: "auto", md: 300 },
          bgcolor: "#C0C0C0",
        }}
        variant="elevation"
        elevation={20}
      >
        <Typography
          textAlign="center"
          fontWeight="bold"
          variant="h5"
          color="secondary"
        >
          {" "}
          Coach Profile
        </Typography>

        <div>
          <Grid
            container
            spacing={2}
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
                sx={{ height: 40, backgroundColor: "#E1D5E7", borderRadius: 2 }}
              >
                <Rating
                  name="read-only"
                  value={props?.data?.rating || 0}
                  precision={0.5}
                  readOnly
                />
              </Item>

              <Item
                sx={{ height: 40, backgroundColor: "#E1D5E7", borderRadius: 2 }}
              >
                <Typography fontWeight="bold" width="100%" variant="h6">
                  {props?.data?.username}
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
                  {props?.data?.bio}
                </Typography>
              </Item>
            </Stack>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
};

ProfileHeaderCoach.propTypes = {
  data: PropTypes.shape({
    rating: PropTypes.number,
    image: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default ProfileHeaderCoach;
