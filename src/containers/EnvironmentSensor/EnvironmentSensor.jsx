import React, { useEffect, useState } from "react";
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
  useMediaQuery,
} from "@mui/material";
import NamedContainer from "../../components/common/NamedContainer";
import { ReportingBar } from "../../components/common/ReportingBar";
import PduSelect from "../../components/common/PDUSelect";
import MuiButton from "../../components/common/styled/Button";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
}));

const data = {
  EMD1: {
    address: "1",
    application_fw_version: "01.00.0005",
    location: "Data Center",
    sensors: [
      { name: "Smoke Sensor", value: "0", unit: "ppm", alarm: "Alarm 1", status: "Normal" },
      { name: "Water Sensor", value: "0", unit: "ppm", alarm: "Disabled", status: "Normal" },
    ],
    thresholds: {
      criticalHighTemperature: 60.0,
      criticalLowTemperature: 5.0,
      criticalHighHumidity: 90.0,
      criticalLowHumidity: 20.0,
      warningHighTemperature: 50.0,
      warningLowTemperature: 10.0,
      warningHighHumidity: 80.0,
      warningLowHumidity: 30.0,
    },
    humidity: [46.3, "Normal"],
    temprature: [23.5, "Normal"],
  },
  EMD2: {
    address: "2",
    application_fw_version: "01.00.0005",
    location: "Data Center",
    sensors: [{ name: "Smoke Sensor", value: "0", unit: "ppm", alarm: "Alarm 1", status: "Normal" }],
    thresholds: {
      criticalHighTemperature: 60.0,
      criticalLowTemperature: 5.0,
      criticalHighHumidity: 90.0,
      criticalLowHumidity: 20.0,
      warningHighTemperature: 50.0,
      warningLowTemperature: 10.0,
      warningHighHumidity: 80.0,
      warningLowHumidity: 30.0,
    },
    humidity: [46.3, "Normal"],
    temprature: [23.5, "Normal"],
  },
  EMD3: {
    address: "3",
    application_fw_version: "01.00.0005",
    location: "Data Center",
    sensors: [{ name: "Smoke Sensor", value: "0", unit: "ppm", alarm: "Alarm 1", status: "Normal" }],
    thresholds: {
      criticalHighTemperature: 60.0,
      criticalLowTemperature: 5.0,
      criticalHighHumidity: 90.0,
      criticalLowHumidity: 20.0,
      warningHighTemperature: 50.0,
      warningLowTemperature: 10.0,
      warningHighHumidity: 80.0,
      warningLowHumidity: 30.0,
    },
    humidity: [46.3, "Normal"],
    temprature: [23.5, "Normal"],
  },
  EMD4: {
    address: "4",
    application_fw_version: "01.00.0005",
    location: "Data Center",
    sensors: [{ name: "Water Sensor", value: "0", unit: "ppm", alarm: "Alarm 1", status: "Normal" }],
    thresholds: {
      criticalHighTemperature: 60.0,
      criticalLowTemperature: 5.0,
      criticalHighHumidity: 90.0,
      criticalLowHumidity: 20.0,
      warningHighTemperature: 50.0,
      warningLowTemperature: 10.0,
      warningHighHumidity: 80.0,
      warningLowHumidity: 30.0,
    },
    humidity: [46.3, "Normal"],
    temprature: [23.5, "Normal"],
  },
};

const styles = {
  scrollTabs: {
    overflowX: "auto", // Enables horizontal scrolling
    overflowY: "hidden", // Prevents vertical scrolling
    whiteSpace: "nowrap", // Keeps tabs in a single line
    scrollbarWidth: "none", // Hides scrollbar on Firefox
    msOverflowStyle: "none", // Hides scrollbar on IE and Edge
    "&::-webkit-scrollbar": {
      display: "none", // Hides scrollbar on WebKit browsers
    },
  },
};

function EMDTable({ data }) {
  const isMdScreen = useMediaQuery("(min-width:1450px)");
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <TableContainer
      sx={{
        display: "flex",
        flexDirection: "row",
        placeContent: "center",
      }}
    >
      <Table aria-label="simple table">
        <TableBody>
          <TableRow key="EMD1-H(%)" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="center" component="th" scope="row">
              EMD1-H(%)
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography component="span" variant="body2" sx={{ fontWeight: "medium" }}>
                {typeof tableData.humidity[0] === "number" ? (
                  isMdScreen ? (
                    <ReportingBar value={tableData.humidity[0]} max={100} min={0} />
                  ) : (
                    tableData.humidity[0]
                  )
                ) : (
                  tableData.humidity[0]
                )}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              {tableData.humidity[1] && (
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    backgroundColor: tableData.humidity[1] === "Normal" ? "#4caf50" : "#f44336",
                    color: "#fff",
                    borderRadius: 1,
                    padding: "3px 10px",
                    display: "inline-block",
                  }}
                >
                  {tableData.humidity[1]}
                </Typography>
              )}
            </StyledTableCell>
          </TableRow>
          <TableRow key="EMD1-T(°C)" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="center" component="th" scope="row">
              EMD1-T(°C)
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography component="span" variant="body2" sx={{ fontWeight: "medium" }}>
                {typeof tableData.temprature[0] === "number" ? (
                  isMdScreen ? (
                    <ReportingBar value={tableData.temprature[0]} max={100} min={0} />
                  ) : (
                    tableData.temprature[0]
                  )
                ) : (
                  tableData.temprature[0]
                )}
              </Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              {tableData.temprature[1] && (
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    backgroundColor: tableData.temprature[1] === "Normal" ? "#4caf50" : "#f44336",
                    color: "#fff",
                    borderRadius: 1,
                    padding: "3px 10px",
                    display: "inline-block",
                  }}
                >
                  {tableData.temprature[1]}
                </Typography>
              )}
            </StyledTableCell>
          </TableRow>
          {tableData.sensors.map((sensor, index) => (
            <TableRow key={sensor.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <StyledTableCell align="center" component="th" scope="row">
                {sensor.name}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Typography component="span" variant="body2" sx={{ fontWeight: "medium" }}>
                  {sensor.value} {sensor.unit}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="center">
                {sensor.status && (
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      backgroundColor: sensor.status === "Normal" ? "#4caf50" : "#f44336",
                      color: "#fff",
                      borderRadius: 1,
                      padding: "3px 10px",
                      display: "inline-block",
                    }}
                  >
                    {sensor.status}
                  </Typography>
                )}
              </StyledTableCell>
            </TableRow>
          ))}
          <TableRow key="Address" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="center" component="th" scope="row">
              Address
            </StyledTableCell>
            <StyledTableCell align="center">{tableData.address}</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
          <TableRow key="Location" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell align="center" component="th" scope="row">
              Location
            </StyledTableCell>
            <StyledTableCell align="center">{tableData.location}</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SensorSettings({ sensorData, handleDataChange }) {
  const theme = useTheme();
  const [data, setData] = useState(sensorData);

  useEffect(() => {
    setData(sensorData);
  }, [sensorData]);

  const handleChange = (e) => {
    // write function to handle the change from text fields
    const { name, value } = e.target;
    const newData = { ...data };
    newData[name] = value;
    setData(newData);
    handleDataChange(newData);
  };

  const handleSensorNameChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data };
    newData.sensors = newData.sensors.map((sensor) => {
      if (sensor.name === name) {
        sensor.name = value;
      }
      return sensor;
    });
    setData(newData);
    handleDataChange(newData);
  };

  const handleAlarmChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data };
    newData.sensors = newData.sensors.map((sensor) => {
      if (sensor.name === name) {
        sensor.alarm = value;
      }
      return sensor;
    });
    setData(newData);
    handleDataChange(newData);
  };

  return (
    <Box sx={{ border: "1px dashed", padding: 2, borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5" }}>
      <Grid container alignItems="flex-start" spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="EMD Address"
            name="address"
            fullWidth
            margin="dense"
            variant="outlined"
            value={data.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Application FW Version"
            name="application_fw_version"
            fullWidth
            margin="dense"
            variant="outlined"
            value={data.application_fw_version}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location Name"
            name="location"
            fullWidth
            margin="dense"
            variant="outlined"
            value={data.location}
            onChange={handleChange}
          />
        </Grid>
        {data.sensors.map((sensor, index) => (
          <>
            <Grid item xs={6}>
              <TextField
                label={`Sensor Name ${index + 1}`}
                name={sensor.name}
                fullWidth
                margin="dense"
                variant="outlined"
                value={sensor.name}
                onChange={handleSensorNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel>Alarm</InputLabel>
                <Select name={sensor.name} value={sensor.alarm} onChange={handleAlarmChange} label="Alarm">
                  <MenuItem value="Alarm 1">Alarm-1</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
}

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

const ThresholdTable = ({ sensorData, handleDataChange }) => {
  const theme = useTheme();
  const [fullSensorData, setFullSensorData] = useState(sensorData);
  //   const [sensorName, setSensorName] = useState(sensorData.name);
  const [sensor, setSensor] = useState(sensorData.thresholds);

  useEffect(() => {
    setFullSensorData(sensorData);
    // setSensorName(sensorData.name);
    setSensor(sensorData.thresholds);
  }, [sensorData]);

  const handleSensorChange = (event) => {
    setSensor({ ...sensor, [event.target.name]: event.target.value });
    const tempData = { ...fullSensorData };
    tempData.thresholds = { ...sensor, [event.target.name]: event.target.value };
    setFullSensorData(tempData);
    handleDataChange(tempData);
  };

  return (
    <TableContainer>
      <Table
        aria-label="sensor table"
        sx={{ border: "1px dashed", borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5" }}
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Sensor</StyledTableCell>
            <StyledTableCell align="center">Temperature (°C)</StyledTableCell>
            <StyledTableCell align="center">Humidity (%)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {["critical", "warning"].map((level) =>
            ["High", "Low"].map((threshold) => (
              <TableRow key={`${level}-${threshold}`} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <StyledTableCell component="th" scope="row">{`${level} ${threshold}`}</StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={sensor[`${level}${threshold}Temperature`]}
                    onChange={handleSensorChange}
                    name={`${level}${threshold}Temperature`}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    value={sensor[`${level}${threshold}Humidity`]}
                    onChange={handleSensorChange}
                    name={`${level}${threshold}Humidity`}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                </StyledTableCell>
              </TableRow>
            ))
          )}

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell>Calibration Offset</StyledTableCell>
            <StyledTableCell align="center">
              <TextField defaultValue="+0" type="number" variant="outlined" size="small" />
            </StyledTableCell>
            <StyledTableCell align="center">
              <TextField defaultValue="+0" type="number" variant="outlined" size="small" />
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function EnvironemtSensor() {
  const theme = useTheme();
  const [sensorData, setSensorData] = React.useState(data);
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSensorDataChange = (newSingleSensorData) => {
    const newData = { ...sensorData };
    newData[`EMD${newSingleSensorData.address}`] = newSingleSensorData;
    setSensorData(newData);
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer
            overridetitle
            title={
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="h5" fontWeight="600">
                  Environment Sensor
                </Typography>
                <PduSelect />
              </div>
            }
          >
            <Grid container rowSpacing={2} columnSpacing={2}>
              {Object.keys(sensorData).map((item, index) => {
                return (
                  <Grid item xs={12} md={6}>
                    <NamedContainer
                      noDivider
                      overridetitle
                      paperSx={{
                        border: "1px dashed",
                        borderColor: theme.palette.mode === "dark" ? "#233a57" : "#d4dbe5",
                      }}
                      title={
                        <Chip
                          sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px", marginBottom: "5px" }}
                          label={`EMD ${sensorData[item].address}`}
                          clickable={true}
                        />
                      }
                    >
                      <EMDTable data={sensorData[item]} />
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
                <Tabs
                  value={tabValue}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  centered
                  sx={{
                    ...styles.scrollTabs,
                    flexDirection: { xs: "column", sm: "row" }, // Vertical on extra small screens, horizontal on others
                    "& .MuiTabs-flexContainer": {
                      flexDirection: { xs: "column", sm: "row" }, // Ensuring flex direction for the container
                    },
                  }}
                >
                  {Object.keys(sensorData).map((key, index) => (
                    <Tab
                      icon={
                        <Chip
                          sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                          label={`EMD ${sensorData[key].address}`}
                          clickable={true}
                        />
                      }
                    />
                  ))}
                </Tabs>
              </Box>
              {Object.keys(sensorData).map((key, index) => (
                <CustomTabPanel value={tabValue} index={index}>
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} md={12}>
                      <SensorSettings sensorData={sensorData[key]} handleDataChange={handleSensorDataChange} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <ThresholdTable sensorData={sensorData[key]} handleDataChange={handleSensorDataChange} />
                    </Grid>
                  </Grid>
                </CustomTabPanel>
              ))}
              <Box sx={{ display: "flex", placeContent: "end" }}>
                <MuiButton variant="contained">Save</MuiButton>
              </Box>
            </Box>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EnvironemtSensor;
