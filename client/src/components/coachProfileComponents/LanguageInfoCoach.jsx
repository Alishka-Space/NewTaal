import React, { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import useFetch from "../../hooks/useFetch";
import { useTheme } from "@mui/material/styles";

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

const LanguageInfoCoach = (props) => {
  const { performFetch } = useFetch(
    `/coach/update/${props.data._id}`,
    () => {},
  );

  const [isEdit, setIsEdit] = useState(false);
  const [proficiency, setProficiency] = useState("");
  const [teachLevel, setTeachLevel] = useState("");

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    performFetch({
      method: "PATCH",
      body: JSON.stringify({
        languageProficiency: proficiency,
        teachingLevel: teachLevel,
      }),
    });
    setIsEdit(false);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container justifyContent="center">
      <Paper
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
        <Card sx={{ p: 1, borderRadius: "10px", bgcolor: "#f0f0f0" }}>
          <Typography fontWeight="bold"> Language Information</Typography>
        </Card>

        <div>
          <Grid container p={isSmallScreen ? 2 : 4} spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  width: { xs: "90%", sm: "90%", md: 140 },
                }}
              >
                <Stack spacing={2}>
                  <Item
                    sx={{
                      height: 45,
                      fontWeight: "bold",
                    }}
                  >
                    Proficiency
                  </Item>
                  <Item
                    sx={{
                      height: 45,
                      fontWeight: "bold",
                    }}
                  >
                    Teach Level(s)
                  </Item>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={8} sm={1}>
              <Box
                sx={{
                  width: { xs: "120%", sm: "100%", md: 470 },
                }}
              >
                <Stack spacing={2}>
                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
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
                  <Item
                    sx={{
                      height: 45,
                    }}
                  >
                    {!isEdit && (
                      <Typography width="100%" variant="h8">
                        {props?.data?.teachingLevel}
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
                            teachLevel ? teachLevel : props?.data?.teachingLevel
                          }
                          onChange={(e) => setTeachLevel(e.target.value)}
                        ></TextField>
                      </Stack>
                    )}
                  </Item>
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

LanguageInfoCoach.propTypes = {
  data: PropTypes.shape({
    language: PropTypes.string,
    languageProficiency: PropTypes.string,
    teachingLevel: PropTypes.string,
    conversationTopics: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default LanguageInfoCoach;
