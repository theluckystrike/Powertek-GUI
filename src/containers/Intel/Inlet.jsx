import React, { useState, useEffect } from "react";
import { Button, Container, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import ToggleButton from "@mui/material/ToggleButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningIcon from "@mui/icons-material/Warning";
import GppBadIcon from "@mui/icons-material/GppBad";

import NamedContainer from "../../components/common/NamedContainer";
import InletStats from "../../components/homepage/InletStats";
import Divider from "../../components/common/styled/Divider";

function ThresholdDialog({ open, onClose, onSave, defaultValues }) {
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    setValues(defaultValues); // Update local state when defaultValues change
  }, [defaultValues]);

  const handleInputChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    onSave(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set Thresholds</DialogTitle>
      <DialogContent>
        <TextField
          label="Lower Warning"
          type="text"
          name="lowerWarning"
          value={values.lowerWarning}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Higher Warning"
          type="text"
          name="higherWarning"
          value={values.higherWarning}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Lower Critical"
          type="text"
          name="lowerCritical"
          value={values.lowerCritical}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Higher Critical"
          type="text"
          name="higherCritical"
          value={values.higherCritical}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => handleSave(values)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

function Inlet(props) {
  const theme = useTheme();
  const [settingsEdit, setsettingsEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentThresholds, setCurrentThresholds] = useState({
    lowerWarning: "",
    higherWarning: "",
    lowerCritical: "",
    higherCritical: "",
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "4px", // Set the padding to a low value, adjust as needed
  }));

  function getStatusColor(status) {
    switch (status) {
      case "normal":
        return ["success", <ThumbUpAltIcon />];
      case "warning":
        return ["warning", <WarningIcon />];
      case "error":
        return ["error", <GppBadIcon />];
      default:
        return "default";
    }
  }

  function handleThresholdClick(row) {
    setCurrentThresholds({
      lowerWarning: row.lowerWarning,
      higherWarning: row.higherWarning,
      lowerCritical: row.lowerCritical,
      higherCritical: row.higherCritical,
    });
    setDialogOpen(true);
    console.log("Threshold settings for:", row);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSave = (newValues) => {
    console.log("Saved Values:", newValues);
    // Here you will update your row data with new threshold values
    setDialogOpen(false);
  };

  const rows = [
    {
      id: 1,
      intelMetering: "RMS Current",
      value: "0.15A",
      status: "normal",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
    },
    {
      id: 2,
      intelMetering: "Peak Current",
      value: "0.18A",
      status: "warning",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
    },
    {
      id: 3,
      intelMetering: "Current Harmonic Distortion",
      value: "1%",
      status: "normal",
      lowerWarning: "0.1%",
      higherWarning: "0.2%",
      lowerCritical: "0.05%",
      higherCritical: "0.25%",
    },
    {
      id: 4,
      intelMetering: "RMS Neutral Current",
      value: "0.12A",
      status: "normal",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
    },
    {
      id: 5,
      intelMetering: "RMS Voltage",
      value: "230V",
      status: "normal",
      lowerWarning: "0.1V",
      higherWarning: "0.2V",
      lowerCritical: "0.05V",
      higherCritical: "0.25V",
    },
    {
      id: 6,
      intelMetering: "Frequency",
      value: "50.0Hz",
      status: "normal",
      lowerWarning: "49.5Hz",
      higherWarning: "50.5Hz",
      lowerCritical: "49.0Hz",
      higherCritical: "51.0Hz",
    },
    {
      id: 7,
      intelMetering: "Power Factor",
      value: "0.98",
      status: "normal",
      lowerWarning: "0.9",
      higherWarning: "1.0",
      lowerCritical: "0.8",
      higherCritical: "1.1",
    },
    {
      id: 8,
      intelMetering: "Active Power",
      value: "66",
      status: "normal",
      lowerWarning: "60",
      higherWarning: "70",
      lowerCritical: "50",
      higherCritical: "80",
    },
    {
      id: 9,
      intelMetering: "Active Energy",
      value: "25748Wh",
      status: "normal",
      lowerWarning: "20000",
      higherWarning: "40000",
      lowerCritical: "100000",
      higherCritical: "120000",
    },
    {
      id: 10,
      intelMetering: "Apparent Power",
      value: "15VA",
      status: "normal",
      lowerWarning: "10VA",
      higherWarning: "20VA",
      lowerCritical: "5VA",
      higherCritical: "25VA",
    },
    {
      id: 11,
      intelMetering: "Apparent Energy",
      value: "65874 Vah",
      status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
    },
    {
      id: 12,
      intelMetering: "Reactive Power",
      value: "0.15A",
      status: "error",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
    },
  ];

  const [stats, setStats] = useState([
    { name: "Power Factor", value: "0.45" },
    { name: "Frequency", value: "50Hz" },
    { name: "RMS Voltage", value: "220V" },
    { name: "Active Power", value: "28.31 KWh" },
    { name: "Reactive Power", value: "0.5VAr" },
    { name: "Apparent Power", value: "65.60kVAh" },
  ]);

  const [currentMap, setCurrentMap] = useState({
    L1: 5,
    L2: 6,
    L3: 5,
    Neutral: 16,
  });

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={12}>
              <NamedContainer title="INLET">
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
            <Grid item lg={6} md={12}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      SETTINGS
                    </Typography>
                    <ToggleButton
                      value="settingsEdit"
                      selected={settingsEdit}
                      onChange={() => {
                        setsettingsEdit(!settingsEdit);
                      }}
                      sx={{
                        padding: "0px",
                        paddingRight: "5px",
                        paddingLeft: "5px",
                        borderRadius: "5px",
                        textTransform: "none",
                        border: "1px solid rgba(0, 0, 0, 0.87)",
                      }}
                      color="primary"
                    >
                      <Typography
                        variant=""
                        fontWeight="400"
                        sx={{ marginRight: "5px" }}
                        //   color={settingsEdit ? "red" : "blue"}
                      >
                        Edit Settings
                      </Typography>
                      {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
                    </ToggleButton>
                  </div>
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    height: "calc(100% - 16px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      component={"div"}
                      style={{ width: "50%", textAlign: "center" }}
                    >
                      Label
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="400"
                      component={"div"}
                      style={{ width: "50%", textAlign: "center" }}
                    >
                      L1
                    </Typography>
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      component={"div"}
                      style={{ width: "50%", textAlign: "center" }}
                    >
                      Name
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="400"
                      component={"div"}
                      style={{ width: "50%", textAlign: "center" }}
                    ></Typography>
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      component={"div"}
                      style={{ width: "50%", textAlign: "center", margin: "auto" }}
                    >
                      Reset Energy Counter
                    </Typography>
                    <div style={{ width: "50%", textAlign: "center" }}>
                      <Button variant="contained" color="primary" size="small" disabled={!settingsEdit}>
                        <Typography variant="" fontWeight="600" sx={{ marginRight: "5px" }}>
                          Reset
                        </Typography>
                        {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
                      </Button>
                    </div>
                  </div>
                  <Divider />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "5px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      component={"div"}
                      style={{ width: "50%", textAlign: "center", margin: "auto" }}
                    >
                      Reset Minimum/ Maximum
                    </Typography>
                    <div style={{ width: "50%", textAlign: "center" }}>
                      <Button variant="contained" color="primary" size="small" disabled={!settingsEdit}>
                        <Typography variant="" fontWeight="600" sx={{ marginRight: "5px" }}>
                          Reset
                        </Typography>
                        {settingsEdit ? <FaLockOpen color="red" /> : <FaLock color="#FFD700" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </NamedContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NamedContainer title="CONFIGURATION">
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">
                          <Typography variant="h6">INLET METERING</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h6">VALUE</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h6">STATUS</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Typography variant="h6">THRESHOLDS</Typography>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? (theme.palette.mode === "dark" ? "#3C3C3C" : "#E0E0E0") : "inherit", // Alternating color
                          }}
                        >
                          <StyledTableCell align="center" component="th" scope="row">
                            {row.intelMetering}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.value}</StyledTableCell>
                          <StyledTableCell align="center">
                            <Chip
                              label={row.status}
                              color={getStatusColor(row.status)[0]}
                              size="small"
                              icon={getStatusColor(row.status)[1]}
                              sx={{
                                "& .MuiChip-label": { fontWeight: 600, textTransform: "uppercase" },
                                width: "40%",
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton onClick={() => handleThresholdClick(row)} size="small">
                              <LuMenuSquare style={{ padding: "1px" }} />
                            </IconButton>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </NamedContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ThresholdDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        defaultValues={currentThresholds}
      />
    </Box>
  );
}

export default Inlet;
