import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Item from "../common/styled/Item";
import Stack from "@mui/material/Stack";
import { ReportingBar } from "../common/ReportingBar";
import { Box, Chip } from "@mui/material";
import { IoMdWarning } from "react-icons/io";

function CircuitBreakerStatus({ circuitBreakerMap, maxCurrent = 16, minCurrent = 0 }) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "normal" }}>
      {circuitBreakerMap.map((breaker, index) => (
        <Grid item xs="auto" key={index}>
          <Item color="#fff" sx={{ boxShadow: "none", width: "160px" }}>
            <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
              {breaker[`label`]} :{" "}
            </Typography>
            {breaker["status"] !== "trip" ? (
              <>
                <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
                  {breaker["current"]} / {maxCurrent} A
                </Typography>
                <ReportingBar value={parseInt(breaker["current"], 10)} max={maxCurrent} min={minCurrent} />
              </>
            ) : (
              <Box sx={{ display: "flex", placeContent: "center", marginTop: "12px" }}>
                <Chip
                  sx={{ "& .MuiChip-label": { fontWeight: 600 }, width: "100px" }}
                  icon={<IoMdWarning />}
                  color="error"
                  label="TRIP"
                  clickable={false}
                />
              </Box>
            )}
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default CircuitBreakerStatus;
