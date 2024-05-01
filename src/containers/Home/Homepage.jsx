import React, { useEffect, useState, useContext } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Tabs,
  Tab,
  Stack,
  Avatar,
  Card,
  CardContent,
  // Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  ToggleButton,
} from "@mui/material";
import Dialog from "../../components/common/DialogWithClose";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import SettingsIcon from "@mui/icons-material/Settings";

import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import NamedContainer from "../../components/common/NamedContainer";
import InletStats from "../../components/homepage/InletStats";
import CircuitBreakerStatus from "../../components/homepage/CircuitBreakerStatus";

import ConfigContext from "../../components/common/ConfigContext";
import PDUSelect from "../../components/common/PDUSelect";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useTheme } from "@emotion/react";
import { ReportingBar } from "../../components/common/ReportingBar";
import EventLogtab from "./EventLogtab";
import AlarmListTab from "./AlarmListTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </Typography>
  );
}
function HomePage(props) {
  const { config, setConfig } = useContext(ConfigContext);

  const [open, setOpen] = useState(false);
  const [settingsEdit, setsettingsEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setsettingsEdit(!settingsEdit);
  };

  const handleClose = () => {
    setOpen(false);
    setsettingsEdit(!settingsEdit);
  };

  const handleSave = () => {
    console.log("Threshold saved");
    handleClose();
  };

  const [stats, setStats] = useState([
    { name: "Power Factor", value: "0.45" },
    { name: "Frequency", value: "50Hz" },
    { name: "RMS Voltage", value: "220V" },
    { name: "Active Power", value: "28.31 KWh" },
    { name: "Reactive Power", value: "0.5VAr" },
    { name: "Apparent Power", value: "65.60kVAh" },
  ]);

  const [currentMap, setCurrentMap] = useState(
    config["inlets"].reduce(
      (acc, curr) => {
        acc[curr] = Math.floor(Math.random() * 16);
        return acc;
      },
      {
        // L1: 0,
        // L2: 0,
        // L3: 0,
        // Neutral: 0,
      }
    )
  );

  const [circuitBreakerMap, setCircuitBreakerMap] = useState({});
  const [outletStatus, setOutletStatus] = useState([]);

  // Configs
  const outletWarningThreshold = config[`outletWarningThreshold`];
  const outletErrorThreshold = config[`outletErrorThreshold`];
  const circuitBreakerNumber = config[`circuitBreakerNames`].length;
  const maxCurrent = config[`maxBreakerCurrent`];

  useEffect(() => {
    let temp = {};
    for (let name of config[`circuitBreakerNames`]) {
      temp[name] = Math.floor(Math.random() * 16);
    }
    setCircuitBreakerMap(temp);

    let outletStatusTemp = [];
    for (let i = 1; i <= config[`outletNumber`]; i++) {
      let temp2 = {};
      temp2[`Label`] = `Outlet ${i}`;
      temp2[`Current`] = (Math.random() * 16).toFixed(2);

      if (temp2[`Current`] > outletWarningThreshold) {
        temp2[`Status`] = "warning";
      } else if (temp2[`Current`] > outletErrorThreshold) {
        temp2[`Status`] = "error";
      } else {
        temp2[`Status`] = "success";
      }

      outletStatusTemp.push(temp2);
    }
    setOutletStatus(outletStatusTemp);

    const interval = setInterval(() => {
      setCurrentMap(
        config["inlets"].reduce(
          (acc, curr) => {
            acc[curr] = Math.floor(Math.random() * 16);
            return acc;
          },
          {
            // L1: 0,
            // L2: 0,
            // L3: 0,
            // Neutral: 0,
          }
        )
      );

      let temp = {};
      for (let name of config[`circuitBreakerNames`]) {
        temp[name] = Math.floor(Math.random() * 16);
      }
      setCircuitBreakerMap(temp);

      let outletStatusTemp = [];

      for (let i = 1; i <= config[`outletNumber`]; i++) {
        let temp2 = {};
        temp2[`Label`] = `Outlet ${i}`;
        temp2[`Current`] = (Math.random() * 16).toFixed(2);

        if (temp2[`Current`] > outletErrorThreshold) {
          temp2[`Status`] = "error";
        } else if (temp2[`Current`] > outletWarningThreshold) {
          temp2[`Status`] = "warning";
        } else {
          temp2[`Status`] = "success";
        }
        outletStatusTemp.push(temp2);
      }

      setOutletStatus(outletStatusTemp);
    }, 1000);

    return () => clearInterval(interval);
  }, [config]);

  // tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={circuitBreakerNumber <= 12 ? 8 : 12} md={12} xs={12}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      INLET STATUS
                    </Typography>
                    <PDUSelect />
                  </div>
                }
              >
                <InletStats
                  maxCurrent={32}
                  minCurrent={0}
                  currentMap={currentMap}
                  stats={stats}
                  realPower={4.2}
                  apparentPower={12.4}
                />
              </NamedContainer>
            </Grid>
            <Grid item lg={circuitBreakerNumber <= 12 ? 4 : 12} md={12} xs={12}>
              <NamedContainer title="CIRCUIT BREAKER STATUS">
                <CircuitBreakerStatus circuitBreakerMap={circuitBreakerMap} minCurrent={0} maxCurrent={maxCurrent} />
              </NamedContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <NamedContainer title="OUTLET STATUS">
            <Grid
              container
              spacing={1}
              sx={{ display: "flex", alignContent: "center", justifyContent: "space-between", alignItems: "center" }}
            >
              {outletStatus.map((outlet, key) => (
                <Grid
                  key={key}
                  item
                  lg={1.5}
                  sx={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    sx={{ "& .MuiChip-label": { fontWeight: 600 }, width: "200px" }}
                    icon={<OfflineBoltIcon />}
                    color={outlet[`Status`]}
                    label={`${outlet["Label"]} (${outlet["Current"]} A)`}
                    clickable={true}
                  />
                </Grid>
              ))}
            </Grid>
          </NamedContainer>
        </Grid>

        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "end",
                  alignItems: { xs: "start", sm: "center" },
                }}
              >
                {/* <Typography variant="h5" sx={{ fontWeight: "600", mb: { xs: 1, sm: 0 } }}>
                  Residual Current Monitoring
                </Typography> */}
                <ToggleButton
                  value="settingsEdit"
                  selected={settingsEdit}
                  onChange={handleClickOpen}
                  sx={{
                    padding: "0px",
                    borderRadius: "5px",
                    textTransform: "none",
                    border: "1px solid rgba(0, 0, 0, 0.87)",
                  }}
                  color="primary"
                >
                  <Typography variant="body2" fontWeight="400" sx={{ marginRight: "5px" }}>
                    Edit Settings
                  </Typography>
                  {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
                </ToggleButton>
              </Box>
            }
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" fontWeight="600" sx={{ width: { xs: "100%", sm: "30%" }, textAlign: "center" }}>
                Residual Current : 0.0 mA
                <Chip sx={{ mx: 1 }} label="Error" color="error" />
                /
                <Chip label="Normal" color="success" />
              </Typography>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Set Alarm Threshold</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="threshold"
                    label="Alarm Threshold (mA)"
                    type="number"
                    fullWidth
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              <Typography variant="h5" fontWeight="600" sx={{ width: { xs: "100%", sm: "39%" }, textAlign: "center" }}>
                Power Share :
                <Chip sx={{ mx: 1 }} label="Inactive" color="primary" />
                /
                <Chip label="Active/Backup Power" color="error" />
                /
                <Chip label="Active/Main Power" color="success" />
              </Typography>

              <Typography variant="h5" fontWeight="600" sx={{ width: { xs: "100%", sm: "30%" } }}>
                Over Voltage Protection :
                <Chip sx={{ mx: 1 }} label="Activated" color="error" />
                /
                <Chip label="Normal" color="success" />
              </Typography>
            </Box>
          </NamedContainer>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={4} md={12} sx={{ width: "100%" }}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      EMD Information
                    </Typography>
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                      label={`EMD 1`}
                      clickable={true}
                    />
                  </div>
                }
              ></NamedContainer>
            </Grid>
            <Grid item lg={8} md={12} sx={{ width: "100%" }}>
              <NamedContainer title="PlaceHolder"></NamedContainer>
            </Grid>
          </Grid>
        </Grid>

        {/* tabs */}
        <Grid item xs={12}>
          <NamedContainer title="Alarms">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab
                  icon={
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                      label="Alarm List"
                      clickable={true}
                    />
                  }
                />
                {/* <Tab
                  icon={
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                      label="Event Log"
                      clickable={true}
                    />
                  }
                /> */}
              </Tabs>
              <TabPanel role="tabpanel" value={value} index={0}>
                <AlarmListTab />
              </TabPanel>
              {/* <TabPanel role="tabpanel" value={value} index={1}>
                <EventLogtab />
              </TabPanel> */}
            </Box>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
