import React, { useState } from "react";
import { Box, Grid, Button, Select, MenuItem, InputLabel, FormControl, Typography } from "@mui/material";
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from "recharts";
import { CSVLink } from "react-csv";
import NamedContainer, { CollapsiableNamedContainer } from "../../components/common/NamedContainer";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PduSelect from "../../components/common/PDUSelect";

function IntelHistory() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const downloadHistory = () => {
    console.log("download history");
  };
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
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#203246"
              strokeWidth={2}
              dot={{ stroke: "white", strokeWidth: 2, fill: "#8884d8" }}
              fill="rgba(33, 233, 246, 0.2)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
      <Grid container rowSpacing={2} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
        <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
          <FormControl>
            <InputLabel id="Metric-select-label">Metric</InputLabel>
            <Select
              labelId="Metric-select-label"
              id="Metric-select"
              value={dropdown}
              label="Metric"
              onChange={handleDropDown}
              size="small"
            >
              <MenuItem value={"rmscurrent"}>RMS Current</MenuItem>
              <MenuItem value={"peakcurrent"}>Peak Current</MenuItem>
              <MenuItem value={"currentharmonicdistortion"}>Current Harmonic Distortion</MenuItem>
              <MenuItem value={"rmsneutralcurrent"}>RMS Neutral Current</MenuItem>
              <MenuItem value={"rmsvoltage"}>RMS Voltage</MenuItem>
              <MenuItem value={"frequency"}>Frequency</MenuItem>
              <MenuItem value={"powerfactor"}>Power Factor</MenuItem>
              <MenuItem value={"activepower"}>Active Power</MenuItem>
              <MenuItem value={"activeenergy"}>Active Energy</MenuItem>
              <MenuItem value={"apparentpower"}>Apparent Power</MenuItem>
              <MenuItem value={"apparentenergy"}>Apparent Energy</MenuItem>
              <MenuItem value={"reactivepower"}>Reactive Power</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: "flex", placeContent: "center", gap: "4px" }}>
              <DatePicker label="From" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
              <code style={{ margin: "auto" }}>&#8212;</code>
              <DatePicker label="To" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
            </div>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
          <CSVLink data={chartData} filename={"powertek-history.csv"}>
            <Button variant="contained" size="small" onClick={downloadHistory}>
              Download History
            </Button>
          </CSVLink>
        </Grid>
      </Grid>
    </Grid>
  );
}

function OverCurrentBreakerHistory() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const downloadHistory = () => {
    console.log("download history");
  };
  const sampleData = [
    { xaxis: "00:00", value: 0.07 },
    { xaxis: "01:00", value: 0.05 },
    { xaxis: "02:00", value: 0.06 },
    { xaxis: "03:00", value: 0.07 },
    { xaxis: "04:00", value: 0.06 },
    { xaxis: "05:00", value: 0.07 },
    { xaxis: "06:00", value: 0.05 },
    { xaxis: "07:00", value: 0.07 },
    { xaxis: "08:00", value: 0.07 },
    { xaxis: "09:00", value: 0.06 },
    { xaxis: "10:00", value: 0.05 },
    { xaxis: "11:00", value: 0.08 },
    { xaxis: "12:00", value: 0.08 },
    { xaxis: "13:00", value: 0.08 },
    { xaxis: "14:00", value: 0.07 },
    { xaxis: "15:00", value: 0.06 },
    { xaxis: "16:00", value: 0.06 },
    { xaxis: "17:00", value: 0.07 },
    { xaxis: "18:00", value: 0.07 },
    { xaxis: "19:00", value: 0.07 },
    { xaxis: "20:00", value: 0.07 },
    { xaxis: "21:00", value: 0.06 },
    { xaxis: "22:00", value: 0.05 },
    { xaxis: "23:00", value: 0.07 },
  ];
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
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#203246"
              strokeWidth={2}
              dot={{ stroke: "white", strokeWidth: 2, fill: "#8884d8" }}
              fill="rgba(33, 233, 246, 0.2)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
      <Grid container rowSpacing={2} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
        <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
          <FormControl>
            <InputLabel id="Metric-select-label">Metric</InputLabel>
            <Select
              labelId="Metric-select-label"
              id="Metric-select"
              value={dropdown}
              label="Metric"
              onChange={handleDropDown}
              size="small"
            >
              <MenuItem value={"rmscurrent"}>RMS Current</MenuItem>
              <MenuItem value={"peakcurrent"}>Peak Current</MenuItem>
              {/* <MenuItem value={"currentharmonicdistortion"}>Current Harmonic Distortion</MenuItem>
            <MenuItem value={"rmsneutralcurrent"}>RMS Neutral Current</MenuItem>
            <MenuItem value={"rmsvoltage"}>RMS Voltage</MenuItem>
            <MenuItem value={"frequency"}>Frequency</MenuItem>
            <MenuItem value={"powerfactor"}>Power Factor</MenuItem>
            <MenuItem value={"activepower"}>Active Power</MenuItem>
            <MenuItem value={"activeenergy"}>Active Energy</MenuItem>
            <MenuItem value={"apparentpower"}>Apparent Power</MenuItem>
            <MenuItem value={"apparentenergy"}>Apparent Energy</MenuItem>
            <MenuItem value={"reactivepower"}>Reactive Power</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: "flex", placeContent: "center", gap: "4px" }}>
              <DatePicker label="From" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
              <code style={{ margin: "auto" }}>&#8212;</code>
              <DatePicker label="To" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
            </div>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
          <CSVLink data={chartData} filename={"powertek-history.csv"}>
            <Button variant="contained" size="small" onClick={downloadHistory}>
              Download History
            </Button>
          </CSVLink>
        </Grid>
      </Grid>
    </Grid>
  );
}

function OutletHistory() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const downloadHistory = () => {
    console.log("download history");
  };
  const sampleData = [
    { xaxis: "00:00", value: 0.07 },
    { xaxis: "01:00", value: 0.06 },
    { xaxis: "02:00", value: 0.05 },
    { xaxis: "03:00", value: 0.06 },
    { xaxis: "04:00", value: 0.08 },
    { xaxis: "05:00", value: 0.05 },
    { xaxis: "06:00", value: 0.07 },
    { xaxis: "07:00", value: 0.06 },
    { xaxis: "08:00", value: 0.06 },
    { xaxis: "09:00", value: 0.07 },
    { xaxis: "10:00", value: 0.07 },
    { xaxis: "11:00", value: 0.07 },
    { xaxis: "12:00", value: 0.08 },
    { xaxis: "13:00", value: 0.08 },
    { xaxis: "14:00", value: 0.06 },
    { xaxis: "15:00", value: 0.05 },
    { xaxis: "16:00", value: 0.06 },
    { xaxis: "17:00", value: 0.07 },
    { xaxis: "18:00", value: 0.07 },
    { xaxis: "19:00", value: 0.07 },
    { xaxis: "20:00", value: 0.05 },
    { xaxis: "21:00", value: 0.06 },
    { xaxis: "22:00", value: 0.08 },
    { xaxis: "23:00", value: 0.06 },
  ];
  const [dropdown, setdropdown] = React.useState("peakcurrent");
  const [outletDropdown, setOutletDropDown] = React.useState(1);
  const [chartData, setchartData] = useState(sampleData); // [xaxis, yaxis
  const handleDropDown = (event) => {
    event.preventDefault();
    setdropdown(event.target.value);
    // Add additional logic if needed to filter or change the chart data
  };
  const handleOutletDropDown = (event) => {
    event.preventDefault();
    setOutletDropDown(event.target.value);
    // Add additional logic if needed to filter or change the chart data
  };
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="xaxis" />
            <YAxis hide />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#203246"
              strokeWidth={2}
              dot={{ stroke: "white", strokeWidth: 2, fill: "#8884d8" }}
              fill="rgba(33, 233, 246, 0.2)"
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", placeContent: "center" }}>
        <FormControl>
          <InputLabel id="Metric-select-label">Metric</InputLabel>
          <Select
            labelId="Metric-select-label"
            id="Metric-select"
            value={dropdown}
            label="Metric"
            onChange={handleDropDown}
            size="small"
          >
            <MenuItem value={"rmscurrent"}>RMS Current</MenuItem>
            <MenuItem value={"peakcurrent"}>Peak Current</MenuItem>
            <MenuItem value={"currentharmonicdistortion"}>Current Harmonic Distortion</MenuItem>
            <MenuItem value={"rmsneutralcurrent"}>RMS Neutral Current</MenuItem>
            <MenuItem value={"rmsvoltage"}>RMS Voltage</MenuItem>
            <MenuItem value={"frequency"}>Frequency</MenuItem>
            <MenuItem value={"powerfactor"}>Power Factor</MenuItem>
            <MenuItem value={"activepower"}>Active Power</MenuItem>
            <MenuItem value={"activeenergy"}>Active Energy</MenuItem>
            <MenuItem value={"apparentpower"}>Apparent Power</MenuItem>
            <MenuItem value={"apparentenergy"}>Apparent Energy</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", placeContent: "center" }}>
        <FormControl>
          <InputLabel id="Outlet-select-label">Outlets</InputLabel>
          <Select
            labelId="Outlet-select-label"
            id="Outlet-select"
            value={outletDropdown}
            label="Metric"
            onChange={handleOutletDropDown}
            size="small"
          >
            <MenuItem value={1}>Outlet 1</MenuItem>
            <MenuItem value={2}>Outlet 2</MenuItem>
            <MenuItem value={3}>Outlet 3</MenuItem>
            <MenuItem value={4}>Outlet 4</MenuItem>
            <MenuItem value={5}>Outlet 5</MenuItem>
            <MenuItem value={4}>Outlet 6</MenuItem>
            <MenuItem value={7}>Outlet 7</MenuItem>
            <MenuItem value={8}>Outlet 8</MenuItem>
            <MenuItem value={9}>Outlet 9</MenuItem>
            <MenuItem value={10}>Outlet 10</MenuItem>
            <MenuItem value={11}>Outlet 11</MenuItem>
            <MenuItem value={12}>Outlet 12</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", placeContent: "center" }}>
        <CSVLink data={chartData} filename={"powertek-history.csv"}>
          <Button variant="contained" size="small" onClick={downloadHistory}>
            Download History
          </Button>
        </CSVLink>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", placeContent: "center", margin: "auto" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", placeContent: "center", gap: "4px" }}>
            <DatePicker label="From" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
            <code style={{ margin: "auto" }}>&#8212;</code>
            <DatePicker label="To" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
          </div>
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

function PowertekAnalytics() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight="600">
                  POWERTEK ANALYTICS
                </Typography>
                <PduSelect />
              </div>
            }
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Inlet History">
                  <IntelHistory />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Over Current Breaker History">
                  <OverCurrentBreakerHistory />
                </CollapsiableNamedContainer>
              </Grid>
              <Grid item xs={12}>
                <CollapsiableNamedContainer title="Outlets History">
                  <OutletHistory />
                </CollapsiableNamedContainer>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PowertekAnalytics;
