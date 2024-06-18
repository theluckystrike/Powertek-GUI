import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import NamedContainer from "../../../components/common/NamedContainer";
import MuiButton from "../../../components/common/styled/Button";
import axios from "axios";

function DateTime() {
  const [timezone, setTimezone] = useState("(UTC-05:00) Eastern Time (US & Canada)");
  const [automaticDST, setAutomaticDST] = useState(false);
  const [timeSetupMethod, setTimeSetupMethod] = useState("ntp");
  const [ntpServer1, setNtpServer1] = useState("pool.ntp.org");
  const [ntpServer2, setNtpServer2] = useState("");
  const [manualDate, setManualDate] = useState(new Date());
  const [manualTime, setManualTime] = useState(new Date());
  const handleTimezoneChange = (event) => setTimezone(event.target.value);
  const toggleAutomaticDST = () => setAutomaticDST(!automaticDST);
  const handleTimeSetupMethodChange = (event) => setTimeSetupMethod(event.target.value);
  const handleNtpServer1Change = (event) => setNtpServer1(event.target.value);
  const handleNtpServer2Change = (event) => setNtpServer2(event.target.value);
  const handleDateChange = (newValue) => setManualDate(newValue);
  const handleTimeChange = (newValue) => setManualTime(newValue);
  const [dataUpdated, setDataUpdated] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/settings/datetime`)
      .then((response) => {
        const data = response.data;
        setTimezone(data.timezone);
        setAutomaticDST(data.enablentp);
        setNtpServer1(data.ntpserver1);
        setNtpServer2(data.ntpserver2);
        setTimeSetupMethod(data.enablentp ? "ntp" : "manual");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dataUpdated]);

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Date/Time">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <form noValidate autoComplete="off">
                  <FormGroup>
                    <FormControl fullWidth variant="outlined">
                      <Typography variant="h6">Time Zone</Typography>
                      <Select
                        labelId="timezone-select-label"
                        id="timezone-select"
                        value={timezone}
                        onChange={handleTimezoneChange}
                      >
                        {/* Populate with time zones */}
                        <MenuItem value="(UTC-05:00) Eastern Time (US & Canada)">Eastern Time (US & Canada)</MenuItem>
                        <MenuItem value="(UTC-08:00) Pacific Time (US & Canada)">Pacific Time (US & Canada)</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox checked={automaticDST} onChange={toggleAutomaticDST} />}
                      label="Automatic daylight saving time adjustment"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={timeSetupMethod === "ntp"} onChange={() => setTimeSetupMethod("ntp")} />
                      }
                      label="Synchronize with NTP server"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={timeSetupMethod === "manual"}
                          onChange={() => setTimeSetupMethod("manual")}
                        />
                      }
                      label="User specified time"
                    />
                    {timeSetupMethod === "ntp" && (
                      <>
                        <TextField
                          label="First NTP server"
                          variant="outlined"
                          value={ntpServer1}
                          onChange={handleNtpServer1Change}
                        />
                        <TextField
                          label="Second NTP server"
                          variant="outlined"
                          value={ntpServer2}
                          onChange={handleNtpServer2Change}
                          margin="normal"
                        />
                      </>
                    )}
                    {timeSetupMethod === "manual" && (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label="Date"
                          inputFormat="MM/dd/yyyy"
                          value={manualDate}
                          onChange={handleDateChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                          label="Time"
                          value={manualTime}
                          onChange={handleTimeChange}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    )}
                    <MuiButton variant="contained">Save</MuiButton>
                  </FormGroup>
                </form>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DateTime;
