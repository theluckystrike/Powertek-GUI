import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  // Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  Checkbox,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Dialog from "../../components/common/DialogWithClose";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import LoopIcon from "@mui/icons-material/Loop";

import NamedContainer from "../../components/common/NamedContainer";
import Chip from "@mui/material/Chip";
import { ReportingBar } from "../../components/common/ReportingBar";
import { useTheme } from "@emotion/react";
import PDUSelect from "../../components/common/PDUSelect";
import ConfigContext from "../../components/common/ConfigContext";
import styled from "@emotion/styled";

const demoOutlet = {
  id: 1,
  name: "Outlet 01",
  state: "ON",
  status: "Normal",
  powerOnDelay: "3",
  powerOffDelay: "3",
  rebootDuration: "5",
  current: "3",
  powerActive: "400",
  powerApparent: "600",
  voltage: "230",
  powerFactor: "0.6",
  energy: "300",
  overCurrentAlarmCritical: "16.00",
  overPowerAlarmCritical: "2500",
  overCurrentAlarmWarning: "13.00",
  overPowerAlarmWarning: "2000",
  lines: ["L1", "L2", "L3"],
};

function findKeyContainingNumber(obj, number) {
  for (const key in obj) {
    if (obj[key].includes(number)) {
      return key;
    }
  }
  return null;
}

function Outlet() {
  const { config } = React.useContext(ConfigContext);
  const theme = useTheme();
  // const outlets = [
  //   {
  //     id: 1,
  //     name: "Outlet 01",
  //     state: "ON",
  //     status: "Normal",
  //     powerOnDelay: "3",
  //     powerOffDelay: "3",
  //     rebootDuration: "5",
  //     current: "0.00",
  //     powerActive: "0.0",
  //     powerApparent: "0.0",
  //     voltage: "231.5",
  //     powerFactor: "1.00",
  //     energy: "0.000",
  //     overCurrentAlarmCritical: "16.00",
  //     overPowerAlarmCritical: "2500",
  //     overCurrentAlarmWarning: "13.00",
  //     overPowerAlarmWarning: "2000",
  //     lines: ["L1", "L2", "L3"],
  //   },
  //   {
  //     id: 2,
  //     name: "Outlet 02",
  //     state: "ON",
  //     status: "Lower Critical",
  //     powerOnDelay: "3",
  //     powerOffDelay: "3",
  //     rebootDuration: "5",
  //     current: "0.00",
  //     powerActive: "0.0",
  //     powerApparent: "0.0",
  //     voltage: "231.5",
  //     powerFactor: "1.00",
  //     energy: "0.000",
  //     overCurrentAlarmCritical: "16.00",
  //     overPowerAlarmCritical: "2500",
  //     overCurrentAlarmWarning: "13.00",
  //     overPowerAlarmWarning: "2000",
  //     lines: ["L1", "L2", "L3"],
  //   },
  //   {
  //     id: 3,
  //     name: "Outlet 03",
  //     state: "ON",
  //     status: "Normal",
  //     powerOnDelay: "3",
  //     powerOffDelay: "3",
  //     rebootDuration: "5",
  //     current: "0.00",
  //     powerActive: "0.0",
  //     powerApparent: "0.0",
  //     voltage: "231.5",
  //     powerFactor: "1.00",
  //     energy: "0.000",
  //     overCurrentAlarmCritical: "16.00",
  //     overPowerAlarmCritical: "2500",
  //     overCurrentAlarmWarning: "13.00",
  //     overPowerAlarmWarning: "2000",
  //     lines: ["L1", "L2", "L3"],
  //   },
  //   {
  //     id: 4,
  //     name: "Outlet 04",
  //     state: "ON",
  //     status: "Normal",
  //     powerOnDelay: "3",
  //     powerOffDelay: "3",
  //     rebootDuration: "5",
  //     current: "0.00",
  //     powerActive: "0.0",
  //     powerApparent: "0.0",
  //     voltage: "231.5",
  //     powerFactor: "1.00",
  //     energy: "0.000",
  //     overCurrentAlarmCritical: "16.00",
  //     overPowerAlarmCritical: "2500",
  //     overCurrentAlarmWarning: "13.00",
  //     overPowerAlarmWarning: "2000",
  //     lines: ["L1", "L2", "L3"],
  //   },
  //   // ... more outlets
  //   {
  //     id: 14,
  //     name: "Outlet 14",
  //     state: "OFF",
  //     status: "Lower Warning",
  //     powerOnDelay: "3",
  //     powerOffDelay: "3",
  //     rebootDuration: "5",
  //     current: "12",
  //     powerActive: "0.0",
  //     powerApparent: "0.0",
  //     voltage: "231.5",
  //     powerFactor: "1.00",
  //     energy: "0.000",
  //     overCurrentAlarmCritical: "16.00",
  //     overPowerAlarmCritical: "2500",
  //     overCurrentAlarmWarning: "13.00",
  //     overPowerAlarmWarning: "2000",
  //     lines: ["L1", "L2", "L3"],
  //   },
  // ];

  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    let temp_outlets = [];
    for (let i = 1; i <= config["outletNumber"]; i = i + 1) {
      const demoCopy = JSON.parse(JSON.stringify(demoOutlet));
      demoCopy.id = i;
      demoCopy.name = `Outlet ${i}`;
      const breakername = findKeyContainingNumber(config["protectedOutlet"], i);
      demoCopy.lines = [config["circuitBreakerLines"][`${breakername}`]];
      temp_outlets.push(demoCopy);
    }
    setOutlets(temp_outlets);
  }, [config]);

  const [open, setOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState({});
  const [checkSelected, setCheckSelected] = useState([]);
  const [dialogAction, setDialogAction] = useState("");
  const [actionDialogOpen, setActionDialogOpen] = useState(false);

  const handleClickOpen = (outlet) => {
    setSelectedOutlet(outlet);
    setOpen(true);
  };

  const handleActionClickOpen = (action) => {
    setDialogAction(action);
    setActionDialogOpen(true);
  };

  const handleClose = () => {
    setActionDialogOpen(false);
    setOpen(false);
  };

  const handleSelectAllClick = () => {
    if (checkSelected.length === outlets.length) {
      setCheckSelected([]);
    } else {
      setCheckSelected(outlets.map((outlet) => outlet.id));
    }
  };

  const handleCheckboxClick = (outletId) => {
    const selectedIndex = checkSelected.indexOf(outletId);
    let newChecked = [...checkSelected];

    if (selectedIndex === -1) {
      newChecked.push(outletId);
    } else {
      newChecked.splice(selectedIndex, 1);
    }

    setCheckSelected(newChecked);
  };

  const handleAction = (action) => {
    console.log("Action Performance Code here:", action, "with the following:", checkSelected);
    handleClose();
    // setActionDialogOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
  }));

  const getStateChip = (state) => {
    return (
      <Chip
        label={state}
        size="small"
        color={state === "ON" ? "success" : "error"}
        // style={{ color: "white" }}
        sx={{
          "& .MuiChip-label": { fontWeight: 600, textTransform: "uppercase" },
          width: "40%",
          minWidth: "40px",
        }}
      />
    );
  };

  const getStatusChip = (status) => {
    const color = status === "Normal" ? "success" : status.toLowerCase().includes("warning") ? "warning" : "error";
    return (
      <Chip
        label={status}
        size="small"
        color={color}
        sx={{
          "& .MuiChip-label": {
            fontWeight: 600,
            textTransform: "uppercase",
          },
          width: "40%",
          minWidth: "80px",
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <NamedContainer
        overridetitle
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="600">
              Outlet
            </Typography>

            <Box sx={{ marginRight: "20px", display: checkSelected.length > 0 ? "block" : "none", gap: "2px" }}>
              <Button
                variant="small"
                sx={{ color: theme.palette.mode == "dark" ? "white" : "black" }}
                startIcon={<PowerSettingsNewIcon sx={{ color: "green" }} />}
                onClick={() => handleActionClickOpen("On")}
              >
                On
              </Button>
              <Button
                sx={{ color: theme.palette.mode == "dark" ? "white" : "black" }}
                startIcon={<PowerOffIcon sx={{ color: "red" }} />}
                onClick={() => handleActionClickOpen("Off")}
              >
                Off
              </Button>
              <Button
                sx={{ color: theme.palette.mode == "dark" ? "white" : "black" }}
                startIcon={<LoopIcon />}
                onClick={() => handleActionClickOpen("Cycle")}
              >
                Cycle
              </Button>
            </Box>
            <PDUSelect />
          </Box>
        }
      >
        <TableContainer>
          <Table size="medium" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    indeterminate={checkSelected.length > 0 && checkSelected.length < outlets.length}
                    checked={checkSelected.length === outlets.length}
                    onChange={handleSelectAllClick}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Current (A)</StyledTableCell>
                <StyledTableCell align="center">State</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Lines</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outlets.map((outlet, index) => (
                <TableRow
                  key={outlet.id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? (theme.palette.mode === "dark" ? "#1c2e45" : "#f1f5f9") : "inherit", // Alternating color
                  }}
                >
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={checkSelected.indexOf(outlet.id) !== -1}
                      onChange={() => handleCheckboxClick(outlet.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell
                    hover={outlet.name}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClickOpen(outlet)}
                    align="center"
                  >
                    {outlet.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{outlet.current}</StyledTableCell>
                  <StyledTableCell align="center">{getStateChip(outlet.state)}</StyledTableCell>
                  <StyledTableCell align="center">{getStatusChip(outlet.status)}</StyledTableCell>
                  <StyledTableCell sx={{ minWidth: "50px" }} align="center">
                    {outlet.lines.join(", ")}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NamedContainer>

      <Dialog open={actionDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogAction === "Cycle"
              ? `Cycle through the outlets: ${checkSelected
                  .map((id) => outlets.filter((outlet) => outlet.id === id)[0].name)
                  .join(", ")}`
              : `Switch ${dialogAction.toLowerCase()} the outlets: ${checkSelected
                  .map((id) => outlets.filter((outlet) => outlet.id === id)[0].name)
                  .join(", ")}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAction(dialogAction)} autoFocus>
            {dialogAction}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Outlet Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                defaultValue={selectedOutlet.name} // Replace with actual data
                fullWidth
                margin="dense"
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>
            {/* State and Status */}
            <Grid item xs={6}>
              <TextField
                label="State"
                defaultValue="ON" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Status"
                defaultValue="Normal" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* Power On Delay and Power Off Delay */}
            <Grid item xs={6}>
              <TextField
                label="Power On Delay"
                defaultValue="Wait 3 Seconds (1-7200)" // Replace with actual data
                fullWidth
                margin="dense"
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Power Off Delay"
                defaultValue="Wait 3 Seconds (1-7200)" // Replace with actual data
                fullWidth
                margin="dense"
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>
            {/* Reboot Duration */}
            <Grid item xs={12}>
              <TextField
                label="Reboot Duration"
                defaultValue="5 Seconds (5-60)" // Replace with actual data
                fullWidth
                margin="dense"
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Current (A)</Typography>
              <ReportingBar
                value={selectedOutlet.current}
                min={config[`outletMinMax`][`current`][0]}
                max={config[`outletMinMax`][`current`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              />
            </Grid>

            {/* <Grid item xs={6}>
              <Typography variant="caption">Power (W)</Typography>
              <ReportingBar
                value={selectedOutlet.powerActive}
                min={config[`outletMinMax`][`power`][0]}
                max={config[`outletMinMax`][`power`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              />
            </Grid> */}

            <Grid item xs={6}>
              <Typography variant="caption">Voltage (V)</Typography>
              <ReportingBar
                value={selectedOutlet.voltage}
                min={config[`outletMinMax`][`voltage`][0]}
                max={config[`outletMinMax`][`voltage`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Active Power (W)</Typography>
              <ReportingBar
                value={selectedOutlet.powerActive}
                min={config[`outletMinMax`][`activePower`][0]}
                max={config[`outletMinMax`][`activePower`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Apparent Power (VAR)</Typography>
              <ReportingBar
                value={selectedOutlet.powerApparent}
                min={config[`outletMinMax`][`apperantPower`][0]}
                max={config[`outletMinMax`][`apperantPower`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Power Factor</Typography>
              <ReportingBar
                value={selectedOutlet.powerFactor}
                min={config[`outletMinMax`][`powerFactor`][0]}
                max={config[`outletMinMax`][`powerFactor`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Energy (kWh)"
                defaultValue={selectedOutlet.energy} // Replace with actual data
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
              {/* <Typography variant="caption">Energy (kWh)</Typography>
              <ReportingBar
                value={selectedOutlet.energy}
                min={config[`outletMinMax`][`energy`][0]}
                max={config[`outletMinMax`][`energy`][1]}
                gradient={
                  "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,165,0,1) 25%, rgba(0,255,0,1) 50%, rgba(255,165,0,1) 75%, rgba(255,0,0,1) 100%)"
                }
              /> */}
            </Grid>

            {/* Alarms */}
            <Grid item xs={12}>
              <Table>
                <TableBody>
                  {/* Headers */}
                  <TableRow>
                    <TableCell align="center">Over Current Alarm (A)</TableCell>
                    <TableCell align="center">Over Power Alarm (W)</TableCell>
                  </TableRow>
                  {/* Critical Row */}
                  <TableRow>
                    <TableCell align="center">
                      <TextField
                        label="Critical"
                        defaultValue="16.00" // Replace with actual data
                        margin="dense"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="Critical"
                        defaultValue="2500" // Replace with actual data
                        margin="dense"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </TableCell>
                  </TableRow>
                  {/* Warning Row */}
                  <TableRow>
                    <TableCell align="center">
                      <TextField
                        label="Warning"
                        defaultValue="13.00" // Replace with actual data
                        margin="dense"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="Warning"
                        defaultValue="2000" // Replace with actual data
                        margin="dense"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            {/* Apply Button */}
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Apply
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" color="primary" fullWidth>
                Apply To All Outlet
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Outlet;
