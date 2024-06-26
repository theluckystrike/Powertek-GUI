import React, { useState } from "react";

import { Box, Grid, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";

import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import MuiButton from "../../../components/common/styled/Button";

function USBHostPorts() {
  const [isUSBEnabled, setIsUSBEnabled] = useState(true);
  const handleCheckboxChange = (event) => {
    setIsUSBEnabled(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here
    // For example, you could send the data to a server or update local state
  };

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "auto" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="USB Host Ports">
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Enable USB Host Ports
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={isUSBEnabled} onChange={handleCheckboxChange} />}
                  label="The following features will become unavailable when disabling the USB host ports:"
                />
                <ul>
                  {[
                    "Wireless networking",
                    "USB cascading",
                    "USB configuration and firmware update",
                    "Webcam support",
                    "USB card reader support",
                    "PDViewer mobile app for iOS",
                  ].map((feature, index) => (
                    <Typography component="li" key={index}>
                      {feature}
                    </Typography>
                  ))}
                </ul>
                <Box display="flex" justifyContent="end">
                  <MuiButton variant="contained" color="primary">
                    Save
                  </MuiButton>
                </Box>
              </FormGroup>
            </form>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default USBHostPorts;
