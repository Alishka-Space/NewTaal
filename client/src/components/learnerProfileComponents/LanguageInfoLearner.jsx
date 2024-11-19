import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import { Button, Card, TextField, Typography } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { styled } from "@mui/material/styles";
import "./LanguageInfoLearner.css";

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
    <Grid container justifyContent="center">
      <Paper
        className="language-info-paper"
        sx={{
          userSelect: "none",
          borderRadius: 6,
          p: 2,
          mt: 3,
          mb: 1,
          width: { xs: "100%", sm: "100%", md: 750 },
          height: 270,
        }}
        variant="elevation"
        elevation={20}
      >
        <Card
          className="language-info-card"
          sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}
        >
          <Typography className="language-info-title" fontWeight="bold">
            Language Information
          </Typography>
        </Card>

        <Grid container p={4} spacing={2}>
          <Grid item xs={12} sm={4} className="proficiency-grid">
            <Box className="proficiency-box">
              <Stack spacing={2}>
                <Item className="proficiency-item">Proficiency</Item>
                <Item className="proficiency-item">Learning Purpose(s)</Item>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} className="purpose-grid">
            <Box className="purpose-box">
              <Stack spacing={2}>
                <Item className="proficiency-info">
                  {!isEdit && (
                    <Typography
                      width="100%"
                      variant="body1"
                      className="proficiency-text"
                    >
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
                <Item className="purpose-info">
                  {!isEdit && (
                    <Typography
                      width="100%"
                      variant="body1"
                      className="purpose-text"
                    >
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
                className="edit-save-button"
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
