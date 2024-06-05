import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import NamedContainer from "../../components/common/NamedContainer";
import IconButton from "@mui/material/IconButton";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import logo from "../../assets/logo-clear.png";

import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";

function Login(props) {
  const theme = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const redirectedDueTo403 = localStorage.getItem("redirectedDueTo403");
    if (redirectedDueTo403) {
      setSnackbarText("Unauthorized access, please login to gain access!");
      setOpenSnackbar(true);
      localStorage.removeItem("redirectedDueTo403");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/login",
        {},
        {
          withCredentials: true,
          auth: {
            username: username,
            password: password,
          },
        }
      );
      localStorage.setItem("isAuthenticated", true);
      navigate("/");
    } catch (error) {
      setUsername("");
      setPassword("");
      setSnackbarText("Incorrect Username or Password!");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid
        container
        sx={{
          height: "100vh",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexGrow: "1",
          background:
            theme.palette.mode === "light"
              ? `linear-gradient(
                180deg, 
                #87CEEB 0%, /* Soft Sky Blue */
                #E6E6FA 50%, /* Gentle Lavender */
                #FFB6C1 100% /* Pastel Pink */
              )`
              : `linear-gradient(
                180deg,
                #0f4c81 0%,    /* Deep blue at the top */
                #1e3b5a 50%,   /* Mid-tone blue in the middle */
                #2c3e50 100%   /* Dark slate grey at the bottom */
              )`,
        }}
      >
        <Grid item lg={3} md={8} xs={8}>
          <NamedContainer
            overridetitle
            title={
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={logo} alt="Logo" style={{ width: "150px", marginBottom: "10px" }} />
                <Typography variant="h3" fontWeight="600">
                  Login
                </Typography>
              </Box>
            }
            paperSx={{
              backgroundColor: theme.palette.mode === "light" ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(5px)",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0px 0px 35px 12px rgba(0,0,0,0.25)"
                  : "0px 0px 35px 12px rgba(255,255,255, 0.25)",
              borderRadius: "10px",
              height: "70vh",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "90%",
                  justifyContent: "space-evenly",
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleLogin}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
                >
                  <Typography variant="h3" gutterBottom component={"div"} fontWeight="600" sx={{ textAlign: "center" }}>
                    Welcome Back!
                  </Typography>
                  <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 2, width: "80%" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 2, width: "80%" }}
                  />
                  <Button type="submit" variant="contained">
                    Login
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "10%" }}
              >
                <IconButton size="small" onClick={props.toggleTheme}>
                  {theme.palette.mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Box>
            </Box>
          </NamedContainer>
        </Grid>
      </Grid>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {snackbarText}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Login;
