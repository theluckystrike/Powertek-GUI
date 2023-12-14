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
} from "@mui/material";

import NamedContainer from "../../components/common/NamedContainer";
import Chip from "@mui/material/Chip";
import { ReportingBar } from "../../components/common/ReportingBar";

function Outlet() {
  const outlets = [
    {
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
      energy: "0.000kWh",
      overCurrentAlarmCritical: "16.00",
      overPowerAlarmCritical: "2500",
      overCurrentAlarmWarning: "13.00",
      overPowerAlarmWarning: "2000",
    },
    // ... more outlets
    {
      id: 14,
      name: "Outlet 14",
      state: "OFF",
      status: "Standby",
      powerOnDelay: "3",
      powerOffDelay: "3",
      rebootDuration: "5",
      current: "0.00",
      powerActive: "0.0",
      powerApparent: "0.0",
      voltage: "231.5",
      powerFactor: "1.00",
      energy: "0.000kWh",
      overCurrentAlarmCritical: "16.00",
      overPowerAlarmCritical: "2500",
      overCurrentAlarmWarning: "13.00",
      overPowerAlarmWarning: "2000",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState({});

  const handleClickOpen = (outlet) => {
    setSelectedOutlet(outlet);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <NamedContainer title="OUTLETS">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Current (A)</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outlets.map((outlet, index) => (
                <TableRow key={outlet.name} hover onClick={() => handleClickOpen(outlet)}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{outlet.name}</TableCell>
                  <TableCell>{outlet.current}</TableCell>
                  <TableCell>{outlet.state}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </NamedContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Outlet Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                defaultValue={selectedOutlet.name}
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="State"
                defaultValue={selectedOutlet.state}
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
                defaultValue={selectedOutlet.status}
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* Repeat for other fields... */}

            {/* Example for the Current, Voltage, Power, and Energy fields with bars */}
            <Grid item xs={12}>
              <Typography variant="caption">Current (A)</Typography>
              <Box position="relative" display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <TextField
                    defaultValue={selectedOutlet.current}
                    fullWidth
                    margin="dense"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Box>
                {/* You can use a progress bar component or a custom bar to show the values graphically */}
              </Box>
            </Grid>
            {/* Repeat for Voltage, Power, and Energy */}

            {/* For the Over Current and Over Power Alarm section */}
            <Grid item xs={12}>
              <Typography variant="subtitle2">Over Current Alarm (A)</Typography>
              <TextField
                defaultValue={selectedOutlet.overCurrentAlarm}
                fullWidth
                margin="dense"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            {/* Repeat for Over Power Alarm */}
            <Grid item xs={12}>
              <Typography variant="subtitle2">Over Current Alarm (A)</Typography>
              <Box display="flex" justifyContent="space-between">
                <Chip label="Critical" color="error" />
                <Chip label="Warning" color="warning" />
              </Box>
              <ReportingBar value={12} />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Apply
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Outlet;
