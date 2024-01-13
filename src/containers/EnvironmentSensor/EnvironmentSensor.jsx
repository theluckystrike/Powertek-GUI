import React, { useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Grid,
  Table,
  TableBody,
  TableHead,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Tab,
} from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { ReportingBar } from "../../components/common/ReportingBar";

const data = [
  [
    { label: "EMD1-H(%)", value: 46.3, status: "Normal" },
    { label: "EMD1-T(°C)", value: 18.4, status: "Normal" },
    { label: "Smoke", value: "", status: "Normal" },
    { label: "water", value: "", status: "Normal" },
    { label: "Address", value: "1", status: "" },
    { label: "Location Name", value: "Lab Room", status: "" },
  ],
  [
    { label: "EMD2-H(%)", value: 46.3, status: "Normal" },
    { label: "EMD2-T(°C)", value: 18.4, status: "Normal" },
    { label: "Smoke", value: "", status: "Normal" },
    { label: "water", value: "", status: "Normal" },
    { label: "Address", value: "1", status: "" },
    { label: "Location Name", value: "Lab Room", status: "" },
  ],
  [
    { label: "EMD3-H(%)", value: 46.3, status: "Normal" },
    { label: "EMD3-T(°C)", value: 18.4, status: "Normal" },
    { label: "Smoke", value: "", status: "Normal" },
    { label: "water", value: "", status: "Normal" },
    { label: "Address", value: "1", status: "" },
    { label: "Location Name", value: "Lab Room", status: "" },
  ],
  [
    { label: "EMD4-H(%)", value: 46.3, status: "Normal" },
    { label: "EMD4-T(°C)", value: 18.4, status: "Normal" },
    { label: "Smoke", value: "", status: "Normal" },
    { label: "water", value: "", status: "Normal" },
    { label: "Address", value: "1", status: "" },
    { label: "Location Name", value: "Lab Room", status: "" },
  ],
  [
    { label: "EMD6-H(%)", value: 46.3, status: "Normal" },
    { label: "EMD6-T(°C)", value: 18.4, status: "Normal" },
    { label: "Smoke", value: "", status: "Normal" },
    { label: "water", value: "", status: "Normal" },
    { label: "Address", value: "1", status: "" },
    { label: "Location Name", value: "Lab Room", status: "" },
  ],
  [
    { label: "EMD7-H(%)", value: 46.3, status: "Normal" },
    { label: "EMD7-T(°C)", value: 18.4, status: "Normal" },
    { label: "Smoke", value: "", status: "Normal" },
    { label: "water", value: "", status: "Normal" },
    { label: "Address", value: "1", status: "" },
    { label: "Location Name", value: "Lab Room", status: "" },
  ],
];

function EMDTable({ data }) {
  return (
    <TableContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        placeContent: "center",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.label} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center" component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell align="center">
                <Typography component="span" variant="body2" sx={{ fontWeight: "medium" }}>
                  {typeof row.value === "number" ? <ReportingBar value={row.value} max={100} min={0} /> : row.value}
                </Typography>
              </TableCell>
              <TableCell align="center">
                {row.status && (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      backgroundColor: row.status === "Normal" ? "#4caf50" : "#f44336",
                      color: "#fff",
                      borderRadius: 1,
                      padding: "3px 10px",
                      display: "inline-block",
                    }}
                  >
                    {row.status}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ThresholdTable = () => {
  // Data structure for table rows
  const [sensor, setSensor] = useState({
    name: "",
    criticalHighTemperature: 60.0,
    criticalLowTemperature: 5.0,
    criticalHighHumidity: 90.0,
    criticalLowHumidity: 20.0,
    warningHighTemperature: 50.0,
    warningLowTemperature: 10.0,
    warningHighHumidity: 80.0,
    warningLowHumidity: 30.0,
  });

  // Handler to update sensor values
  const handleSensorChange = (event) => {
    setSensor({ ...sensor, [event.target.name]: event.target.value });
  };

  return (
    <TableContainer>
      <Table aria-label="sensor table" sx={{ border: "1px dashed" }}>
        <TableHead>
          <TableRow>
            <TableCell>Sensor</TableCell>
            <TableCell align="center">Temperature (°C)</TableCell>
            <TableCell align="center">Humidity (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Sensor Name
            </TableCell>
            <TableCell align="center">
              <TextField
                value={sensor.name}
                onChange={handleSensorChange}
                name="name"
                variant="outlined"
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <TextField
                value={sensor.name}
                onChange={handleSensorChange}
                name="name"
                variant="outlined"
                size="small"
              />
            </TableCell>
          </TableRow>

          {["critical", "warning"].map((level) =>
            ["High", "Low"].map((threshold) => (
              <TableRow key={`${level}-${threshold}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{`${level} ${threshold}`}</TableCell>
                <TableCell align="center">
                  <TextField
                    value={sensor[`${level}${threshold}Temperature`]}
                    onChange={handleSensorChange}
                    name={`${level}${threshold}Temperature`}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    value={sensor[`${level}${threshold}Humidity`]}
                    onChange={handleSensorChange}
                    name={`${level}${threshold}Humidity`}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))
          )}

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Calibration Offset</TableCell>
            <TableCell align="center">
              <TextField defaultValue="+0" type="number" variant="outlined" size="small" />
            </TableCell>
            <TableCell align="center">
              <TextField defaultValue="+0" type="number" variant="outlined" size="small" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SensorSettings = ({ add }) => {
  const [settings, setSettings] = React.useState({
    emdAddress: add,
    firmwareVersion: "01.00.0005",
    locationName: "",
    digitalInput1: "Alarm-1",
    digitalInput2: "Alarm-2",
  });

  const handleChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Box sx={{ border: "1px dashed", padding: 2 }}>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="EMD Address"
            name="emdAddress"
            fullWidth
            margin="dense"
            variant="outlined"
            value={settings.emdAddress}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Application FW Version"
            name="firmwareVersion"
            fullWidth
            margin="dense"
            variant="outlined"
            value={settings.firmwareVersion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location Name"
            name="locationName"
            fullWidth
            margin="dense"
            variant="outlined"
            value={settings.locationName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Digital Input 1"
            name="digitalInput1"
            fullWidth
            margin="dense"
            variant="outlined"
            value={settings.digitalInput1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Alarm 1</InputLabel>
            <Select name="alarm1" value={settings.digitalInput1} onChange={handleChange} label="Alarm 1">
              <MenuItem value="Alarm-1">Alarm-1</MenuItem>
              <MenuItem value="Disable">Disable</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Digital Input 2"
            name="digitalInput2"
            fullWidth
            margin="dense"
            variant="outlined"
            value={settings.digitalInput2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth margin="dense" variant="outlined">
            <InputLabel>Alarm 2</InputLabel>
            <Select name="alarm2" value={settings.digitalInput2} onChange={handleChange} label="Alarm 2">
              <MenuItem value="Alarm-2">Alarm-2</MenuItem>
              <MenuItem value="Disable">Disable</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function EnvironmentSensor() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight="600">
                  Environment Sensor
                </Typography>
              </div>
            }
          >
            <Grid container rowSpacing={2} columnSpacing={2}>
              {data.map((item, index) => {
                return (
                  <Grid item xs={6}>
                    <NamedContainer
                      noDivider
                      overridetitle
                      paperSx={{ border: "1px dashed" }}
                      title={
                        <Chip
                          sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px", marginBottom: "5px" }}
                          label={`EMD ${index + 1}`}
                          clickable={true}
                        />
                      }
                    >
                      <EMDTable data={item} />
                    </NamedContainer>
                  </Grid>
                );
              })}
            </Grid>
          </NamedContainer>
        </Grid>
        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight="600">
                  Environment Sensors Thresholds
                </Typography>
              </div>
            }
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                  {data.map((row, index) => (
                    <Tab
                      icon={
                        <Chip
                          sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                          label={`EMD ${index + 1}`}
                          clickable={true}
                        />
                      }
                    />
                  ))}
                </Tabs>
              </Box>
              {[...Array(data.length)].map((item, index) => (
                <CustomTabPanel value={value} index={index}>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={6}>
                      <SensorSettings add={index + 1} />
                    </Grid>
                    <Grid item xs={6}>
                      <ThresholdTable />
                    </Grid>
                  </Grid>
                </CustomTabPanel>
              ))}
            </Box>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnvironmentSensor;
