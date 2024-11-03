import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Card, TextField, Typography } from "@mui/material";
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

const LanguageInfoLearner = (props) => {
  const { authState } = useContext(AuthContext);

  const { performFetch } = useFetch(
    `/learner/update/${props.data._id}`,
    () => {},
  );

  const [isEdit, setIsEdit] = useState(false);
  const [proficiency, setProficiency] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = () => {
    performFetch({
      method: "PATCH",
      body: JSON.stringify({
        languageProficiency: proficiency,
        purpose: purpose,
      }),
    });

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
          height: 280,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold"> Language Information</Typography>
        </Card>

        <div>
          <Grid container p={4} spacing={2}>
            <Grid>
              <Box
                sx={{
                  width: 200,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Proficiency
                  </Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Learning Purpose(s)
                  </Item>
                </Stack>
              </Box>
            </Grid>

            <Grid>
              <Box
                sx={{
                  width: 500,
                }}
              >
                <Stack spacing={2}>
                  <Item sx={{ height: 45 }}>
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.languageProficiency}
                      </Typography>
                    )}
                    {isEdit && (
                      <Stack>
                        <FormControl fullWidth hiddenLabel>
                          <NativeSelect
                            value={
                              proficiency
                                ? proficiency
                                : props?.data?.languageProficiency
                            }
                            onChange={(e) => setProficiency(e.target.value)}
                            variant="standard"
                            color="secondary"
                            size="small"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </NativeSelect>
                        </FormControl>
                      </Stack>
                    )}
                  </Item>
                  <Item sx={{ height: 45 }}>
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.purpose}
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
                          value={purpose ? purpose : props?.data?.purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                        />
                      </Stack>
                    )}
                  </Item>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid>
              {authState.role === "learner" && (
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={isEdit ? handleSave : handleEdit}
                >
                  {isEdit ? "Save" : "Edit"}
                </Button>
              )}
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  );
};

LanguageInfoLearner.propTypes = {
  data: PropTypes.shape({
    language: PropTypes.string,
    proficiency: PropTypes.string,
    purpose: PropTypes.string,
    conversationTopics: PropTypes.string,
    languageProficiency: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LanguageInfoLearner;
