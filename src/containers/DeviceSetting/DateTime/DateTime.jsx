import React, { useState } from "react";
import {
  Box,
  Grid,
  Select,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import MuiButton from "../../../components/common/styled/Button";

function DateTime() {
  const [timezone, setTimezone] = useState("(UTC-05:00) Eastern Time (US & Canada)");
  const [automaticDST, setAutomaticDST] = useState(false);
  const [timeSetupMethod, setTimeSetupMethod] = useState("ntp");
  const [ntpServer1, setNtpServer1] = useState("pool.ntp.org");
  const [ntpServer2, setNtpServer2] = useState("");
  const handleTimezoneChange = (event) => setTimezone(event.target.value);
  const toggleAutomaticDST = () => setAutomaticDST(!automaticDST);
  const handleTimeSetupMethodChange = (event) => setTimeSetupMethod(event.target.value);
  const handleNtpServer1Change = (event) => setNtpServer1(event.target.value);
  const handleNtpServer2Change = (event) => setNtpServer2(event.target.value);

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Date/Time">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <form noValidate autoComplete="off" sx={{ width: "100%" }}>
                  <FormGroup>
                    <FormControl variant="outlined">
                      <Select
                        labelId="timezone-select-label"
                        id="timezone-select"
                        value={timezone}
                        onChange={handleTimezoneChange}
                      ></Select>
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox checked={automaticDST} onChange={toggleAutomaticDST} />}
                      label="Automatic daylight saving time adjustment"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={timeSetupMethod === "ntp"}
                          onChange={handleTimeSetupMethodChange}
                          value="ntp"
                        />
                      }
                      label="Synchronize with NTP server"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={timeSetupMethod === "manual"}
                          onChange={handleTimeSetupMethodChange}
                          value="manual"
                        />
                      }
                      label="User specified time"
                    />
                    <TextField
                      label="First time server"
                      variant="outlined"
                      value={ntpServer1}
                      onChange={handleNtpServer1Change}
                    />
                    <TextField
                      label="Second time server"
                      variant="outlined"
                      value={ntpServer2}
                      onChange={handleNtpServer2Change}
                      margin="normal"
                    />
                    <MuiButton variant="contained">
                      Save
                    </MuiButton>
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
