import React, { useState } from "react";
import { Box, Grid, FormControlLabel, Checkbox, TextField, Button } from "@mui/material";
import NamedContainer from "../../../components/common/NamedContainer";
import SaveIcon from "@mui/icons-material/Save";

function DataLogging() {
  const [isLoggingEnabled, setIsLoggingEnabled] = useState(false);
  const [measurementsPerLog, setMeasurementsPerLog] = useState("");
  const [desiredLogCapacity, setDesiredLogCapacity] = useState("");
  const [isBackupEnabled, setIsBackupEnabled] = useState(false);

  const handleLogChange = (event) => {
    setIsLoggingEnabled(event.target.checked);
  };

  const handleBackupChange = (event) => {
    setIsBackupEnabled(event.target.checked);
  };

  const handleSave = () => {
    // Implement save logic here
    console.log({
      isLoggingEnabled,
      measurementsPerLog,
      desiredLogCapacity,
      isBackupEnabled,
    });
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2} sx={{ maxWidth: "90%", m: "auto" }}>
        <Grid item xs={12}>
          <NamedContainer title="Data Logging">
            <FormControlLabel
              control={<Checkbox checked={isLoggingEnabled} onChange={handleLogChange} />}
              label="Enable data logging"
            />
            <TextField
              fullWidth
              label="Measurements per log entry"
              type="number"
              variant="outlined"
              value={measurementsPerLog}
              onChange={(e) => setMeasurementsPerLog(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Desired log capacity"
              type="number"
              variant="outlined"
              value={desiredLogCapacity}
              onChange={(e) => setDesiredLogCapacity(e.target.value)}
              margin="normal"
            />
            <FormControlLabel
              control={<Checkbox checked={isBackupEnabled} onChange={handleBackupChange} />}
              label="Enable data log backup"
            />
            <Box textAlign="right" mt={2}>
              <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
              </Button>
            </Box>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DataLogging;
