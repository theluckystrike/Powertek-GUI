import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Item from "../common/styled/Item";
import Stack from "@mui/material/Stack";
import { ReportingBar } from "../common/ReportingBar";

function CircuitBreakerStatus({ circuitBreakerMap = {}, maxCurrent = 16, minCurrent = 0 }) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>
      {Object.keys(circuitBreakerMap).map((key) => (
        <Grid item xs="auto">
          <Item color="#fff" sx={{ boxShadow: "none", width: "160px" }}>
            <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
              {key} :{" "}
            </Typography>
            <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
              {circuitBreakerMap[key]} / {maxCurrent} A
            </Typography>
            <ReportingBar value={circuitBreakerMap[key]} max={maxCurrent} min={minCurrent} />
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default CircuitBreakerStatus;
