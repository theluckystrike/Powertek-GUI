import React, { useState, useEffect } from "react";
import { Button, Container, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
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

export default function Inlet(props) {
  const [settingsEdit, setsettingsEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentThresholds, setCurrentThresholds] = useState({
    lowerWarning: "",
    higherWarning: "",
    lowerCritical: "",
    higherCritical: "",
  });

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
  }));

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

  const stats = [
    { name: "Power Factor", value: "0.45" },
    { name: "Frequency", value: "50Hz" },
    { name: "RMS Voltage", value: "220V" },
    { name: "Active Power", value: "28.31 KWh" },
    { name: "Reactive Power", value: "0.5VAr" },
    { name: "Apparent Power", value: "65.60kVAh" },
  ];

  return (
    <Box sx={{ p: 4, backgroundColor: "rgb(249, 249, 249, 0.7)", height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Item color="#fff" p="4" height="100%">
                <Typography variant="h5" fontWeight="600">
                  INLET
                </Typography>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid container spacing={0} sx={{ display: "flex", alignItems: "start" }}>
                      {["L1", "L2", "L3", "Neutral"].map((x, i) => (
                        <Grid item xs={6} sx={{ margin: "auto" }}>
                          <Item
                            color="#fff"
                            sx={{
                              boxShadow: "none",
                            }}
                          >
                            {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
                            <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
                              {x} : {i + 1}/32 A
                            </Typography>

                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <div>0</div> {/* Label for min value */}
                              <div
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(15,218,30,1) 0%, rgba(223,226,16,1) 65%, rgba(255,0,0,1) 100%)",
                                  height: "10px",
                                  width: `100%`,
                                  borderRadius: 50,
                                  position: "relative", // Needed to position the pointer and value label correctly
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    left: `${((i + 1) / 100) * 100 * 10}%`,
                                    top: "-5px",
                                    width: "2px",
                                    height: "20px",
                                    background: "#000",
                                  }}
                                ></div>
                                <div
                                  style={{
                                    position: "absolute",
                                    left: `${((i + 1) / 100) * 100 * 10 + 1}%`,
                                    top: "-4px",
                                    color: "#000",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                  }}
                                >{`${i + 1}`}</div>
                              </div>
                              <div>16</div>
                            </div>
                          </Item>
                        </Grid>
                      ))}
                    </Grid>
                    <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                      <Typography
                        fontSize="2rem"
                        fontWeight="700"
                        component="div"
                        sx={{ width: "50%", textAlign: "center" }}
                      >
                        4.5 W
                      </Typography>
                      <Divider
                        orientation="vertical"
                        sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }}
                        flexItem
                      />
                      <Typography
                        fontSize="2rem"
                        fontWeight="700"
                        component="div"
                        sx={{ width: "50%", textAlign: "center", borderRight: "10px" }}
                      >
                        12.4 VA
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <Divider
                      orientation="vertical"
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginRight: "10px", marginLeft: "10px", height: "-1%" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "50%",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "4",
                      }}
                    >
                      {stats.map((stat) => (
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                          <Typography
                            fontSize="1rem"
                            fontWeight="600"
                            component="div"
                            sx={{ width: "50%", textAlign: "end" }}
                          >
                            {stat.name} :
                          </Typography>
                          <Typography
                            fontSize="1rem"
                            fontWeight="400"
                            component="div"
                            sx={{ width: "50%", textAlign: "center" }}
                          >
                            {stat.value}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item color="#fff" p="4" sx={{ height: "calc(100% - 16px)", display: "flex", flexDirection: "column" }}>
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
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px", marginBottom: "10px" }} />
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
                      borderBottom: "1px solid #D3D3D3",

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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      borderBottom: "1px solid #D3D3D3",
                      //   borderTop: "none",
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      borderBottom: "1px solid #D3D3D3",
                      //   borderTop: "none",
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      //   borderBottom: "1px solid #D3D3D3",

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
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Item color="#fff" p="4" height="100%">
                <Typography variant="h5" fontWeight="600">
                  CONFIGURATION
                </Typography>
                <Divider sx={{ bgcolor: "rgba(0, 0, 0, 0.87)", marginTop: "10px" }} />
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
                            backgroundColor: index % 2 === 0 ? "#f0f0f0" : "inherit", // Alternating color
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
                              <LuMenuSquare style={{ padding: "1px", color: "black" }} />
                            </IconButton>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
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
