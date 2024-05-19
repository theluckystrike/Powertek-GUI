import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Item from "../common/styled/Item";
import Stack from "@mui/material/Stack";
import { ReportingBar } from "../common/ReportingBar";
import { Box, Chip } from "@mui/material";
import { IoMdWarning } from "react-icons/io";

function CircuitBreakerStatus({ circuitBreakerMap = {}, maxCurrent = 16, minCurrent = 0 }) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", justifyContent: "normal" }}>
      {Object.keys(circuitBreakerMap).map((key, index) => (
        <Grid item xs="auto" key={key}>
          <Item color="#fff" sx={{ boxShadow: "none", width: "160px" }}>
            <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
              {key} :{" "}
            </Typography>
            {index % 2 == 0 ? (
              <>
                <Typography variant="body1" component="div" fontWeight="600" sx={{ textAlign: "center" }}>
                  {circuitBreakerMap[key]} / {maxCurrent} A
                </Typography>
                <ReportingBar value={circuitBreakerMap[key]} max={maxCurrent} min={minCurrent} />
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
