import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";

import { NamedContainer } from "../../components/common/NamedContainer";

import InletStats from "../../components/homepage/InletStats";
import CircuitBreakerStatus from "../../components/homepage/CircuitBreakerStatus";

export default function HomePage(props) {
  const [stats, setStats] = useState([
    { name: "Power Factor", value: "0.45" },
    { name: "Frequency", value: "50Hz" },
    { name: "RMS Voltage", value: "220V" },
    { name: "Active Power", value: "28.31 KWh" },
    { name: "Reactive Power", value: "0.5VAr" },
    { name: "Apparent Power", value: "65.60kVAh" },
  ]);

  const [currentMap, setCurrentMap] = useState({
    L1: 5,
    L2: 6,
    L3: 5,
    Neutral: 16,
  });

  const [circuitBreakerMap, setCircuitBreakerMap] = useState({});
  const [circuitBreakerNumber, setCircuitBreakerNumber] = useState(12);

  useEffect(() => {
    let temp = {};
    for (let i = 1; i <= circuitBreakerNumber; i++) {
      temp[`L${i}`] = Math.floor(Math.random() * 16);
    }
    setCircuitBreakerMap(temp);
    const interval = setInterval(() => {
      setCurrentMap({
        L1: Math.floor(Math.random() * 16),
        L2: Math.floor(Math.random() * 16),
        L3: Math.floor(Math.random() * 16),
        Neutral: Math.floor(Math.random() * 16),
      });

      let temp = {};
      for (let i = 1; i <= circuitBreakerNumber; i++) {
        temp[`L${i}`] = Math.floor(Math.random() * 16);
      }
      setCircuitBreakerMap(temp);
    }, 1000);
    return () => clearInterval(interval);
  }, [circuitBreakerNumber]);

  const colors = ["success", "warning", "error"];

  return (
    <Box sx={{ p: 4, height: "100%", overflow: "scroll" }}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={circuitBreakerNumber <= 12 ? 6 : 12} md={12}>
              <NamedContainer title="INLET">
                <InletStats
                  maxCurrent={32}
                  minCurrent={0}
                  currentMap={currentMap}
                  stats={stats}
                  realPower={4.2}
                  apparentPower={12.4}
                />
              </NamedContainer>
            </Grid>
            <Grid item lg={circuitBreakerNumber <= 12 ? 6 : 12} md={12}>
              <NamedContainer title="CIRCUIT BREAKER STATUS">
                <CircuitBreakerStatus circuitBreakerMap={circuitBreakerMap} minCurrent={0} maxCurrent={16} />
              </NamedContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <NamedContainer title="OUTLET STATUS">
              <Grid
                container
                spacing={1}
                sx={{ display: "flex", alignContent: "center", justifyContent: "space-between", alignItems: "center" }}
              >
                {[...Array(35)].map((x, i) => (
                  <Grid
                    item
                    lg={1.5}
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, width: "100%" }}
                      icon={<OfflineBoltIcon />}
                      color={colors[Math.floor(Math.random() * colors.length)]}
                      label={`Outlet ${i + 1} (0.00A)`}
                      clickable={true}
                    />
                  </Grid>
                ))}
              </Grid>
            </NamedContainer>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <NamedContainer
                overridetitle
                title={
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography variant="h5" fontWeight="600">
                      EMD Information
                    </Typography>
                    <Chip
                      sx={{ "& .MuiChip-label": { fontWeight: 600 }, borderRadius: "9px" }}
                      label={`EMD 1`}
                      clickable={true}
                    />
                  </div>
                }
              ></NamedContainer>
            </Grid>
            <Grid item xs={8}>
              <NamedContainer title="PlaceHolder"></NamedContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
