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
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

import NamedContainer from "../../components/common/NamedContainer";
import InletStats from "../../components/homepage/InletStats";
import CircuitBreakerStatus from "../../components/homepage/CircuitBreakerStatus";

import ConfigContext from "../../components/common/ConfigContext";
import PDUSelect from "../../components/common/PDUSelect";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

        <Grid item xs={12}>
          <NamedContainer title="Residual Current Monitoring Option">

            <TableContainer sx={{ width: "30%" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Power</TableCell>
                    <TableCell align="right">4.4W</TableCell>
                    <TableCell rowSpan={2} align="right" sx={{ color: "green" }}>Normal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Phase 2 Energy</TableCell>
                    <TableCell align="right">localhost:5173/Powertek-GUI/</TableCell>
                    <TableCell align="right">Test</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer sx={{ marginTop: "24px" }} mt={4}>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "gray" }}>
                  <TableRow>
                    <TableCell>Phase</TableCell>
                    <TableCell align="right">Current(A)</TableCell>
                    <TableCell align="right">Voltage(V)</TableCell>
                    <TableCell align="right">Frequency</TableCell>
                    <TableCell align="right">Frequency</TableCell>
                    <TableCell align="right">Power</TableCell>
                    <TableCell align="right">Frequency</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell align="right">0.02.00.002</TableCell>
                    <TableCell align="right">228.5</TableCell>
                    <TableCell align="right">49.51</TableCell>
                    <TableCell align="right">1.00/1.00</TableCell>
                    <TableCell align="right">4.4/4.4</TableCell>
                    <TableCell align="right">0/0</TableCell>
                    <TableCell align="right" sx={{ color: "green" }}>Normal</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={3}>
              <Button variant="contained">
                Residual Current
              </Button>
              <Button variant="contained" sx={{ marginLeft: "10px" }}>
                Critical
              </Button>
            </Box>
          </NamedContainer>

        </Grid>
        {/*  */}
        <Grid item xs={12}>
          <NamedContainer title="Power Share">
            <Box sx={{ width: "100%" }}>
              <Card style={{ marginTop: "20px" }}>
                <Typography align="center" paddingY={1} sx={{ backgroundColor: "#499DFD" }}>
                  Status
                </Typography>
                <CardContent>
                  <Button variant="contained" style={{ marginTop: "20px" }}>PDU</Button>
                  <TableContainer sx={{ marginTop: "24px" }} mt={4}>
                    <Table aria-label="simple table">
                      <TableHead sx={{ backgroundColor: "#499DFD" }}>
                        <TableRow>
                          <TableCell>Phase</TableCell>
                          <TableCell align="right">Current(A)</TableCell>
                          <TableCell align="right">Voltage(V)</TableCell>
                          <TableCell align="right">Frequency</TableCell>
                          <TableCell align="right">Circuit breaker 1</TableCell>
                          <TableCell align="right">Circuit breaker 1</TableCell>
                          <TableCell align="right">Total</TableCell>
                          <TableCell align="right">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1.1</TableCell>
                          <TableCell align="right">118.3</TableCell>
                          <TableCell align="right">28.5</TableCell>
                          <TableCell align="right">49.51</TableCell>
                          <TableCell align="right">
                            <ReportingBar value={46.3} max={100} min={0} />
                          </TableCell>
                          <TableCell align="right">
                            <ReportingBar value={20} max={100} min={0} />
                          </TableCell>
                          <TableCell align="right">
                            <ReportingBar value={30.55} max={100} min={0} />
                          </TableCell>
                          <TableCell align="right" sx={{ color: "red" }}>Critical</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ marginTop: "15px" }}>
                    <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>Share</Button>
                    <Button style={{ color: "green", backgroundColor: "lightgray" }} variant="contained">Active / Main Power</Button>
                  </Box>
                </CardContent>
              </Card>
              <Card style={{ marginTop: "20px" }}>
                <Typography align="center" paddingY={1} sx={{ backgroundColor: theme.palette.mode === "dark" ? "#499DFD" : "#499DFD", }}>
                  Outlet Status
                </Typography>
                <CardContent>
                  <Box>
                    <Stack direction="row" spacing={5}>
                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: "#2e7d32" }}><AddCircleOutlineIcon /></Avatar>}
                        label="activeOn circuit (VA)"
                        variant="outlined"
                        color="success"
                      />
                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: "#2e7d32" }}><AddCircleOutlineIcon /></Avatar>}
                        label="activeOn circuit (VA)"
                        variant="outlined"
                        color="success"
                      />
                      <Chip
                        avatar={
                          <Avatar><AddCircleOutlineIcon /></Avatar>}
                        label="activeOn circuit (VA)"
                        variant="outlined"
                      />
                      <Chip
                        avatar={
                          <Avatar><AddCircleOutlineIcon /></Avatar>}
                        label="activeOn circuit (VA)"
                        variant="outlined"
                      />
                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: "#2e7d32" }}><AddCircleOutlineIcon /></Avatar>}
                        label="activeOn circuit (VA)"
                        variant="outlined"
                        color="success"
                      />
                      <Chip
                        avatar={
                          <Avatar><AddCircleOutlineIcon /></Avatar>}
                        label="liveOn circuit (VA)"
                        variant="outlined"
                      />
                      <Chip
                        avatar={
                          <Avatar sx={{ bgcolor: "#2e7d32" }}><AddCircleOutlineIcon /></Avatar>}
                        label="actived circuit (VA)"
                        variant="outlined"
                        color="success"
                      />
                      <Chip
                        avatar={
                          <Avatar><AddCircleOutlineIcon /></Avatar>}
                        label="active circuit (VA)"
                        variant="outlined"
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </NamedContainer>

        </Grid>

        {/* tabs */}
        <Grid item xs={12}>
          <NamedContainer title="Alarm and Event Overview">
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
                <Tab

                  icon={
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                      label="Event Log"
                      clickable={true}
                    />
                  }
                />

              </Tabs>
              <TabPanel role="tabpanel" value={value} index={0}>
                <AlarmListTab />
              </TabPanel>
              <TabPanel role="tabpanel" value={value} index={1}>
                <EventLogtab />
              </TabPanel>
            </Box>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
