import React, { useState, useEffect } from "react";
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

const ProfileHeader = (props) => {
  const { data } = props;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (data.rating) {
      setValue(data.rating);
    }
  }, [data.rating]);

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 20,
          p: 2,
          mt: 4,
          mb: 1,
          minWidth: 800,
          height: 300,
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
          <Grid container p={2} alignItems={"center"} spacing={2}>
            <Stack direction="row">
              <Avatar sx={{ width: 150, height: 150 }} src={data.image} />
            </Stack>

            <Stack width={500} spacing={1} justifyContent="center">
              <Item
                sx={{ height: 40, backgroundColor: "#E1D5E7", borderRadius: 1 }}
              >
                <Rating
                  name="read-only"
                  value={value}
                  precision={0.5}
                  readOnly
                  onChange={handleRatingChange}
                />
              </Item>

              <Item
                sx={{ height: 40, backgroundColor: "#E1D5E7", borderRadius: 1 }}
              >
                <Typography fontWeight="bold" width="100%" variant="h6">
                  {props?.data?.coachName}
                </Typography>
              </Item>

              <Item
                sx={{ height: 60, backgroundColor: "#E1D5E7", borderRadius: 2 }}
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

ProfileHeader.propTypes = {
  data: PropTypes.shape({
    rating: PropTypes.number,
    image: PropTypes.string,
    coachName: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default ProfileHeader;
