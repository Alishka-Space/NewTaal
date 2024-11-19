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
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";

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

const Availability = (props) => {
  const [selectedSlot, setSelectedSlot] = useState([[], []]);
  const [selectedDays, selectedTimes] = selectedSlot;
  const [, setDayDropdownOpen] = useState(true);
  const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

  const availabilityFetch = useFetch(
    `/availability/update/${props.data.user_id}`,
    () => {
      alert("Availability updated successfully");
    },
  );

  const handleDayChange = (days) => {
    setSelectedSlot([days, []]);
    setDayDropdownOpen(false);
    setTimeDropdownOpen(true);
  };

  const handleTimeChange = (times) => {
    setSelectedSlot([selectedDays, times]);
  };

  const handleSubmit = () => {
    availabilityFetch.performFetch({
      method: "PATCH",
      params: { id: props.data.user_id },
      body: JSON.stringify({
        daysOfWeek: selectedDays,
        timeSlots: selectedTimes,
        toggleAvailability: true,
      }),
    });
  };

  return (
    <Grid container justifyContent="center">
      <Paper
        sx={{
          userSelect: "none",
          borderRadius: 6,
          p: 2,
          mt: 4,
          mb: 1,
          width: { xs: "100%", sm: "80%", md: 750 },
          height: 500,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold">Availability</Typography>
        </Card>

        <Box
          sx={{
            height: 320,
            width: { xs: "90%", sm: "80%", md: 680 },

            bgcolor: "#f0f0f0",
            margin: 2,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack direction="row">
            <Stack spacing={0} p={4}>
              <Item
                sx={{
                  width: { xs: "70%", sm: "80%", md: 200 },
                  fontWeight: "bold",
                  textAlign: "center",
                  bgcolor: "#333333",
                  color: "#ffffff",
                }}
              >
                Choose day(s)
              </Item>
              <FormControl sx={{ width: { xs: "70%", sm: "80%", md: 200 } }}>
                <Select
                  value={selectedDays}
                  onChange={(e) => handleDayChange(e.target.value)}
                  variant="outlined"
                  multiple
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="Monday">
                    <Checkbox checked={selectedDays.includes("Monday")} />
                    Monday
                  </MenuItem>
                  <MenuItem value="Tuesday">
                    <Checkbox checked={selectedDays.includes("Tuesday")} />
                    Tuesday
                  </MenuItem>
                  <MenuItem value="Wednesday">
                    <Checkbox checked={selectedDays.includes("Wednesday")} />
                    Wednesday
                  </MenuItem>
                  <MenuItem value="Thursday">
                    <Checkbox checked={selectedDays.includes("Thursday")} />
                    Thursday
                  </MenuItem>
                  <MenuItem value="Friday">
                    <Checkbox checked={selectedDays.includes("Friday")} />
                    Friday
                  </MenuItem>
                  <MenuItem value="Saturday">
                    <Checkbox checked={selectedDays.includes("Saturday")} />
                    Saturday
                  </MenuItem>
                  <MenuItem value="Sunday">
                    <Checkbox checked={selectedDays.includes("Sunday")} />
                    Sunday
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>

            {timeDropdownOpen && selectedDays.length > 0 && (
              <Stack spacing={0} p={4}>
                <Item
                  sx={{
                    width: { xs: "100%", sm: "80%", md: 200 },
                    fontWeight: "bold",
                    textAlign: "center",
                    bgcolor: "#333333",
                    color: "#ffffff",
                  }}
                >
                  Choose time slot(s)
                </Item>
                <FormControl sx={{ width: { xs: "100%", sm: "80%", md: 200 } }}>
                  <Select
                    value={selectedTimes}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    variant="outlined"
                    multiple
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value="00:00 - 01:00">
                      <Checkbox
                        checked={selectedTimes.includes("00:00 - 01:00")}
                      />
                      00:00 - 01:00
                    </MenuItem>
                    <MenuItem value="01:00 - 02:00">
                      <Checkbox
                        checked={selectedTimes.includes("01:00 - 02:00")}
                      />
                      01:00 - 02:00
                    </MenuItem>
                    <MenuItem value="02:00 - 03:00">
                      <Checkbox
                        checked={selectedTimes.includes("02:00 - 03:00")}
                      />
                      02:00 - 03:00
                    </MenuItem>
                    <MenuItem value="03:00 - 04:00">
                      <Checkbox
                        checked={selectedTimes.includes("03:00 - 04:00")}
                      />
                      03:00 - 04:00
                    </MenuItem>
                    <MenuItem value="04:00 - 05:00">
                      <Checkbox
                        checked={selectedTimes.includes("04:00 - 05:00")}
                      />
                      04:00 - 05:00
                    </MenuItem>
                    <MenuItem value="05:00 - 06:00">
                      <Checkbox
                        checked={selectedTimes.includes("05:00 - 06:00")}
                      />
                      05:00 - 06:00
                    </MenuItem>
                    <MenuItem value="06:00 - 07:00">
                      <Checkbox
                        checked={selectedTimes.includes("06:00 - 07:00")}
                      />
                      06:00 - 07:00
                    </MenuItem>
                    <MenuItem value="07:00 - 08:00">
                      <Checkbox
                        checked={selectedTimes.includes("07:00 - 08:00")}
                      />
                      07:00 - 08:00
                    </MenuItem>
                    <MenuItem value="08:00 - 09:00">
                      <Checkbox
                        checked={selectedTimes.includes("08:00 - 09:00")}
                      />
                      08:00 - 09:00
                    </MenuItem>
                    <MenuItem value="09:00 - 10:00">
                      <Checkbox
                        checked={selectedTimes.includes("09:00 - 10:00")}
                      />
                      09:00 - 10:00
                    </MenuItem>
                    <MenuItem value="10:00 - 11:00">
                      <Checkbox
                        checked={selectedTimes.includes("10:00 - 11:00")}
                      />
                      10:00 - 11:00
                    </MenuItem>
                    <MenuItem value="11:00 - 12:00">
                      <Checkbox
                        checked={selectedTimes.includes("11:00 - 12:00")}
                      />
                      11:00 - 12:00
                    </MenuItem>
                    <MenuItem value="12:00 - 13:00">
                      <Checkbox
                        checked={selectedTimes.includes("12:00 - 13:00")}
                      />
                      12:00 - 13:00
                    </MenuItem>
                    <MenuItem value="13:00 - 14:00">
                      <Checkbox
                        checked={selectedTimes.includes("13:00 - 14:00")}
                      />
                      13:00 - 14:00
                    </MenuItem>
                    <MenuItem value="14:00 - 15:00">
                      <Checkbox
                        checked={selectedTimes.includes("14:00 - 15:00")}
                      />
                      14:00 - 15:00
                    </MenuItem>
                    <MenuItem value="15:00 - 16:00">
                      <Checkbox
                        checked={selectedTimes.includes("15:00 - 16:00")}
                      />
                      15:00 - 16:00
                    </MenuItem>
                    <MenuItem value="16:00 - 17:00">
                      <Checkbox
                        checked={selectedTimes.includes("16:00 - 17:00")}
                      />
                      16:00 - 17:00
                    </MenuItem>
                    <MenuItem value="17:00 - 18:00">
                      <Checkbox
                        checked={selectedTimes.includes("17:00 - 18:00")}
                      />
                      17:00 - 18:00
                    </MenuItem>
                    <MenuItem value="18:00 - 19:00">
                      <Checkbox
                        checked={selectedTimes.includes("18:00 - 19:00")}
                      />
                      18:00 - 19:00
                    </MenuItem>
                    <MenuItem value="19:00 - 20:00">
                      <Checkbox
                        checked={selectedTimes.includes("19:00 - 20:00")}
                      />
                      19:00 - 20:00
                    </MenuItem>
                    <MenuItem value="20:00 - 21:00">
                      <Checkbox
                        checked={selectedTimes.includes("20:00 - 21:00")}
                      />
                      20:00 - 21:00
                    </MenuItem>
                    <MenuItem value="21:00 - 22:00">
                      <Checkbox
                        checked={selectedTimes.includes("21:00 - 22:00")}
                      />
                      21:00 - 22:00
                    </MenuItem>
                    <MenuItem value="22:00 - 23:00">
                      <Checkbox
                        checked={selectedTimes.includes("22:00 - 23:00")}
                      />
                      22:00 - 23:00
                    </MenuItem>
                    <MenuItem value="23:00 - 00:00">
                      <Checkbox
                        checked={selectedTimes.includes("23:00 - 00:00")}
                      />
                      23:00 - 00:00
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>
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

Availability.propTypes = {
  data: PropTypes.object,
};

export default Availability;
