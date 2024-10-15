import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import getSignUpTheme from "../shared-theme/getSignUpTheme";
import { GoogleIcon, FacebookIcon } from "../shared-theme/CustomIcons";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
}));

function TemplateFrame({ children }) {
  return children;
}

TemplateFrame.propTypes = {
  children: PropTypes.node,
};

export default function SignUp() {
  const SignUpTheme = createTheme(getSignUpTheme());

  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [role, setRole] = React.useState("");
  const [learnerSelected, setLearnerSelected] = useState(false);
  const [roleError, setRoleError] = React.useState(false);
  const [roleErrorMessage, setRoleErrorMessage] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(null);
  const [dateOfBirthError, setDateOfBirthError] = React.useState(false);
  const [dateOfBirthErrorMessage, setDateOfBirthErrorMessage] =
    React.useState("");
  const [nationalityError, setNationalityError] = React.useState(false);
  const [nationalityErrorMessage, setNationalityErrorMessage] =
    React.useState("");
  const [languageProficiency, setLanguageProficiency] = React.useState("");
  const [languageProficiencyError, setLanguageProficiencyError] =
    React.useState(false);
  const [languageProficiencyErrorMessage, setLanguageProficiencyErrorMessage] =
    React.useState("");
  const [languageGoals, setLanguageGoals] = React.useState("");
  const [languageGoalsError] = React.useState(false);
  const [languageGoalsErrorMessage] = React.useState("");
  const [selectedTopic, setSelectedTopic] = React.useState("");
  const [selectedTopicError] = React.useState(false);
  const [selectedTopicErrorMessage] = React.useState("");
  const [teachingLevel, setTeachingLevel] = React.useState("");
  const [teachingLevelError] = React.useState(false);
  const [teachingLevelErrorMessage] = React.useState("");

  const navigate = useNavigate();

  const onSuccess = () => {
    navigate("/signin");
  };

  const { error, performFetch, cancelFetch } = useFetch(
    "/user/create",
    onSuccess,
  );

  const validateInputs = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const nationality = document.getElementById("nationality");
    // const languageGoals = document.getElementById("languageGoals");
    // const selectedTopic = document.getElementById("selectedTopic");
    // const teachingLevel = document.getElementById("teachingLevel");

    let isValid = true;

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!role) {
      setRoleError(true);
      setRoleErrorMessage("Please select the role.");
      isValid = false;
    } else {
      setRoleError(false);
      setRoleErrorMessage("");
    }

    if (!dateOfBirth) {
      setDateOfBirthError(true);
      setDateOfBirthErrorMessage("Please enter your date of birth.");
      isValid = false;
    } else {
      setDateOfBirthError(false);
      setDateOfBirthErrorMessage("");
    }

    if (!nationality || nationality.value.length < 1) {
      setNationalityError(true);
      setNationalityErrorMessage("Nationality is required.");
      isValid = false;
    } else {
      setNationalityError(false);
      setNationalityErrorMessage("");
    }

    if (!languageProficiency) {
      setLanguageProficiencyError(true);
      setLanguageProficiencyErrorMessage("Please select your proficiency.");
      isValid = false;
    } else {
      setLanguageProficiencyError(false);
      setLanguageProficiencyErrorMessage("");
    }

    // if (!languageGoals) {
    //   setLanguageGoalsError(true);
    //   setLanguageGoalsErrorMessage("Please select your goal.");
    //   isValid = false;
    // } else {
    //   setLanguageGoalsError(false);
    //   setLanguageGoalsErrorMessage("");
    // }

    // if (!selectedTopic) {
    //   setSelectedTopicError(true);
    //   setSelectedTopicErrorMessage("Please select your topic.");
    //   isValid = false;
    // } else {
    //   setSelectedTopicError(false);
    //   setSelectedTopicErrorMessage("");
    // }

    // if (!teachingLevel) {
    //   setTeachingLevelError(true);
    //   setTeachingLevelErrorMessage("Please select your teaching level.");
    //   isValid = false;
    // } else {
    //   setTeachingLevelError(false);
    //   setTeachingLevelErrorMessage("");
    // }
    return isValid;
  };

  React.useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          user: {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            role: role,
            dateOfBirth: dateOfBirth,
            nationality: document.getElementById("nationality").value,
            languageProficiency: languageProficiency,
            // languageGoals: languageGoals,
            // selectedTopic: selectedTopic,
            // teachingLevel: teachingLevel,
          },
        }),
      });
    }
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
    if (event.target.value === "learner") {
      setLearnerSelected(true);
    } else {
      setLearnerSelected(false);
    }
  };

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };

  const handleChangeLanguageProficiency = (event) => {
    setLanguageProficiency(event.target.value);
  };

  const handleChangeLanguageGoals = (event) => {
    setLanguageGoals(event.target.value);
  };

  const handleTopicSelection = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleTeachingLevelChange = (event) => {
    setTeachingLevel(event.target.value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <TemplateFrame>
      <ThemeProvider theme={SignUpTheme}>
        <CssBaseline />
        <SignUpContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  autoFocus
                  required
                  fullWidth
                  id="name"
                  placeholder="John Doe"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateField"]}>
                    <DateField
                      required
                      fullWidth
                      id="dateOfBirth"
                      name="dateOfBirth"
                      placeholder="MM/DD/YYYY"
                      variant="outlined"
                      value={dateOfBirth}
                      onChange={handleDateOfBirthChange}
                      error={dateOfBirthError}
                      helperText={dateOfBirthErrorMessage}
                      color={dateOfBirthError ? "error" : "primary"}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="nationality">Nationality</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="nationality"
                  placeholder=""
                  name="nationality"
                  variant="outlined"
                  error={nationalityError}
                  helperText={nationalityErrorMessage}
                  color={nationalityError ? "error" : "primary"}
                />
              </FormControl>
              <FormControl>
                <FormLabel id="role-selection-label">
                  Please select your role
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="role-selection-label"
                  name="role-selection-group"
                  value={role}
                  onChange={handleChangeRole}
                >
                  <FormControlLabel
                    value="learner"
                    control={<Radio />}
                    label="Learner"
                  />
                  <FormControlLabel
                    value="coach"
                    control={<Radio />}
                    label="Coach"
                  />
                </RadioGroup>
                {roleError && (
                  <FormHelperText style={{ color: "#B30000" }}>
                    {roleErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="proficiency">
                  Language Proficiency
                </FormLabel>
                <Select
                  id="proficiency"
                  value={languageProficiency}
                  onChange={handleChangeLanguageProficiency}
                  variant="outlined"
                >
                  <MenuItem value="">Select a Proficiency</MenuItem>
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
                {languageProficiencyError && (
                  <FormHelperText style={{ color: "#B30000" }}>
                    {languageProficiencyErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth disabled={learnerSelected}>
                <FormLabel htmlFor="teaching-level">
                  Which level do you want to teach?
                </FormLabel>
                <Select
                  id="teaching-level"
                  value={teachingLevel}
                  onChange={handleTeachingLevelChange}
                  variant="outlined"
                >
                  <MenuItem value="">Select a Teaching Level</MenuItem>
                  <MenuItem value="beginner">A1 - A2</MenuItem>
                  <MenuItem value="intermediate">A2 - B1</MenuItem>
                  <MenuItem value="advanced">B1 - B2</MenuItem>
                  <MenuItem value="expert">B2 - C1</MenuItem>
                </Select>
                {teachingLevelError && (
                  <FormHelperText style={{ color: "#B30000" }}>
                    {teachingLevelErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="goals">Language Learning Goals</FormLabel>
                <Select
                  id="goals"
                  value={languageGoals}
                  onChange={handleChangeLanguageGoals}
                  variant="outlined"
                >
                  <MenuItem value="">Select Language Goals</MenuItem>
                  <MenuItem value="academic">Academic Development</MenuItem>
                  <MenuItem value="career">Career Advancement</MenuItem>
                  <MenuItem value="personal">Personal Growth</MenuItem>
                  <MenuItem value="hobbies">Hobbies and Interests</MenuItem>
                </Select>
                {languageGoalsError && (
                  <FormHelperText style={{ color: "#B30000" }}>
                    {languageGoalsErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="conversation-topics">
                  Conversation Topics
                </FormLabel>
                <Select
                  id="conversation-topics"
                  value={selectedTopic}
                  onChange={handleTopicSelection}
                  variant="outlined"
                >
                  <MenuItem value="">Select a Topic</MenuItem>
                  <MenuItem value="daily">Daily Conversations</MenuItem>
                  <MenuItem value="travel">Travel and Tourism</MenuItem>
                  <MenuItem value="career">Work and Career</MenuItem>
                  <MenuItem value="culture">Culture and Arts</MenuItem>
                  <MenuItem value="health">Health and Sports</MenuItem>
                </Select>
                {selectedTopicError && (
                  <FormHelperText style={{ color: "#B30000" }}>
                    {selectedTopicErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
              >
                Sign up
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                <span>
                  <Link
                    href="/signin/"
                    variant="body2"
                    sx={{ alignSelf: "center" }}
                  >
                    Sign in
                  </Link>
                </span>
              </Typography>
            </Box>
            <Divider>
              <Typography sx={{ color: "text.secondary" }}>or</Typography>
            </Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Google")}
                startIcon={<GoogleIcon />}
              >
                Sign up with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => alert("Sign up with Facebook")}
                startIcon={<FacebookIcon />}
              >
                Sign up with Facebook
              </Button>
            </Box>
          </Card>
        </SignUpContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
