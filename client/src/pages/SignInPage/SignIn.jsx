import * as React from "react";
import { useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getSignUpTheme from "../shared-theme/getSignUpTheme";
import ForgotPassword from "./ForgotPassword";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  "&::before": {
    content: "''",
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  },
}));

export default function SignIn() {
  const SignUpTheme = createTheme(getSignUpTheme());
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const { error, performFetch } = useFetch("/user/login", (response) => {
    const { token, userInformation } = response;
    const { name, role, _id } = userInformation;

    login(token, name, role, _id);
    navigate(role === "learner" ? "/userhome" : "/coachhome");
  });

  const notifyError = (message) => toast.error(message);

  const validateInputs = () => {
    if (!email) {
      notifyError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      notifyError("Invalid email format");
      return false;
    }
    if (!password || password.length < 6) {
      notifyError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      performFetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    }
  };

  if (error) notifyError(error);

  return (
    <>
      <ToastContainer theme="colored" />
      <ThemeProvider theme={SignUpTheme}>
        <CssBaseline />
        <SignInContainer direction="column" justifyContent="space-between">
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    component="button"
                    type="button"
                    onClick={() => setOpen(true)}
                    variant="body2"
                    sx={{ alignSelf: "baseline" }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ForgotPassword open={open} handleClose={() => setOpen(false)} />
              <Button type="submit" fullWidth variant="contained">
                Sign in
              </Button>
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link href="/signup/" variant="body2">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Card>
        </SignInContainer>
      </ThemeProvider>
    </>
  );
}
