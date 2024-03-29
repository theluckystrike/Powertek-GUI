import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
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

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import LoopIcon from "@mui/icons-material/Loop";

import NamedContainer from "../../components/common/NamedContainer";
import Chip from "@mui/material/Chip";
import { ReportingBar } from "../../components/common/ReportingBar";
import { useTheme } from "@emotion/react";
import PDUSelect from "../../components/common/PDUSelect";
import ConfigContext from "../../components/common/ConfigContext";

const demoOutlet = {
  id: 1,
  name: "Outlet 01",
  state: "ON",
  status: "Normal",
  powerOnDelay: "3",
  powerOffDelay: "3",
  rebootDuration: "5",
  current: "0.00",
  powerActive: "0.0",
  powerApparent: "0.0",
  voltage: "231.5",
  powerFactor: "1.00",
  energy: "0.000",
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
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <NamedContainer
        overridetitle
        title={
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="600">
              Outlet
            </Typography>
            <PDUSelect />
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
          </Box>
        }
      >
        <TableContainer>
          <Table size="medium" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={checkSelected.length > 0 && checkSelected.length < outlets.length}
                    checked={checkSelected.length === outlets.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell align="center">#</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Current (A)</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Lines</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outlets.map((outlet, index) => (
                <TableRow
                  key={outlet.id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? (theme.palette.mode === "dark" ? "#3C3C3C" : "#E0E0E0") : "inherit", // Alternating color
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={checkSelected.indexOf(outlet.id) !== -1}
                      onChange={() => handleCheckboxClick(outlet.id)}
                    />
                  </TableCell>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell hover sx={{ cursor: "pointer" }} onClick={() => handleClickOpen(outlet)} align="center">
                    {outlet.name}
                  </TableCell>
                  <TableCell align="center">{outlet.current}</TableCell>
                  <TableCell align="center">{getStateChip(outlet.state)}</TableCell>
                  <TableCell align="center">{getStatusChip(outlet.status)}</TableCell>
                  <TableCell align="center">{outlet.lines.join(", ")}</TableCell>
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
                InputProps={{
                  readOnly: true,
                }}
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
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Power Off Delay"
                defaultValue="Wait 3 Seconds (1-7200)" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* Reboot Duration */}
            <Grid item xs={12}>
              <TextField
                label="Reboot Duration"
                defaultValue="5 Seconds (5-60)" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Current (A)</Typography>
              <ReportingBar value={selectedOutlet.current} max={30} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Power (W)</Typography>
              <ReportingBar value={selectedOutlet.powerActive} max={1000} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Voltage (V)</Typography>
              <ReportingBar value={selectedOutlet.voltage} max={500} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Energy (KWh)</Typography>
              <ReportingBar value={selectedOutlet.energy} max={5000} />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Current (A)"
                defaultValue="0.00" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Power (W/A)"
                defaultValue="Active 0.0 / Apparent 0.0" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Voltage (V)"
                defaultValue="231.5" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Power Factor"
                defaultValue="1.00" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Energy (KWh)"
                defaultValue="0.000KWh (from 01/01/1970 02:00:00)" // Replace with actual data
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
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
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="Critical"
                        defaultValue="2500" // Replace with actual data
                        margin="dense"
                        InputProps={{
                          readOnly: true,
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        label="Warning"
                        defaultValue="2000" // Replace with actual data
                        margin="dense"
                        InputProps={{
                          readOnly: true,
                        }}
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
