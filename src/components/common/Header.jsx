import React from "react";
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
import { Tooltip, useTheme } from "@mui/material";
import { MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import ConfigContext, { UIConfigContext } from "./ConfigContext";

import { IoFlower } from "react-icons/io5";
import { GiBreakingChain } from "react-icons/gi";

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

export default function Header(props) {
  const theme = useTheme();
  const { config, setConfig, allConfig } = React.useContext(ConfigContext);
  const { UIConfig, setUIConfig, allUIConfig } = React.useContext(UIConfigContext);
  const [value, setValue] = React.useState(0);

  const handleConfigChange = (event) => {
    setConfig(allConfig[event.target.value]);
    setUIConfig(allUIConfig[event.target.value]);
    setValue(event.target.value);
  };

  return (
    <AppBar position="sticky" sx={pageStyles.appBar}>
      <Toolbar sx={{ flexGrow: 1 }}>
        <Typography sx={{ marginRight: "30px" }} variant="h6">
          {UIConfig.headerDisplayName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Select
            labelId="pdu-select-label"
            id="pdu-select"
            value={value}
            onChange={handleConfigChange}
            size="small"
            sx={{ maxWidth: "200px", maxHeight: "40px", margin: "auto" }}
          >
            <MenuItem value={0}>Config 1 (Company 1 || Single phase 63)</MenuItem>
            <MenuItem value={1}>Config 2 (Company 2 || three phase WYE 63)</MenuItem>
            <MenuItem value={2}>Config 3 (Company 3 || three phase DELTA 60A)</MenuItem>
          </Select>
          <IconButton size="large" edge="end" aria-haspopup="true" color="inherit">
            <LanguageIcon />
          </IconButton>
          <Tooltip title={props.isAuthenticated ? "Logout" : "Login"} placement="bottom">
            <IconButton size="large" edge="end" aria-haspopup="true" color="inherit" onClick={props.logout}>
              {props.isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Account" placement="bottom">
            <IconButton size="large" edge="end" aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Theme" placement="bottom">
            <IconButton size="large" edge="end" aria-haspopup="true" color="inherit" onClick={props.toggleTheme}>
              {theme.palette.mode == "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={config.daisyChain ? "Daisy Chain Enabled" : "Daisy Chain Disabled"} placement="bottom">
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
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
