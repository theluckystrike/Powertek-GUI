import React from "react";
import NamedContainer, { CollapsiableNamedContainer } from "../../../components/common/NamedContainer";
import { Box, Grid } from "@mui/material";

function EventLogs() {
  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <NamedContainer title="Event Logs">
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <Grid container rowSpacing={2}>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="System Logs"></CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Inlet Logs"></CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Outlet Logs"></CollapsiableNamedContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <CollapsiableNamedContainer title="Sensor Logs"></CollapsiableNamedContainer>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </NamedContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EventLogs;
