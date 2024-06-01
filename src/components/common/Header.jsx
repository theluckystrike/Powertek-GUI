import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip, useTheme } from "@mui/material";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import ConfigContext, { UIConfigContext } from "./ConfigContext";
import { useNavigate } from "react-router-dom";

import { IoFlower } from "react-icons/io5";
import { GiBreakingChain } from "react-icons/gi";
import styled from "@emotion/styled";

const pageStyles = {
  appBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    width: "100%",
    height: "60px",
    maxHeight: "60px",
    color: "#e3e3e3",
    // backgroundColor: "rgb(11,9,61)",
    background: "#203046",
    boxShadow: " 25px 0px 30px -11px rgba(0,0,0,0.57)",
    // background: rgb(2,0,36);
  },
};

const StyledSelect = styled(Select)(({ theme }) => ({
  fieldset: {
    borderColor: theme.palette.mode === "dark" ? "#233a57 !important" : "#233a57 !important",
  },
}));

export default function Header(props) {
  const theme = useTheme();
  const { sideBarToggle, setsideBarToggle } = props;
  const { config, setConfig, allConfig } = React.useContext(ConfigContext);
  const { UIConfig, setUIConfig, allUIConfig } = React.useContext(UIConfigContext);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleConfigChange = (event) => {
    setConfig(allConfig[event.target.value]);
    setUIConfig(allUIConfig[event.target.value]);
    setValue(event.target.value);
  };

  const [displayStyle, setDisplayStyle] = useState(window.innerWidth < 769 ? "block" : "none");

  useEffect(() => {
    const handleResize = () => {
      setDisplayStyle(window.innerWidth < 769 ? "block" : "none");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar position="sticky" sx={pageStyles.appBar}>
      <Toolbar sx={{ flexGrow: 1 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          style={{ lineHeight: "0.7" }}
          sx={{ mr: 2, display: displayStyle }}
          onClick={() => {
            setsideBarToggle(!sideBarToggle);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ marginRight: "30px" }} variant="h6">
          {UIConfig.headerDisplayName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <StyledSelect
            labelId="pdu-select-label"
            id="pdu-select"
            value={value}
            onChange={handleConfigChange}
            size="small"
            sx={{
              maxWidth: "200px",
              maxHeight: "40px",
              margin: "auto",
              color: theme.palette.mode === "dark" ? "#fff !important" : "#fff !important",
            }}
          >
            <MenuItem value={0}>Config 1 (Company 1 || Single phase 63)</MenuItem>
            <MenuItem value={1}>Config 2 (Company 2 || three phase WYE 63)</MenuItem>
            <MenuItem value={2}>Config 3 (Company 3 || three phase DELTA 60A)</MenuItem>
          </StyledSelect>
          <IconButton size="large" edge="end" aria-haspopup="true" color="inherit">
            <LanguageIcon />
          </IconButton>
          {props.isAuthenticated ? (
            <Tooltip title={"Logout"} placement="bottom">
              <IconButton size="large" edge="end" aria-haspopup="true" color="inherit" onClick={props.logout}>
                {<LogoutIcon />}
              </IconButton>
            </Tooltip>
          ) : null}
          <Tooltip title={props.isAuthenticated ? "Change Password" : "Login"} placement="bottom">
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                if (props.isAuthenticated) {
                  //change password
                } else {
                  navigate("/login");
                }
              }}
            >
              {<AccountCircle />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Theme" placement="bottom">
            <IconButton size="large" edge="end" aria-haspopup="true" color="inherit" onClick={props.toggleTheme}>
              {theme.palette.mode == "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          {/* <Tooltip title={config.daisyChain ? "Daisy Chain Enabled" : "Daisy Chain Disabled"} placement="bottom">
            <IconButton
              size="large"
              edge="end"
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                const configCopy = { ...config };
                configCopy.daisyChain = !config.daisyChain;
                setConfig(configCopy);
              }}
            >
              {config.daisyChain ? <IoFlower /> : <GiBreakingChain />}
            </IconButton>
          </Tooltip> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
