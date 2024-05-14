import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import OverflowChip from "../../components/common/OverflowChip";
import ToggleButton from "@mui/material/ToggleButton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  // Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Dialog from "../../components/common/DialogWithClose";
import { CSVLink } from "react-csv";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from "recharts";

import { FaLockOpen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { LuMenuSquare } from "react-icons/lu";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import WarningIcon from "@mui/icons-material/Warning";
import GppBadIcon from "@mui/icons-material/GppBad";

import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";
import InletStats from "../../components/homepage/InletStats";
import Divider from "../../components/common/styled/Divider";
import PduSelect from "../../components/common/PDUSelect";
import ConfigContext from "../../components/common/ConfigContext";
import MuiButton from "../../components/common/styled/Button";

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

function ThresholdDialog2({ open, onClose, onSave, defaultValues }) {
  const [values, setValues] = useState(defaultValues);
  const [selectedLine, setSelectedLine] = useState("L1");

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
      <DialogTitle>
        <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
          <Typography variant="h6" align="center" gutterBottom>
            Set Thresholds
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose the Input</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLine}
              label="Choose the Input"
              onChange={(event) => {
                setSelectedLine(event.target.value);
              }}
            >
              <MenuItem value={"Total"}>Total</MenuItem>
              <MenuItem value={"L1"}>L1</MenuItem>
              <MenuItem value={"L2"}>L2</MenuItem>
              <MenuItem value={"L3"}>L3</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogTitle>
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

function IntelHistory({ sampleData }) {
  const downloadHistory = () => {
    // console.log("download history");
  };

  const [dropdown, setdropdown] = React.useState("peakcurrent");
  const [chartData, setchartData] = useState(sampleData); // [xaxis, yaxis
  const handleDropDown = (event) => {
    event.preventDefault();
    setdropdown(event.target.value);
    // Add additional logic if needed to filter or change the chart data
  };
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xaxis" />
            <YAxis />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#203246"
              strokeWidth={2}
              dot={{ stroke: "white", strokeWidth: 2, fill: "#8884d8" }}
              fill="rgba(33, 233, 246, 0.2)"
            />
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#203246"
              strokeWidth={2}
              dot={{ stroke: "white", strokeWidth: 2, fill: "#8884d8" }}
              fill="rgba(246, 33, 33, 0.2)"
            />
            <Area
              type="monotone"
              dataKey="value3"
              stroke="#203246"
              strokeWidth={2}
              dot={{ stroke: "white", strokeWidth: 2, fill: "#8884d8" }}
              fill="rgba(246, 33, 246, 0.2)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", placeContent: "center" }}>
        <CSVLink data={chartData} filename={"powertek-history.csv"}>
          <Button variant="contained" size="small" onClick={downloadHistory}>
            Download History
          </Button>
        </CSVLink>
      </Grid>
    </Grid>
  );
}

function HisotryDialog({ open, onClose, onSave, data, chartData }) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.action.hover,
  }));

  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    setCurrentData(data); // Update local state when data change
  }, [data]);

  const handleReset = () => {
    // Reset logic here
    // console.log("Reset min/max values");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"lg"}>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "16px", flexDirection: "column" }}>
        <TableContainer>
          <Table aria-label="Sensor table">
            <TableBody>
              {Object.entries(currentData).map(([key, { value, lastChanged }]) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </TableCell>
                  <TableCell>{value}</TableCell>
                  <TableCell>{lastChanged}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "flex-end", padding: "16px" }}>
            <Box sx={{ flexGrow: 1 }} />
            <MuiButton onClick={handleReset} variant="contained" color="error" style={{ margin: "16px" }}>
              Reset
            </MuiButton>
          </Box>
        </TableContainer>
        <CollapsiableNamedContainer title="History">
          <IntelHistory sampleData={chartData} />
        </CollapsiableNamedContainer>
      </Box>
    </Dialog>
  );
}

function SinglePhaseCase() {
  const sampleData = [
    { xaxis: "00:00", value: 0.07 },
    { xaxis: "01:00", value: 0.07 },
    { xaxis: "02:00", value: 0.07 },
    { xaxis: "03:00", value: 0.08 },
    { xaxis: "04:00", value: 0.07 },
    { xaxis: "05:00", value: 0.06 },
    { xaxis: "06:00", value: 0.07 },
    { xaxis: "07:00", value: 0.06 },
    { xaxis: "08:00", value: 0.06 },
    { xaxis: "09:00", value: 0.07 },
    { xaxis: "10:00", value: 0.07 },
    { xaxis: "11:00", value: 0.07 },
    { xaxis: "12:00", value: 0.07 },
    { xaxis: "13:00", value: 0.07 },
    { xaxis: "14:00", value: 0.07 },
    { xaxis: "15:00", value: 0.07 },
    { xaxis: "16:00", value: 0.07 },
    { xaxis: "17:00", value: 0.06 },
    { xaxis: "18:00", value: 0.07 },
    { xaxis: "19:00", value: 0.06 },
    { xaxis: "20:00", value: 0.05 },
    { xaxis: "21:00", value: 0.07 },
    { xaxis: "22:00", value: 0.07 },
    { xaxis: "23:00", value: 0.06 },
  ];
  const theme = useTheme();
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [currentThresholds, setCurrentThresholds] = useState({
    lowerWarning: "",
    higherWarning: "",
    lowerCritical: "",
    higherCritical: "",
  });
  const [currentHistory, setCurrentHistory] = useState({
    actual: { value: "0.073 A", lastChanged: "" },
    state: { value: "normal", lastChanged: "State hasn’t been reset" },
    minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM" },
    maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM" },
  });
  const [dialogOpen, setDialogOpen] = useState(false);

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
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "0.2%", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.02%", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.3%", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "0.073 V", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 V", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 V", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "50.0 Hz", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "49.5 Hz", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "50.5 Hz", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "0.98", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.9", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "1.0", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 8,
      intelMetering: "Active Power",
      value: "66 kWh",
      status: "normal",
      lowerWarning: "60 kWh",
      higherWarning: "70 kWh",
      lowerCritical: "50 kWh",
      higherCritical: "80 kWh",
      history: {
        actual: { value: "66 kWh", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "60 kWh", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "70 kWh", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 9,
      intelMetering: "Active Energy",
      value: "25748 Wh",
      status: "normal",
      lowerWarning: "20000 Wh",
      higherWarning: "40000 Wh",
      lowerCritical: "100000 Wh",
      higherCritical: "120000 Wh",
      history: {
        actual: { value: "25748 Wh", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "20000 Wh", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "40000 Wh", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
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
      history: {
        actual: { value: "15 VA", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "10 VA", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "20 VA", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 11,
      intelMetering: "Apparent Energy",
      value: "65874 Vah",
      status: "normal",
      lowerWarning: "532 Vah",
      higherWarning: "352 Vah",
      lowerCritical: "3245 Vah",
      higherCritical: "76889 Vah",
      history: {
        actual: { value: "65874 Vah", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "532 Vah", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "352 Vah", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 12,
      intelMetering: "Reactive Power",
      value: "0.15 A",
      status: "error",
      lowerWarning: "0.2 A",
      higherWarning: "0.4 A",
      lowerCritical: "0.5A",
      higherCritical: "0.9 A",
      history: {
        actual: { value: "0.15 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "error", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.2 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.4 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 13,
      intelMetering: "Phase Angle",
      value: "20º",
      status: "normal",
      lowerWarning: "23º",
      higherWarning: "25º",
      lowerCritical: "27º",
      higherCritical: "22º",
      history: {
        actual: { value: "20º", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "23º", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "25º", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
  ];

  function getStatusColor(status) {
    switch (status) {
      case "normal":
        return ["success", ThumbUpAltIcon];
      case "warning":
        return ["warning", WarningIcon];
      case "error":
        return ["error", GppBadIcon];
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
    // console.log("Threshold settings for:", row);
  }

  function handleHistoryClick(row) {
    setCurrentHistory(row.history);
    setHistoryDialogOpen(true);
    // console.log("History settings for:", row);
  }

  const handleDialogClose = () => {
    setHistoryDialogOpen(false);
    setDialogOpen(false);
  };

  const handleSave = (newValues) => {
    // console.log("Saved Values:", newValues);
    // Here you will update your row data with new threshold values
    setDialogOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "4px", // Set the padding to a low value, adjust as needed
    borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
  }));

  // for use to hide icons text of status columns
  const isMdScreen = useMediaQuery("(min-width:1450px)");
  return (
    <>
      <ThresholdDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        defaultValues={currentThresholds}
      />
      <HisotryDialog
        open={historyDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        data={currentHistory}
        chartData={sampleData}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography variant="h6">INLET METERING</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L1</Typography>
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
                    index % 2 === 0 ? (theme.palette.mode === "dark" ? "#1c2e45" : "#f1f5f9") : "inherit", // Alternating color
                }}
              >
                <StyledTableCell
                  align="center"
                  component="th"
                  scope="row"
                  onClick={() => handleHistoryClick(row)}
                  sx={{ cursor: "pointer" }}
                >
                  {row.intelMetering}
                </StyledTableCell>
                <StyledTableCell align="center">{row.value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.status}
                    color={getStatusColor(row.status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        // display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
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
    </>
  );
}

function ThreePhaseCaseWYE() {
  const sampleData = [
    { xaxis: "00:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "01:00", value: 0.07, value2: 0.02, value3: 0.02 },
    { xaxis: "02:00", value: 0.07, value2: 0.05, value3: 0.08 },
    { xaxis: "03:00", value: 0.08, value2: 0.05, value3: 0.05 },
    { xaxis: "04:00", value: 0.07, value2: 0.05, value3: 0.07 },
    { xaxis: "05:00", value: 0.06, value2: 0.05, value3: 0.05 },
    { xaxis: "06:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "07:00", value: 0.06, value2: 0.05, value3: 0.05 },
    { xaxis: "08:00", value: 0.06, value2: 0.05, value3: 0.05 },
    { xaxis: "09:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "10:00", value: 0.07, value2: 0.06, value3: 0.06 },
    { xaxis: "11:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "12:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "13:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "14:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "15:00", value: 0.07, value2: 0.03, value3: 0.03 },
    { xaxis: "16:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "17:00", value: 0.06, value2: 0.05, value3: 0.03 },
    { xaxis: "18:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "19:00", value: 0.06, value2: 0.08, value3: 0.08 },
    { xaxis: "20:00", value: 0.05, value2: 0.05, value3: 0.05 },
    { xaxis: "21:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "22:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "23:00", value: 0.06, value2: 0.03, value3: 0.06 },
  ];
  const theme = useTheme();
  const isMdScreen = useMediaQuery("(min-width:1450px)");
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [currentThresholds, setCurrentThresholds] = useState({
    lowerWarning: "",
    higherWarning: "",
    lowerCritical: "",
    higherCritical: "",
  });
  const [currentHistory, setCurrentHistory] = useState({
    actual: { value: "0.073 A", lastChanged: "" },
    state: { value: "normal", lastChanged: "State hasn’t been reset" },
    minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM" },
    maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM" },
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const rows = [
    {
      id: 1,
      intelMetering: "RMS Current",
      TIValue: "0.15A",
      L1Value: "0.15A",
      L2Value: "0.15A",
      L3Value: "0.15A",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 2,
      intelMetering: "Peak Current",
      TIValue: "0.18A",
      L1Value: "0.18A",
      L2Value: "0.18A",
      L3Value: "0.18A",
      TIStatus: "warning",
      L1Status: "warning",
      L2Status: "warning",
      L3Status: "warning",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 3,
      intelMetering: "Current Harmonic Distortion",
      TIValue: "1%",
      L1Value: "1%",
      L2Value: "1%",
      L3Value: "1%",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "0.1%",
      higherWarning: "0.2%",
      lowerCritical: "0.05%",
      higherCritical: "0.25%",
      history: {
        actual: { value: "0.2%", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.02%", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.3%", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 4,
      intelMetering: "RMS Neutral Current",
      TIValue: "0.12A",
      L1Value: "0.12A",
      L2Value: "0.12A",
      L3Value: "0.12A",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 5,
      intelMetering: "RMS Voltage",
      TIValue: "230V",
      L1Value: "230V",
      L2Value: "230V",
      L3Value: "230V",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "0.1V",
      higherWarning: "0.2V",
      lowerCritical: "0.05V",
      higherCritical: "0.25V",
      history: {
        actual: { value: "0.073 V", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 V", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 V", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 6,
      intelMetering: "Frequency",
      TIValue: "50.0Hz",
      L1Value: "50.0Hz",
      L2Value: "50.0Hz",
      L3Value: "50.0Hz",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "49.5Hz",
      higherWarning: "50.5Hz",
      lowerCritical: "49.0Hz",
      higherCritical: "51.0Hz",
      history: {
        actual: { value: "50.0 Hz", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "49.5 Hz", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "50.5 Hz", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 7,
      intelMetering: "Power Factor",
      TIValue: "0.98",
      L1Value: "0.98",
      L2Value: "0.98",
      L3Value: "0.98",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "0.9",
      higherWarning: "1.0",
      lowerCritical: "0.8",
      higherCritical: "1.1",
      history: {
        actual: { value: "0.98", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.9", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "1.0", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 8,
      intelMetering: "Active Power",
      TIValue: "66 kWh",
      L1Value: "66 kWh",
      L2Value: "66 kWh",
      L3Value: "66 kWh",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "60 kWh",
      higherWarning: "70 kWh",
      lowerCritical: "50 kWh",
      higherCritical: "80 kWh",
      history: {
        actual: { value: "66 kWh", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "60 kWh", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "70 kWh", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 9,
      intelMetering: "Active Energy",
      TIValue: "25748 Wh",
      L1Value: "25748 Wh",
      L2Value: "25748 Wh",
      L3Value: "25748 Wh",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "20000 Wh",
      higherWarning: "40000 Wh",
      lowerCritical: "100000 Wh",
      higherCritical: "120000 Wh",
      history: {
        actual: { value: "25748 Wh", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "20000 Wh", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "40000 Wh", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 10,
      intelMetering: "Apparent Power",
      TIValue: "15VA",
      L1Value: "15VA",
      L2Value: "15VA",
      L3Value: "15VA",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "10VA",
      higherWarning: "20VA",
      lowerCritical: "5VA",
      higherCritical: "25VA",
      history: {
        actual: { value: "15 VA", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "10 VA", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "20 VA", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 11,
      intelMetering: "Apparent Energy",
      TIValue: "65874 Vah",
      L1Value: "65874 Vah",
      L2Value: "65874 Vah",
      L3Value: "65874 Vah",
      TIStatus: "normal",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "65874 Vah", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "532 Vah", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "352 Vah", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 12,
      intelMetering: "Reactive Power",
      TIValue: "0.15A",
      L1Value: "0.15A",
      L2Value: "0.15A",
      L3Value: "0.15A",
      TIStatus: "error",
      L1Status: "error",
      L2Status: "error",
      L3Status: "error",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 13,
      intelMetering: "Phase Angle",
      TIValue: "",
      L1Value: "18º",
      L2Value: "18º",
      L3Value: "18º",
      TIStatus: "",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "18º", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "23º", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "25º", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 14,
      intelMetering: "Phase Usage",
      TIValue: "",
      L1Value: "18%",
      L2Value: "18%",
      L3Value: "18%",
      TIStatus: "",
      L1Status: "normal",
      L2Status: "normal",
      L3Status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "18%", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "23%", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "25%", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
  ];

  function getStatusColor(status) {
    switch (status) {
      case "normal":
        return ["success", ThumbUpAltIcon];
      case "warning":
        return ["warning", WarningIcon];
      case "error":
        return ["error", GppBadIcon];
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
    // console.log("Threshold settings for:", row);
  }

  function handleHistoryClick(row) {
    setCurrentHistory(row.history);
    setHistoryDialogOpen(true);
    // console.log("History settings for:", row);
  }

  const handleDialogClose = () => {
    setHistoryDialogOpen(false);
    setDialogOpen(false);
  };

  const handleSave = (newValues) => {
    // console.log("Saved Values:", newValues);
    // Here you will update your row data with new threshold values
    setDialogOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "4px", // Set the padding to a low value, adjust as needed
  }));
  return (
    <>
      <ThresholdDialog2
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        defaultValues={currentThresholds}
      />
      <HisotryDialog
        open={historyDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        data={currentHistory}
        chartData={sampleData}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography variant="h6">INLET METERING</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">TOTAL INLET</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">TOTAL INLET STATUS</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L1</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L1-STATUS</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L2</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L2-STATUS</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L3</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L3-STATUS</Typography>
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
                    index % 2 === 0 ? (theme.palette.mode === "dark" ? "#1c2e45" : "#f1f5f9") : "inherit", // Alternating color
                }}
              >
                <StyledTableCell
                  align="center"
                  component="th"
                  scope="row"
                  onClick={() => handleHistoryClick(row)}
                  sx={{ cursor: "pointer" }}
                >
                  {row.intelMetering}
                </StyledTableCell>
                <StyledTableCell align="center">{row.TIValue}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.TIStatus !== "" ? (
                    <OverflowChip
                      label={row.TIStatus}
                      color={getStatusColor(row.TIStatus)[0]}
                      size="small"
                      IconComponent={getStatusColor(row.TIStatus)[1]}
                      sx={{
                        "& .MuiChip-label": {
                          fontWeight: 600,
                          textTransform: "uppercase",
                          // display: !isMdScreen ? "none" : "inline-block",
                        },
                        width: "50%",
                      }}
                    />
                  ) : null}
                </StyledTableCell>
                <StyledTableCell align="center">{row.L1Value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.L1Status}
                    color={getStatusColor(row.L1Status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.L1Status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.L2Value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.L2Status}
                    color={getStatusColor(row.L2Status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.L2Status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.L3Value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.L3Status}
                    color={getStatusColor(row.L3Status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.L3Status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
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
    </>
  );
}

function ThreePhaseCaseDelta() {
  const sampleData = [
    { xaxis: "00:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "01:00", value: 0.07, value2: 0.02, value3: 0.02 },
    { xaxis: "02:00", value: 0.07, value2: 0.05, value3: 0.08 },
    { xaxis: "03:00", value: 0.08, value2: 0.05, value3: 0.05 },
    { xaxis: "04:00", value: 0.07, value2: 0.05, value3: 0.07 },
    { xaxis: "05:00", value: 0.06, value2: 0.05, value3: 0.05 },
    { xaxis: "06:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "07:00", value: 0.06, value2: 0.05, value3: 0.05 },
    { xaxis: "08:00", value: 0.06, value2: 0.05, value3: 0.05 },
    { xaxis: "09:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "10:00", value: 0.07, value2: 0.06, value3: 0.06 },
    { xaxis: "11:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "12:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "13:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "14:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "15:00", value: 0.07, value2: 0.03, value3: 0.03 },
    { xaxis: "16:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "17:00", value: 0.06, value2: 0.05, value3: 0.03 },
    { xaxis: "18:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "19:00", value: 0.06, value2: 0.08, value3: 0.08 },
    { xaxis: "20:00", value: 0.05, value2: 0.05, value3: 0.05 },
    { xaxis: "21:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "22:00", value: 0.07, value2: 0.05, value3: 0.05 },
    { xaxis: "23:00", value: 0.06, value2: 0.03, value3: 0.06 },
  ];
  const theme = useTheme();
  const isMdScreen = useMediaQuery("(min-width:1450px)");
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [currentThresholds, setCurrentThresholds] = useState({
    lowerWarning: "",
    higherWarning: "",
    lowerCritical: "",
    higherCritical: "",
  });
  const [currentHistory, setCurrentHistory] = useState({
    actual: { value: "0.073 A", lastChanged: "" },
    state: { value: "normal", lastChanged: "State hasn’t been reset" },
    minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM" },
    maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM" },
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const rows = [
    {
      id: 1,
      intelMetering: "RMS Current",
      TIvalue: "0.15A",
      L1L2Value: "0.15A",
      L2L3Value: "0.15A",
      L3L1Value: "0.15A",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 2,
      intelMetering: "Peak Current",
      TIvalue: "0.15A",
      L1L2Value: "0.15A",
      L2L3Value: "0.15A",
      L3L1Value: "0.15A",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "0.1A",
      higherWarning: "0.2A",
      lowerCritical: "0.05A",
      higherCritical: "0.25A",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 3,
      intelMetering: "Current Harmonic Distortion",
      TIvalue: "1%",
      L1L2Value: "1%",
      L2L3Value: "1%",
      L3L1Value: "1%",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "0.1%",
      higherWarning: "0.2%",
      lowerCritical: "0.05%",
      higherCritical: "0.25%",
      history: {
        actual: { value: "0.2%", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.02%", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.3%", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    // {
    //   id: 4,
    //   intelMetering: "RMS Neutral Current",
    //   TIvalue: "0.12A",
    //   L1L2Value: "0.12A",
    //   L2L3Value: "0.12A",
    //   L3L1Value: "0.12A",
    //   TIstatus: "normal",
    //   L1L2status: "normal",
    //   L2L3status: "normal",
    //   L3L1status: "normal",
    //   lowerWarning: "0.1A",
    //   higherWarning: "0.2A",
    //   lowerCritical: "0.05A",
    //   higherCritical: "0.25A",
    // },
    {
      id: 5,
      intelMetering: "RMS Voltage",
      TIvalue: "230V",
      L1L2Value: "230V",
      L2L3Value: "230V",
      L3L1Value: "230V",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "0.1V",
      higherWarning: "0.2V",
      lowerCritical: "0.05V",
      higherCritical: "0.25V",
      history: {
        actual: { value: "0.073 V", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 V", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 V", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 6,
      intelMetering: "Frequency",
      TIvalue: "50.0Hz",
      L1L2Value: "50.0Hz",
      L2L3Value: "50.0Hz",
      L3L1Value: "50.0Hz",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "49.5Hz",
      higherWarning: "50.5Hz",
      lowerCritical: "49.0Hz",
      higherCritical: "51.0Hz",
      history: {
        actual: { value: "50.0 Hz", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "49.5 Hz", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "50.5 Hz", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 7,
      intelMetering: "Power Factor",
      TIvalue: "0.98",
      L1L2Value: "0.98",
      L2L3Value: "0.98",
      L3L1Value: "0.98",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "0.9",
      higherWarning: "1.0",
      lowerCritical: "0.8",
      higherCritical: "1.1",
      history: {
        actual: { value: "0.98", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.9", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "1.0", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 8,
      intelMetering: "Active Power",
      TIvalue: "66 kWh",
      L1L2Value: "66 kWh",
      L2L3Value: "66 kWh",
      L3L1Value: "66 kWh",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "60 kWh",
      higherWarning: "70 kWh",
      lowerCritical: "50 kWh",
      higherCritical: "80 kWh",
      history: {
        actual: { value: "66 kWh", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "60 kWh", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "70 kWh", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 9,
      intelMetering: "Active Energy",
      TIvalue: "25748 Wh",
      L1L2Value: "25748 Wh",
      L2L3Value: "25748 Wh",
      L3L1Value: "25748 Wh",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "20000 Wh",
      higherWarning: "40000 Wh",
      lowerCritical: "100000 Wh",
      higherCritical: "120000 Wh",
      history: {
        actual: { value: "25748 Wh", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "20000 Wh", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "40000 Wh", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 10,
      intelMetering: "Apparent Power",
      TIvalue: "15 VA",
      L1L2Value: "15 VA",
      L2L3Value: "15 VA",
      L3L1Value: "15 VA",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "10 VA",
      higherWarning: "20 VA",
      lowerCritical: "5 VA",
      higherCritical: "25 VA",
      history: {
        actual: { value: "15 VA", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "10 VA", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "20 VA", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 11,
      intelMetering: "Apparent Energy",
      TIvalue: "65874 Vah",
      L1L2Value: "65874 Vah",
      L2L3Value: "65874 Vah",
      L3L1Value: "65874 Vah",
      TIstatus: "normal",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "65874 Vah", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "532 Vah", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "352 Vah", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 12,
      intelMetering: "Reactive Power",
      TIvalue: "0.15A",
      L1L2Value: "0.15A",
      L2L3Value: "0.15A",
      L3L1Value: "0.15A",
      TIstatus: "error",
      L1L2status: "error",
      L2L3status: "error",
      L3L1status: "error",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "0.073 A", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "0.063 A", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "0.206 A", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    {
      id: 13,
      intelMetering: "Phase Angle",
      TIvalue: "",
      L1L2Value: "20º",
      L2L3Value: "20º",
      L3L1Value: "20º",
      TIstatus: "",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "20º", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "23º", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "25º", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
    // {
    //   id: 14,
    //   intelMetering: "Unbalanced Current",
    //   TIvalue: "33%",
    //   L1L2Value: "33%",
    //   L2L3Value: "33%",
    //   L3L1Value: "33%",
    //   TIstatus: "normal",
    //   L1L2status: "normal",
    //   L2L3status: "normal",
    //   L3L1status: "normal",
    //   lowerWarning: "",
    //   higherWarning: "",
    //   lowerCritical: "",
    //   higherCritical: "",
    // },
    {
      id: 15,
      intelMetering: "Phase Usage",
      TIvalue: "",
      L1L2Value: "33%",
      L2L3Value: "33%",
      L3L1Value: "33%",
      TIstatus: "",
      L1L2status: "normal",
      L2L3status: "normal",
      L3L1status: "normal",
      lowerWarning: "",
      higherWarning: "",
      lowerCritical: "",
      higherCritical: "",
      history: {
        actual: { value: "33%", lastChanged: "1/6/2024, 7:19:10 PM GMT+1" },
        state: { value: "normal", lastChanged: "State hasn’t been reset" },
        minimum: { value: "23%", lastChanged: "11/20/2023, 6:26:11 PM GMT+1" },
        maximum: { value: "25%", lastChanged: "12/7/2023, 6:05:41 PM GMT+1" },
      },
    },
  ];

  function getStatusColor(status) {
    switch (status) {
      case "normal":
        return ["success", ThumbUpAltIcon];
      case "warning":
        return ["warning", WarningIcon];
      case "error":
        return ["error", GppBadIcon];
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
    // console.log("Threshold settings for:", row);
  }

  function handleHistoryClick(row) {
    setCurrentHistory(row.history);
    setHistoryDialogOpen(true);
    // console.log("History settings for:", row);
  }

  const handleDialogClose = () => {
    setHistoryDialogOpen(false);
    setDialogOpen(false);
  };

  const handleSave = (newValues) => {
    // console.log("Saved Values:", newValues);
    // Here you will update your row data with new threshold values
    setDialogOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: "4px", // Set the padding to a low value, adjust as needed
  }));
  return (
    <>
      <ThresholdDialog2
        open={dialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        defaultValues={currentThresholds}
      />
      <HisotryDialog
        open={historyDialogOpen}
        onClose={handleDialogClose}
        onSave={handleSave}
        data={currentHistory}
        chartData={sampleData}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <Typography variant="h6">INLET METERING</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">TOTAL INLET</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">TOTAL INLET STATUS</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L1-L2</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L1-L2 STATUS</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L2-L3</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L2-L3 STATUS</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L3-L1</Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography variant="h6">L3-L1 STATUS</Typography>
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
                    index % 2 === 0 ? (theme.palette.mode === "dark" ? "#1c2e45" : "#f1f5f9") : "inherit", // Alternating color
                }}
              >
                <StyledTableCell
                  align="center"
                  component="th"
                  scope="row"
                  onClick={() => handleHistoryClick(row)}
                  sx={{ cursor: "pointer" }}
                >
                  {row.intelMetering}
                </StyledTableCell>
                <StyledTableCell align="center">{row.TIvalue}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.TIstatus !== "" ? (
                    <OverflowChip
                      label={row.TIstatus}
                      color={getStatusColor(row.TIstatus)[0]}
                      size="small"
                      IconComponent={getStatusColor(row.TIstatus)[1]}
                      sx={{
                        "& .MuiChip-label": {
                          fontWeight: 600,
                          textTransform: "uppercase",
                          // display: !isMdScreen ? "none" : "inline-block",
                        },
                        width: "50%",
                      }}
                    />
                  ) : null}
                </StyledTableCell>
                <StyledTableCell align="center">{row.L1L2Value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.L1L2status}
                    color={getStatusColor(row.L1L2status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.L1L2status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        // display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.L2L3Value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.L2L3status}
                    color={getStatusColor(row.L2L3status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.L2L3status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        // display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">{row.L3L1Value}</StyledTableCell>
                <StyledTableCell align="center">
                  <OverflowChip
                    label={row.L3L1status}
                    color={getStatusColor(row.L3L1status)[0]}
                    size="small"
                    IconComponent={getStatusColor(row.L3L1status)[1]}
                    sx={{
                      "& .MuiChip-label": {
                        fontWeight: 600,
                        textTransform: "uppercase",
                        // display: !isMdScreen ? "none" : "inline-block",
                      },
                      width: "50%",
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
    </>
  );
}

function Inlet(props) {
  const { config, setConfig } = useContext(ConfigContext);
  const [settingsEdit, setsettingsEdit] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState("SinglePhaseCase");
  const [currentMap, setCurrentMap] = useState({});
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [stats, setStats] = useState([
    { name: "Power Factor", value: "0.45" },
    { name: "Frequency", value: "50Hz" },
    { name: "RMS Voltage", value: "220V" },
    { name: "Active Power", value: "28.31 KWh" },
    { name: "Reactive Power", value: "0.5VAr" },
    { name: "Apparent Power", value: "65.60kVAh" },
  ]);

  useEffect(() => {
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
    setSelectedContainer(config["caseType"]);
  }, [config]);

  const handleRadioButtonChange = (event) => {
    setSelectedContainer(event.target.value);
    if (event.target.value === "ThreePhaseCaseDelta") {
      setCurrentMap({
        L1: 5,
        L2: 6,
        L3: 5,
      });
    }

    if (event.target.value === "SinglePhaseCase") {
      setCurrentMap({
        L1: 5,
        Neutral: 16,
      });
    }
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={12} xs={12}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      INLET STATUS
                    </Typography>
                    <PduSelect />
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
            <Grid item lg={6} md={12} xs={12}>
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
                      onChange={() => setsettingsEdit(!settingsEdit)}
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
                      <Typography variant="" fontWeight="400" sx={{ marginRight: "5px" }}>
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
                    {settingsEdit ? (
                      <TextField
                        value={name}
                        onChange={handleNameChange}
                        variant="outlined"
                        size="small"
                        style={{ width: "50%" }}
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        fontWeight="400"
                        component={"div"}
                        style={{ width: "50%", textAlign: "center" }}
                      >
                        {name}
                      </Typography>
                    )}
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
            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Table to Show</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedContainer}
                  label="Type of Table"
                  onChange={handleRadioButtonChange}
                >
                  <MenuItem value={"SinglePhaseCase"}>Single Phase Case</MenuItem>
                  <MenuItem value={"ThreePhaseCase"}>Three Phase Case</MenuItem>
                  <MenuItem value={"ThreePhaseCaseDelta"}>Three Phase Case Delta</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}

            {selectedContainer === "SinglePhaseCase" && (
              <Grid item xs={12}>
                <NamedContainer title="CONFIGURATION (SinglePhaseCase)">
                  <SinglePhaseCase />
                </NamedContainer>
              </Grid>
            )}

            {selectedContainer === "ThreePhaseCaseWYE" && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <NamedContainer title="CONFIGURATION (ThreePhaseCaseWYE)">
                      <ThreePhaseCaseWYE />
                    </NamedContainer>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {selectedContainer === "ThreePhaseCaseDelta" && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <NamedContainer title="CONFIGURATION (ThreePhaseCaseDelta)">
                      <ThreePhaseCaseDelta />
                    </NamedContainer>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Inlet;
