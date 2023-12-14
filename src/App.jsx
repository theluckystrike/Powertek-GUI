import { useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { lightTheme, darkTheme } from "./theme";
import HomePage from "./containers/Home/Homepage";
import Inlet from "./containers/Intel/Inlet";
import OutletPage from "./containers/Outlets/Outlet";
import Login from "./containers/Login/Login";
import Header from "./components/common/Header";
import SidebarCustom from "./components/common/SidebarCustom";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [sideBarCollapsed, setsideBarCollapsed] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  const isAuthenticated = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div style={{ display: "flex" }} className="main">
        <Routes>
          <Route path="/login" element={<Login toggleTheme={toggleTheme} />} />
          <Route
            element={
              <>
                <SidebarCustom collapsed={sideBarCollapsed} setsideBarCollapsed={setsideBarCollapsed} />
                <Box
                  component={"main"}
                  style={{
                    display: "flex",
                    flexGrow: "1",
                    backgroundColor: theme === "light" ? "white" : "#444444",
                  }}
                >
                  <Header
                    toggleTheme={toggleTheme}
                    logout={logout}
                    setsideBarCollapsed={setsideBarCollapsed}
                    isAuthenticated={isAuthenticated()}
                  />
                  <Outlet />
                </Box>
              </>
            }
          >
            <Route path="/" element={<HomePage />} />
            {/* <Route index element={<PrivateRoute Component={<HomePage />} />} /> */}
            <Route path="/inlet" element={<PrivateRoute Component={<Inlet />} />} />
            <Route path="/outlet" element={<PrivateRoute Component={<OutletPage />} />} />
            <Route
              path="/breaker-overcurrent-protection"
              element={
                <PrivateRoute
                  Component={
                    <>
                      <h1>Not Implemented...</h1>
                    </>
                  }
                />
              }
            />
            <Route path="/about" element={<h1>About</h1>} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
