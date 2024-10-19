import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Card, Typography } from "@mui/material";

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

const Availability = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    setIsEdit(false);
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
          minWidth: 800,
          height: 600,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold">Availability</Typography>
        </Card>

        <div>
          <Grid container p={4} spacing={3}>
            <Grid item>
              <Box
                sx={{
                  width: 120,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Monday</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Tuesday</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Wednesday</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Thursday</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Friday</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Saturday</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Sunday</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>08:00-10:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>10:00-12:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>12:00-14:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>14:00-16:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>16:00-18:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>18:00-20:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>20:00-22:00</Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item>
              <Box
                sx={{
                  width: 50,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                  <Item sx={{ height: 45, fontSize: 12 }}>22:00-24:00</Item>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={isEdit ? handleSave : handleEdit}
              >
                {isEdit ? "Save" : "Edit"}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
};

Availability.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default Availability;
