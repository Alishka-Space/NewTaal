import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Card, TextField, Typography } from "@mui/material";

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
  const [isEdit, setIsEdit] = useState(false);
  // const [language, setLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [teachLevel, setTeachLevel] = useState("");
  // const [conversationTopics, setConversationTopics] = useState("");
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
          height: 400,
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
                  {/* <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Language(s)
                  </Item> */}
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Proficiency
                  </Item>
                  <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Learning Purpose(s)
                  </Item>

                  {/* <Item sx={{ height: 45, fontWeight: "bold" }}>
                    Conversation Topic(s)
                  </Item> */}
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
                  {/* <Item sx={{ height: 45 }}>
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.language}
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
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item> */}

                  <Item sx={{ height: 45 }}>
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.languageProficiency}
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
                          value={proficiency}
                          onChange={(e) => setProficiency(e.target.value)}
                        />
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
                          value={teachLevel}
                          onChange={(e) => setTeachLevel(e.target.value)}
                        />
                      </Stack>
                    )}
                  </Item>
                  {/* <Item sx={{ height: 45 }}>
                    {" "}
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.conversationTopics}
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
                          value={conversationTopics}
                          onChange={(e) =>
                            setConversationTopics(e.target.value)
                          }
                        ></TextField>
                      </Stack>
                    )}
                  </Item> */}
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

LanguageInfoLearner.propTypes = {
  data: PropTypes.shape({
    language: PropTypes.string,
    proficiency: PropTypes.string,
    purpose: PropTypes.string,
    conversationTopics: PropTypes.string,
    languageProficiency: PropTypes.string,
  }).isRequired,
};

export default LanguageInfoLearner;
