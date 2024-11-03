import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Card, Typography } from "@mui/material";
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

const Availability = () => {
  const [selectedSlot, setSelectedSlot] = useState(["", ""]);
  const [selectedDay, selectedTime] = selectedSlot;
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const handleDayChange = (day) => {
    setSelectedSlot([day, ""]);
    setTimeDropdownOpen(true);
  };

  const handleTimeChange = (time) => {
    setSelectedSlot([selectedDay, time]);
  };

  const handleSubmit = () => {
    // console.log("Selected Day and Time Slot:", selectedSlot);
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
          height: 350,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold">Availability</Typography>
        </Card>

        <Box sx={{ bgcolor: "#f0f0f0", margin: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Stack direction="row">
              <Stack spacing={0} p={4}>
                <Item
                  sx={{
                    width: 450,
                    fontWeight: "bold",
                    textAlign: "center",
                    bgcolor: "#333333",
                    color: "#ffffff",
                  }}
                >
                  Choose a day
                </Item>
                <FormControl fullWidth>
                  <Select
                    value={selectedDay}
                    onChange={(e) => handleDayChange(e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="">Select a day</MenuItem>
                    <MenuItem value="monday">Monday</MenuItem>
                    <MenuItem value="tuesday">Tuesday</MenuItem>
                    <MenuItem value="wednesday">Wednesday</MenuItem>
                    <MenuItem value="thursday">Thursday</MenuItem>
                    <MenuItem value="friday">Friday</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {timeDropdownOpen && selectedDay && (
                <Stack spacing={0} p={4}>
                  <Item
                    sx={{
                      width: 150,
                      fontWeight: "bold",
                      textAlign: "center",
                      bgcolor: "#333333",
                      color: "#ffffff",
                    }}
                  >
                    Choose a time slot
                  </Item>
                  <FormControl fullWidth>
                    <Select
                      value={selectedTime}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      variant="outlined"
                    >
                      <MenuItem value="01:00 - 02:00">01:00 - 02:00</MenuItem>
                      <MenuItem value="02:00 - 03:00">02:00 - 03:00</MenuItem>
                      <MenuItem value="03:00 - 04:00">03:00 - 04:00</MenuItem>
                      <MenuItem value="04:00 - 05:00">04:00 - 05:00</MenuItem>
                      <MenuItem value="05:00 - 06:00">05:00 - 06:00</MenuItem>
                      <MenuItem value="05:00 - 06:00">05:00 - 06:00</MenuItem>
                      <MenuItem value="06:00 - 07:00">06:00 - 07:00</MenuItem>
                      <MenuItem value="07:00 - 08:00">07:00 - 08:00</MenuItem>
                      <MenuItem value="08:00 - 09:00">08:00 - 09:00</MenuItem>
                      <MenuItem value="09:00 - 10:00">09:00 - 10:00</MenuItem>
                      <MenuItem value="10:00 - 11:00">10:00 - 11:00</MenuItem>
                      <MenuItem value="11:00 - 12:00">11:00 - 12:00</MenuItem>
                      <MenuItem value="12:00 - 13:00">12:00 - 13:00</MenuItem>
                      <MenuItem value="13:00 - 14:00">13:00 - 14:00</MenuItem>
                      <MenuItem value="14:00 - 15:00">14:00 - 15:00</MenuItem>
                      <MenuItem value="15:00 - 16:00">15:00 - 16:00</MenuItem>
                      <MenuItem value="16:00 - 17:00">16:00 - 17:00</MenuItem>
                      <MenuItem value="17:00 - 18:00">17:00 - 18:00</MenuItem>
                      <MenuItem value="18:00 - 19:00">18:00 - 19:00</MenuItem>
                      <MenuItem value="19:00 - 20:00">19:00 - 20:00</MenuItem>
                      <MenuItem value="20:00 - 21:00">20:00 - 21:00</MenuItem>
                      <MenuItem value="21:00 - 22:00">21:00 - 22:00</MenuItem>
                      <MenuItem value="22:00 - 23:00">22:00 - 23:00</MenuItem>
                      <MenuItem value="23:00 - 00:00">23:00 - 00:00</MenuItem>
                      <MenuItem value="00:00 - 01:00">00:00 - 01:00</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              )}
            </Stack>
          </Box>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="secondary"
              size="medium"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Availability;
