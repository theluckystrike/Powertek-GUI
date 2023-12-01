import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import IconButton from "@mui/material/IconButton";

import { lightTheme, darkTheme } from "./theme";
import HomePage from "./containers/Home/Homepage";
import Header from "./components/common/Header";
import logo from "./assets/logo-clear.png";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [collapsed, setToggled] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuItemStyles = {
    button: {
      // [`&.${menuClasses.disabled}`]: {
      //   color: themes[theme].menu.disabled.color,
      // },
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        color: "#CDCDCD",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div style={{ display: "flex" }} className="main">
        <Sidebar
          collapsed={collapsed}
          toggled={collapsed}
          onBackdropClick={() => setToggled(!collapsed)}
          backgroundColor="#203246"
          iconColor="#e3e3e3"
          rootStyles={{
            color: "#e3e3e3",
            borderRight: "0px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              height: "100%",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "15px" }}>
              <Box
                component="img"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
                alt="Logo"
                src={logo}
              />
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<LabelImportantIcon />}>Summary Overview</MenuItem>
              <MenuItem icon={<VerticalAlignBottomIcon />}>Inlet</MenuItem>
              <MenuItem icon={<OfflineBoltIcon />}>Breaker Overcurrent Protection</MenuItem>
            </Menu>
            <Box sx={{ flexGrow: "1" }} />
            <Button size="large" color="inherit" onClick={() => setToggled(!collapsed)}>
              <MenuIcon />
            </Button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
              <Typography variant="caption" color="#fff">
                © 2023
              </Typography>
            </div>
          </div>
        </Sidebar>

        <main style={{ display: "flex", flexGrow: "1" }}>
          <Header />
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<h1>About</h1>} />
            </Routes>
          </Router>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
