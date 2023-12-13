import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { lightTheme, darkTheme } from "./theme";
import HomePage from "./containers/Home/Homepage";
import Inlet from "./containers/Intel/Inlet";
import Header from "./components/common/Header";
import SidebarCustom from "./components/common/SidebarCustom";

import "./App.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [sideBarCollapsed, setsideBarCollapsed] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Router basename={"/Powertek-GUI/"}>
        <div style={{ display: "flex" }} className="main">
          <SidebarCustom collapsed={sideBarCollapsed} setsideBarCollapsed={setsideBarCollapsed} />
          <Box
            component={"main"}
            style={{ display: "flex", flexGrow: "1", backgroundColor: theme === "light" ? "white" : "#444444" }}
          >
            <Header toggleTheme={toggleTheme} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/inlet" element={<Inlet />} />
              <Route path="/about" element={<h1>About</h1>} />
            </Routes>
          </Box>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
