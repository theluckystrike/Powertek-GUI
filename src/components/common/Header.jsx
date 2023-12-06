import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { AccountCircle } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";

const drawerWidth = 15;

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

export default function Header() {
  return (
    <AppBar position="sticky" sx={pageStyles.appBar}>
      <Toolbar sx={{ flexGrow: 1 }}>
        <Typography sx={{ marginRight: "30px" }} variant="h6">{`Powertek GUI Demo`}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
            <LanguageIcon />
          </IconButton>
          <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
            <LogoutIcon />
          </IconButton>
          <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
