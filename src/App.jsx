import { useState, useContext } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import PrivateRoute from "./components/common/PrivateRoute";
import { ThemeProvider } from "@mui/material/styles";
import ConfigContext from "./components/common/ConfigContext";
import Box from "@mui/material/Box";

import { lightTheme, darkTheme } from "./theme";
import HomePage from "./containers/Home/Homepage";
import Inlet from "./containers/Inlet/Inlet";
import BreakerOverCurrent from "./containers/BreakerOverCurrent/BreakerOverCurrent";
import OutletPage from "./containers/Outlets/Outlet";
import EnvironmentSensor from "./containers/EnvironmentSensor/EnvironmentSensor";
import Login from "./containers/Login/Login";
import Header from "./components/common/Header";
import SidebarCustom from "./components/common/SidebarCustom";

import Network from "./containers/DeviceSetting/Network/Network";
import NetworkServices from "./containers/DeviceSetting/NetworkServices/NetworkServices";
import Security from "./containers/DeviceSetting/Security/Security";
import DateTime from "./containers/DeviceSetting/DateTime/DateTime";
import EventLogs from "./containers/DeviceSetting/EventLogs/EventLogs";
import OutletGrouping from "./containers/OutletGrouping/OutletGrouping";
import PowertekAnalytics from "./containers/PowertekAnalytics/PowertekAnalytics";
import USBHostPorts from "./containers/DeviceSetting/USBHostPorts/USBHostPorts";
import Maintenance from "./containers/Maintenance/Maintenance";

import "./App.css";

function App() {
  const config = useContext(ConfigContext);
  console.log("Config loaded:", config);
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
              element={<PrivateRoute Component={<BreakerOverCurrent />} />}
            />
            <Route path="/outlet-grouping" element={<PrivateRoute Component={<OutletGrouping />} />} />
            <Route path="/environment-sensor" element={<PrivateRoute Component={<EnvironmentSensor />} />} />
            <Route path="/user-settings" element={<PrivateRoute Component={<h1>Not Implemented...</h1>} />} />
            <Route path="/device-settings" element={<PrivateRoute Component={<h1>Not Implemented...</h1>} />} />
            <Route path="/device-settings/network" element={<PrivateRoute Component={<Network />} />} />
            <Route path="/device-settings/networkServices" element={<PrivateRoute Component={<NetworkServices />} />} />
            <Route path="/device-settings/security" element={<PrivateRoute Component={<Security />} />} />
            <Route path="/device-settings/datetime" element={<PrivateRoute Component={<DateTime />} />} />
            <Route path="/device-settings/eventlogs" element={<PrivateRoute Component={<EventLogs />} />} />
            <Route path="/device-settings/usb-host-port" element={<PrivateRoute Component={<USBHostPorts />} />} />
            <Route path="/maintenance" element={<PrivateRoute Component={<Maintenance />} />} />
            <Route path="/powertek-analytics" element={<PrivateRoute Component={<PowertekAnalytics />} />} />
            <Route path="/about" element={<h1>About</h1>} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
