import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Card, TextField, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { formatDate } from "../../util/dateUtils";

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

const PersonalInfoCoach = (props) => {
  const { performFetch } = useFetch(
    `/coach/update/${props.data._id}`,
    () => {},
  );

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [rate, setRate] = useState("");

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    performFetch({
      method: "PATCH",
      body: JSON.stringify({
        username: name,
        rate: rate,
        dateOfBirth: dateOfBirth,
        nationality: nationality,
      }),
    });
    setIsEdit(false);
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
          height: 470,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold"> Personal Information</Typography>
        </Card>

        <div>
          <Grid container p={4} spacing={2}>
            <Grid>
              <Box
                sx={{
                  width: { xs: "90%", sm: "90%", md: 140 },
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>Name</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>E-mail</Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Nationality
                  </Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Date of Birth
                  </Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Rate (€/hour)
                  </Item>
                </Stack>
              </Box>
            </Grid>

            <Grid>
              <Box
                sx={{
                  width: { xs: "100%", sm: "100%", md: 470 },
                }}
              >
                <Stack spacing={2}>
                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.username}
                      </Typography>
                    )}
                    {isEdit && (
                      <Stack>
                        <TextField
                          hiddenLabel
                          fullWidth
                          autoFocus
                          variant="standard"
                          color="secondary"
                          size="small"
                          value={name ? name : props?.data?.username}
                          onChange={(e) => setName(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item>

                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.email}
                      </Typography>
                    )}
                    {isEdit && (
                      <Stack>
                        <TextField
                          hiddenLabel
                          fullWidth
                          variant="standard"
                          color="secondary"
                          size="small"
                          value={email ? email : props?.data?.email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item>
                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.nationality}
                      </Typography>
                    )}
                    {isEdit && (
                      <Stack>
                        <TextField
                          hiddenLabel
                          fullWidth
                          variant="standard"
                          color="secondary"
                          size="small"
                          value={
                            nationality ? nationality : props?.data.nationality
                          }
                          onChange={(e) => setNationality(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item>
                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {formatDate(props?.data?.dateOfBirth)}
                      </Typography>
                    )}
                    {isEdit && (
                      <Stack>
                        <TextField
                          hiddenLabel
                          fullWidth
                          variant="standard"
                          color="secondary"
                          size="small"
                          value={
                            dateOfBirth ? dateOfBirth : props?.data.dateOfBirth
                          }
                          onChange={(e) => setDateOfBirth(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item>
                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.rate}
                      </Typography>
                    )}
                    {isEdit && (
                      <Stack>
                        <TextField
                          hiddenLabel
                          fullWidth
                          variant="standard"
                          color="secondary"
                          size="small"
                          value={rate ? rate : props?.data?.rate}
                          onChange={(e) => setRate(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid>
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

PersonalInfoCoach.propTypes = {
  data: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    nationality: PropTypes.string,
    dateOfBirth: PropTypes.string,
    rate: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
};

export default PersonalInfoCoach;
